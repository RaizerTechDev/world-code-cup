/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import './Ranking.scss';

// ... (seus imports de assets permanecem iguais)
import brazil from '../../assets/webm/brasil-avatar.webm';
import argentina from '../../assets/webm/argentina-avatar.webm';
import france from '../../assets/webm/france-avatar.webm';
import portugal from '../../assets/webm/portugal-avatar.webm';
import spain from '../../assets/webm/spain-avatar.webm';
import japan from '../../assets/webm/japan-avatar.webm';
import eua from '../../assets/webm/eua-avatar.webm';
import morocco from '../../assets/webm/morocco-avatar.webm';
import trophy from '../../assets/webm/trophy.webm';
import silverTrophy from '../../assets/webm/silver-trophy.webm';
import bronzeTrophy from '../../assets/webm/bronze-trophy.webm';

const ruleDefinitions = [
  { id: 1, name: "Tempo & Prorrogação", max: 10, min: 0 },
  { id: 2, name: "Clean Code", max:25, min: 0 },
  { id: 3, name: "Goleada de Testes", max: 30, min: 0 },
  { id: 4, name: "Decisão por Pênaltis", max: 10, min: 0 },
  { id: 5, name: "Cartão Vermelho (Anti-Cheat)", max: 0, min: -5 }
];

const initialTeams = [
  { id: 1, name: 'Brasil', webm: brazil, accent: 'green' },
  { id: 2, name: 'Argentina', webm: argentina, accent: 'sky'},
  { id: 3, name: 'França', webm: france, accent: 'blue' },
  { id: 4, name: 'Portugal', webm: portugal, accent: 'red'},
  { id: 5, name: 'Espanha', webm: spain, accent: 'white'},
  { id: 6, name: 'Japão', webm: japan, accent: 'rose'},
  { id: 7, name: 'EUA', webm: eua, accent: 'crimson'},
  { id: 8, name: 'Marrocos', webm: morocco, accent: 'gold'},
].map(team => ({ ...team, rules: Array(5).fill(0) })); // Inicializa as regras com 0

const prizeItems = [
  { id: 'trophy', label: 'Troféu', webm: trophy, type: 'trophy' },
  { id: 'silver-trophy', label: 'Prata', webm: silverTrophy, type: 'silver-trophy' },
  { id: 'bronze-trophy', label: 'Bronze', webm: bronzeTrophy, type: 'bronze-trophy' },
];

const STORAGE_KEY = (userId) => `wcc-ranking-data:${userId || 'guest'}`;

