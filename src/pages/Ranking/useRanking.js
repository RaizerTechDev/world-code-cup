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

export const useRanking = (userId, initialTeams) => {

  // Remvido prizeItems do useState, ele deve receber apenas o valor inicial
  const [teamsData, setTeamsData] = useState(initialTeams);
  const [slots, setSlots] = useState({ first: null, second: null, third: null, firstPrize: null, secondPrize: null, thirdPrize: null });
  const [activeSelection, setActiveSelection] = useState(null);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [championBounce, setChampionBounce] = useState(false);
  const [dragOverSlot, setDragOverSlot] = useState(null);

  // Agora converte para número e trata o "-" ou vazio como 0 na soma
  const calculateTotal = (rules) => rules.reduce((acc, val) => {
    const num = parseInt(val);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  // Gera o ranking ordenado com base na pontuação total de cada time
  const sortedRanking = useMemo(() => {
    return [...teamsData].sort((a, b) => calculateTotal(b.rules) - calculateTotal(a.rules));
  }, [teamsData]);

  // Garante que topScore nunca seja zero para evitar divisão por zero
  const topScore = calculateTotal(sortedRanking[0].rules) || 1;

  // Persistência de dados no localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY(userId));
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.teamsData) setTeamsData(parsed.teamsData);
      if (parsed.slots) setSlots(parsed.slots);
    }
  }, [userId]);

  // Salva os dados no localStorage sempre que teamsData ou slots mudarem
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY(userId), JSON.stringify({ teamsData, slots }));
  }, [teamsData, slots, userId]);

  // Gera a lista de avatares disponíveis, excluindo os que já estão nos slots
  const availableAvatars = useMemo(() => {
    const busyIds = [slots.first?.id, slots.second?.id, slots.third?.id];
    return teamsData.filter(t => !busyIds.includes(t.id)).map(t => ({ ...t, kind: 'avatar' }));
  }, [teamsData, slots]);

  const handleUpdateRule = (teamId, ruleIdx, value) => {
    // Permite o campo ficar vazio ou apenas com o sinal de menos para o usuário conseguir digitar
    if (value === "" || value === "-") {
      updateTeamRule(teamId, ruleIdx, value);
      return;
    }

    const num = parseInt(value);
    if (isNaN(num)) return;

    const def = ruleDefinitions[ruleIdx];
    // 2. Valida os limites lógicos (não deixa passar de 30 ou ser menor que -5)
    const validatedValue = Math.min(Math.max(num, def.min), def.max);
    updateTeamRule(teamId, ruleIdx, validatedValue);
  };

  // Função auxiliar para atualizar o array de regras no estado
  const updateTeamRule = (teamId, ruleIdx, newValue) => {
    setTeamsData(prev => prev.map(t => 
      t.id === teamId 
        ? { ...t, rules: t.rules.map((r, i) => i === ruleIdx ? newValue : r) } 
        : t
    ));
  };

  // Gera scores aleatórios para cada time, respeitando os limites definidos em definição de regras
  const generateAutoScores = () => {
    setTeamsData(prev => prev.map(t => ({
      ...t,
      rules: ruleDefinitions.map(d => Math.floor(Math.random() * (d.max - d.min + 1)) + d.min)
    })));
  };

  // Função para mover um item (avatar ou prêmio) para um slot específico
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

  // Funções para lidar com arrastar e soltar (drag and drop)
  const handleDragStart = (e, item, sourceSlot = null) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ ...item, sourceSlot }));
  };

  // Função para lidar com o evento de soltar (drop) em um slot
  const handleDrop = (e, slotKey, isPrizeDrop) => {
    e.preventDefault();
    setDragOverSlot(null);
    const raw = e.dataTransfer.getData('application/json');
    if (raw) executeMove(JSON.parse(raw), slotKey, isPrizeDrop);
  };

  // Função para resetar os scores de todos os times para zero
  const resetScores = () => {
  setTeamsData(prev => prev.map(t => ({
    ...t,
    rules: Array(ruleDefinitions.length).fill(0)
  })));
};

  return {
    teamsData, slots, setSlots, sortedRanking, topScore, availableAvatars,
    activeSelection, setActiveSelection, editingTeamId, setEditingTeamId,
    championBounce, dragOverSlot, setDragOverSlot,
    calculateTotal, handleUpdateRule, generateAutoScores, executeMove, handleDragStart, handleDrop, resetScores
  };
};