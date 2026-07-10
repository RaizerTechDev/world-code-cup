import { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';

export const ruleDefinitions = [
  { id: 1, name: "Tempo & Prorrogação", max: 10, min: 0 },
  { id: 2, name: "Clean Code", max: 25, min: 0 },
  { id: 3, name: "Goleada de Testes", max: 30, min: 0 },
  { id: 4, name: "Decisão por Pênaltis", max: 10, min: 0 },
  { id: 5, name: "Cartão Vermelho (Anti-Cheat)", max: 0, min: -5 }
];

const STORAGE_KEY = (userId) => `wcc-ranking-data:${userId || 'guest'}`;

export const useRanking = (userId, initialTeams, prizeItems) => {
  const [teamsData, setTeamsData] = useState(initialTeams, prizeItems);
  const [slots, setSlots] = useState({ first: null, second: null, third: null, firstPrize: null, secondPrize: null, thirdPrize: null });
  const [activeSelection, setActiveSelection] = useState(null);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [championBounce, setChampionBounce] = useState(false);
  const [dragOverSlot, setDragOverSlot] = useState(null);

  const calculateTotal = (rules) => rules.reduce((acc, val) => acc + val, 0);

  const sortedRanking = useMemo(() => {
    return [...teamsData].sort((a, b) => calculateTotal(b.rules) - calculateTotal(a.rules));
  }, [teamsData]);

  const topScore = calculateTotal(sortedRanking[0].rules) || 1;

  // Persistência
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY(userId));
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.teamsData) setTeamsData(parsed.teamsData);
      if (parsed.slots) setSlots(parsed.slots);
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY(userId), JSON.stringify({ teamsData, slots }));
  }, [teamsData, slots, userId]);

  const availableAvatars = useMemo(() => {
    const busyIds = [slots.first?.id, slots.second?.id, slots.third?.id];
    return teamsData.filter(t => !busyIds.includes(t.id)).map(t => ({ ...t, kind: 'avatar' }));
  }, [teamsData, slots]);

  const handleUpdateRule = (teamId, ruleIdx, value) => {
    if (value === "-") return;
    const num = value === '' ? 0 : parseInt(value);
    const def = ruleDefinitions[ruleIdx];
    const validatedValue = Math.min(Math.max(num, def.min), def.max);

    setTeamsData(prev => prev.map(t => (t.id === teamId ? { ...t, rules: t.rules.map((r, i) => i === ruleIdx ? validatedValue : r) } : t)));
  };

  const generateAutoScores = () => {
    setTeamsData(prev => prev.map(t => ({
      ...t,
      rules: ruleDefinitions.map(d => Math.floor(Math.random() * (d.max - d.min + 1)) + d.min)
    })));
  };

  const executeMove = (item, slotKey, isPrizeDrop) => {
    const itemType = item.type || item.kind;
    if (isPrizeDrop) {
      const allowed = { first: 'trophy', second: 'silver-trophy', third: 'bronze-trophy' };
      if (itemType !== allowed[slotKey]) return;
      if (slotKey === 'first') {
        setChampionBounce(true);
        confetti({ particleCount: 150, spread: 80, origin: { x: 0.3, y: 0.6 } });
        confetti({ particleCount: 150, spread: 80, origin: { x: 0.6, y: 0.6 } });
      }
    } else if (itemType !== 'avatar') return;

    const targetKey = isPrizeDrop ? `${slotKey}Prize` : slotKey;
    setSlots(prev => ({ ...prev, [targetKey]: item }));
    setActiveSelection(null);
  };

  const handleDragStart = (e, item, sourceSlot = null) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ ...item, sourceSlot }));
  };

  const handleDrop = (e, slotKey, isPrizeDrop) => {
    e.preventDefault();
    setDragOverSlot(null);
    const raw = e.dataTransfer.getData('application/json');
    if (raw) executeMove(JSON.parse(raw), slotKey, isPrizeDrop);
  };

  return {
    teamsData, slots, setSlots, sortedRanking, topScore, availableAvatars,
    activeSelection, setActiveSelection, editingTeamId, setEditingTeamId,
    championBounce, dragOverSlot, setDragOverSlot,
    calculateTotal, handleUpdateRule, generateAutoScores, executeMove, handleDragStart, handleDrop
  };
};