const Ranking = ({ userId }) => {
  const [teamsData, setTeamsData] = useState(initialTeams);
  const [slots, setSlots] = useState({ first: null, second: null, third: null, firstPrize: null, secondPrize: null, thirdPrize: null });
  const [availableItems, setAvailableItems] = useState({ avatars: [], prizes: prizeItems });
  const [activeSelection, setActiveSelection] = useState(null);
  const [editingTeamId, setEditingTeamId] = useState(null); // Mudamos para ID para ser reativo
  const [championBounce, setChampionBounce] = useState(false);

  // Encontra o time que está sendo editado dentro do array principal
  const teamToEdit = teamsData.find(t => t.id === editingTeamId);

  const calculateTotal = (rules) => rules.reduce((acc, val) => acc + val, 0);

  const sortedRanking = useMemo(() => {
    return [...teamsData].sort((a, b) => calculateTotal(b.rules) - calculateTotal(a.rules));
  }, [teamsData]);

  const topScore = calculateTotal(sortedRanking[0].rules) || 1;

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
    const busyIds = [slots.first?.id, slots.second?.id, slots.third?.id];
    setAvailableItems(prev => ({
      ...prev,
      avatars: teamsData.filter(t => !busyIds.includes(t.id)).map(t => ({ ...t, kind: 'avatar' }))
    }));
  }, [teamsData, slots, userId]);

  // Função para atualizar a regra de um time específico
  const handleUpdateRule = (teamId, ruleIdx, value) => {
    // Permite digitar o sinal de menos e apagar tudo
    if (value === "-") return; 
    const num = value === '' ? 0 : parseInt(value);
    if (isNaN(num) && value !== '') return;

    const def = ruleDefinitions[ruleIdx];
    const validatedValue = Math.min(Math.max(num, def.min), def.max);

    setTeamsData(prev => prev.map(t => {
      if (t.id === teamId) {
        const newRules = [...t.rules];
        newRules[ruleIdx] = validatedValue;
        return { ...t, rules: newRules };
      }
      return t;
    }));
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
          confetti({ particleCount: 150, spread: 80, origin: { x: 0.3, y: 0.6 }, colors: ['#00e5ff', '#ffea00', '#00e676'] });
    confetti({ particleCount: 150, spread: 80, origin: { x: 0.6, y: 0.6 }, colors: ['#00e5ff', '#ffea00', '#00e676'] });
      }
    } else if (itemType !== 'avatar') return;

    const targetKey = isPrizeDrop ? `${slotKey}Prize` : slotKey;
    setSlots(prev => ({ ...prev, [targetKey]: item }));
    setActiveSelection(null);
  };

  const orderedSlots = ['second', 'first', 'third'];
  const slotConfig = {
    first: { title: '1º Lugar', ringClass: 'podium-slot__avatar--gold', labelClass: 'podium-slot__label--gold' },
    second: { title: '2º Lugar', ringClass: 'podium-slot__avatar--silver', labelClass: 'podium-slot__label--silver' },
    third: { title: '3º Lugar', ringClass: 'podium-slot__avatar--bronze', labelClass: 'podium-slot__label--bronze' },
  };

  return (
    <main className="ranking-page">
      <section className="ranking-hero">
        <p className="ranking-kicker">WORLD CODE CUP • RANKING AO VIVO</p>
        <h1 className="neon-text-golden-ranking">Pódio das Seleções</h1>
        <p className="subtitle-text">Gerencie a pontuação e posicione as seleções conforme o desempenho.</p>
        <div className="hero-actions">
          <button className="btn-auto-score" onClick={generateAutoScores}>✨ Gerar Scores</button>
          <button className="btn-reset-board" onClick={() => { setSlots({ first: null, second: null, third: null, firstPrize: null, secondPrize: null, thirdPrize: null }); setTeamsData(initialTeams); }}>Limpar Tudo</button>
        </div>
      </section>

      <section className="ranking-stage">
        <div className="ranking-stage__layout">
          <div className="podium-column">
            <div className="podium-grid">
              {orderedSlots.map((slotKey) => {
                const config = slotConfig[slotKey];
                const teamInSlot = slots[slotKey] ? teamsData.find(t => t.id === slots[slotKey].id) : null;
                const prize = slots[`${slotKey}Prize`];

                return (
                  <article key={slotKey} className={`podium-slot slot-${slotKey}`}>
                    <div
                      className={`podium-circle podium-circle--avatar ${config.ringClass} ${slotKey === 'first' && championBounce ? 'champion-bounce' : ''} ${activeSelection?.kind === 'avatar' && !teamInSlot ? 'can-drop' : ''}`}
                      onClick={() => activeSelection ? executeMove(activeSelection, slotKey, false) : teamInSlot && setEditingTeamId(teamInSlot.id)}
                    >
                      {teamInSlot ? (
                        <>
                          <div className="podium-slot__avatar-content"><video src={teamInSlot.webm} autoPlay loop muted playsInline /></div>
                          <button className="mini-remove-btn" onClick={(e) => { e.stopPropagation(); setSlots(p => ({...p, [slotKey]: null})); }}>×</button>
                          <div className="mini-points-badge">{calculateTotal(teamInSlot.rules)} pts</div>
                        </>
                      ) : <div className="podium-slot__placeholder">{config.title.split(' ')[0]}</div>}
                    </div>
                    <div className={`podium-slot__label ${config.labelClass}`}>{config.title}</div>
                    <div className="podium-slot__name">{teamInSlot?.name || 'Vago'}</div>

                    <div className={`podium-circle podium-circle--prize ${activeSelection?.type && activeSelection.type !== 'avatar' && !prize ? 'can-drop' : ''}`}
                         onClick={() => activeSelection && executeMove(activeSelection, slotKey, true)}>
                      {prize ? (
                        <>
                          <div className="podium-slot__prize-content"><video src={prize.webm} autoPlay loop muted playsInline /></div>
                          <button className="mini-remove-btn" onClick={(e) => { e.stopPropagation(); setSlots(p => ({...p, [`${slotKey}Prize`]: null})); }}>×</button>
                        </>
                      ) : <div className="podium-slot__prize-placeholder">+</div>}
                    </div>
                  </article>
                );
              })}
            </div>

            <section className="ranking-board">
              <div className="ranking-list">
                {sortedRanking.map((team, i) => (
                  <article className={`ranking-card accent-${team.accent}`} key={team.id} onClick={() => setEditingTeamId(team.id)}>
                    <div className="ranking-card__pos">#{i + 1}</div>
                    <div className="ranking-card__avatar"><video src={team.webm} autoPlay loop muted playsInline /></div>
                    <div className="ranking-card__info"><h3>{team.name}</h3><p>{calculateTotal(team.rules)} pts</p></div>
                    <div className="ranking-card__bar"><span style={{ width: `${Math.max(0, (calculateTotal(team.rules) / topScore) * 100)}%` }} /></div>
                    <button className="btn-edit-small">✎</button>
                  </article>
                ))}
              </div>
            </section>
          </div>

           <aside className="prizes-panel">
            <div className="draggable-bench">
              <div className="draggable-group">
                <h3>Seleções</h3>
                <p className="instruction-text"> Toque para avatar e pódio</p>
                <div className="draggable-row">
                  {availableItems.avatars.map((team) => (
                    <div key={team.id} 
                         className={`draggable-item ${activeSelection?.id === team.id ? 'is-selected' : ''}`} 
                         draggable onDragStart={(e) => handleUpdateRule(e, team)}
                         onClick={() => setActiveSelection(team)}>
                      <div className="draggable-media"><video src={team.webm} autoPlay loop muted playsInline /></div>
                      <span>{team.name}</span>
                      <small>{calculateTotal(team.rules)} pts</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="draggable-group">
                <h3>Prêmios</h3>
                <p className="instruction-text"> Toque para prêmio e pódio</p>
                <div className="draggable-row">
                  {availableItems.prizes.map((p) => (
                    <div key={p.id} 
                         className={`draggable-item ${activeSelection?.id === p.id ? 'is-selected' : ''}`} 
                         draggable onDragStart={(e) => handleDragStart(e, p)}
                         onClick={() => setActiveSelection(p)}>
                      <div className="draggable-media"><video src={p.webm} autoPlay loop muted playsInline /></div>
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* MODAL CORRIGIDO */}
      {teamToEdit && (
        <div className="modal-overlay" onClick={() => setEditingTeamId(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <header>
              <video src={teamToEdit.webm} autoPlay loop muted playsInline />
              <div>
                <h2>{teamToEdit.name}</h2>
                <p>Critérios Técnicos</p>
              </div>
            </header>
            <div className="rules-grid">
              {teamToEdit.rules.map((val, idx) => (
                <div key={idx} className={`rule-input-group ${idx === 4 ? 'is-penalty' : ''}`}>
                  <label>{ruleDefinitions[idx].name}</label>
                  <div className="input-wrapper">
                    <input 
                      type="number" 
                      value={val} 
                      onChange={e => handleUpdateRule(teamToEdit.id, idx, e.target.value)}
                    />
                    <span className="limit-info">{ruleDefinitions[idx].min}/{ruleDefinitions[idx].max}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <div className="total-display">TOTAL: <span>{calculateTotal(teamToEdit.rules)} pts</span></div>
              <button className="btn-close-modal" onClick={() => setEditingTeamId(null)}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Ranking;