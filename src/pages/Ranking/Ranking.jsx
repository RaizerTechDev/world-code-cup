/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import './Ranking.scss';

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

const teams = [
  { id: 1, name: 'Brasil', webm: brazil, accent: 'green', points: 128 },
  { id: 2, name: 'Argentina', webm: argentina, accent: 'sky', points: 124 },
  { id: 3, name: 'França', webm: france, accent: 'blue', points: 120 },
  { id: 4, name: 'Portugal', webm: portugal, accent: 'red', points: 112 },
  { id: 5, name: 'Espanha', webm: spain, accent: 'white', points: 110 },
  { id: 6, name: 'Japão', webm: japan, accent: 'rose', points: 107 },
  { id: 7, name: 'EUA', webm: eua, accent: 'crimson', points: 103 },
  { id: 8, name: 'Marrocos', webm: morocco, accent: 'gold', points: 101 },
];

const prizeItems = [
  { id: 'trophy', label: 'Troféu', webm: trophy, type: 'trophy' },
  { id: 'silver-trophy', label: 'Prata', webm: silverTrophy, type: 'silver-trophy' },
  { id: 'bronze-trophy', label: 'Bronze', webm: bronzeTrophy, type: 'bronze-trophy' },
];

const STORAGE_KEY = (userId) => `world-code-cup-ranking-state:${userId || 'guest'}`;
const SAVE_DELAY = 150;

const buildInitialState = (rankingData) => ({
  slots: {
    first: null, second: null, third: null,
    firstPrize: null, secondPrize: null, thirdPrize: null,
  },
  availableItems: {
    avatars: rankingData.map((team) => ({ ...team, kind: 'avatar' })),
    prizes: prizeItems,
  },
});

const Ranking = ({ userId }) => {
  const rankingData = useMemo(() => [...teams].sort((a, b) => b.points - a.points), []);
  const initial = useMemo(() => buildInitialState(rankingData), [rankingData]);

  const [availableItems, setAvailableItems] = useState(initial.availableItems);
  const [slots, setSlots] = useState(initial.slots);
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [swapPulse, setSwapPulse] = useState(null);
  const [championBounce, setChampionBounce] = useState(false);

  const topScore = rankingData[0]?.points || 1;

  const slotConfig = {
    first: { title: '1º Lugar', ringClass: 'podium-slot__avatar--gold', labelClass: 'podium-slot__label--gold' },
    second: { title: '2º Lugar', ringClass: 'podium-slot__avatar--silver', labelClass: 'podium-slot__label--silver' },
    third: { title: '3º Lugar', ringClass: 'podium-slot__avatar--bronze', labelClass: 'podium-slot__label--bronze' },
  };

  useEffect(() => {
    try {
      const key = STORAGE_KEY(userId);
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSlots(parsed.slots || initial.slots);
        setAvailableItems(parsed.availableItems || initial.availableItems);
      }
    } catch (e) {}
  }, [userId, initial]);

  useEffect(() => {
    const key = STORAGE_KEY(userId);
    const timer = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify({ slots, availableItems }));
    }, SAVE_DELAY);
    return () => clearTimeout(timer);
  }, [slots, availableItems, userId]);

 const triggerCelebration = () => {
setChampionBounce(true);

// Confetti efeito de explosão de cores lado direito e esquerdo do pódio  
confetti({
particleCount: 150,
spread: 80,
origin: { x: 0.2, y: 0.6 },
colors: ['#00e5ff', '#ffea00', '#00e676'],
});
confetti({
particleCount: 150,
spread: 80,
origin: { x: 0.8, y: 0.6 },
colors: ['#00e5ff', '#ffea00', '#00e676'],
});
};
  const handleDragStart = (e, item, sourceSlot = null) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ ...item, sourceSlot }));
  };

  const handleDragOver = (e, slotKey) => {
    e.preventDefault();
    if (dragOverSlot !== slotKey) setDragOverSlot(slotKey);
  };

  const addItemBackToPool = (item) => {
    if (!item) return;
    setAvailableItems((prev) => {
      const type = item.type || item.kind;
      if (type === 'avatar') {
        if (prev.avatars.some(a => a.id === item.id)) return prev;
        return { ...prev, avatars: [...prev.avatars, { ...item, kind: 'avatar' }] };
      }
      if (prev.prizes.some(p => p.id === item.id)) return prev;
      return { ...prev, prizes: [...prev.prizes, item] };
    });
  };

  const removeItemFromPool = (item) => {
    setAvailableItems((prev) => ({
      avatars: prev.avatars.filter((a) => a.id !== item.id),
      prizes: prev.prizes.filter((p) => p.id !== item.id),
    }));
  };

  const handleDrop = (e, slotKey, isPrizeDrop = false) => {
    e.preventDefault();
    setDragOverSlot(null);
    const raw = e.dataTransfer.getData('application/json');
    if (!raw) return;
    const item = JSON.parse(raw);
    const itemType = item.type || item.kind;

    if (isPrizeDrop) {
      const allowed = { first: 'trophy', second: 'silver-trophy', third: 'bronze-trophy' };
      if (itemType !== allowed[slotKey]) return;
      if (slotKey === 'first') triggerCelebration();
    } else if (itemType !== 'avatar') return;

    const targetKey = isPrizeDrop ? `${slotKey}Prize` : slotKey;
    const oldItem = slots[targetKey];

    setSlots(prev => ({ ...prev, [targetKey]: item }));
    if (!item.sourceSlot) {
      removeItemFromPool(item);
      if (oldItem) addItemBackToPool(oldItem);
    }
    setSwapPulse(slotKey);
  };

  const handleReturnItem = (slotKey) => {
    const item = slots[slotKey];
    if (!item) return;
    addItemBackToPool(item);
    setSlots(prev => ({ ...prev, [slotKey]: null }));
  };

  const handleResetBoard = () => {
    setSlots(initial.slots);
    setAvailableItems(initial.availableItems);
    localStorage.removeItem(STORAGE_KEY(userId));
  };

  const orderedSlots = ['second', 'first', 'third'];

  return (
    <main className="ranking-page">
      <section className="ranking-hero">
        <p className="ranking-kicker">WORLD CODE CUP • RANKING AO VIVO</p>
        <h1 className="neon-text-golden">Podium das Seleções</h1>
        <p className="fade-subtitle">
         Em tempo real e dinâmico. Mova os avatares e prêmios para o pódio,
          <span className="break-large">conforme a pontuação geral.</span>
        </p>
      </section>

      <section className="ranking-stage">
        <div className="ranking-stage__layout">
          <div className="podium-column">
            <div className="podium-wrap">
              <div className="podium-grid">
                {orderedSlots.map((slotKey) => {
                  const config = slotConfig[slotKey];
                  const avatarItem = slots[slotKey];
                  const prizeItem = slots[`${slotKey}Prize`];

                  return (
                    <article key={slotKey} className={`podium-slot slot-${slotKey} ${dragOverSlot === slotKey ? 'drag-over' : ''}`}>
                      <div
                        className={`podium-circle podium-circle--avatar ${config.ringClass} ${slotKey === 'first' && championBounce ? 'champion-bounce' : ''}`}
                        onDragOver={(e) => handleDragOver(e, `${slotKey}-avatar`)}
                        onDrop={(e) => handleDrop(e, slotKey, false)}
                      >
                        {avatarItem ? (
                          <>
                            <div className="podium-slot__avatar-content">
                              <video src={avatarItem.webm} autoPlay loop muted playsInline />
                            </div>
                            <button type="button" className="mini-remove-btn" onClick={() => handleReturnItem(slotKey)}>×</button>
                          </>
                        ) : (
                          <div className="podium-slot__placeholder">{config.title.split(' ')[0]}</div>
                        )}
                      </div>

                      <div className={`podium-slot__label ${config.labelClass}`}>{config.title}</div>
                      <div className="podium-slot__name">{avatarItem?.name || 'Aguardando'}</div>

                      <div
                        className="podium-circle podium-circle--prize"
                        onDragOver={(e) => handleDragOver(e, `${slotKey}-prize`)}
                        onDrop={(e) => handleDrop(e, slotKey, true)}
                      >
                        {prizeItem ? (
                          <>
                            <div className="podium-slot__prize-content">
                              <video src={prizeItem.webm} autoPlay loop muted playsInline />
                            </div>
                            <button type="button" className="mini-remove-btn" onClick={() => handleReturnItem(`${slotKey}Prize`)}>×</button>
                          </>
                        ) : (
                          <div className="podium-slot__prize-placeholder">+</div>
                        )}
                      </div>

                      <div className="podium-slot__actions">
                        {avatarItem && (
                          <div className="podium-slot__swap-handle" draggable onDragStart={(e) => handleDragStart(e, avatarItem, slotKey)}>
                            Mover Seleção
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* SEÇÃO DE PONTUAÇÃO GERAL*/}
            <section className="ranking-board">
              <div className="ranking-board__header">
                <h2>Pontuação Geral</h2>
                <button className="ranking-reset" onClick={handleResetBoard}>Reset geral</button>
              </div>
              <div className="ranking-list">
                {rankingData.map((team, i) => (
                  <article className={`ranking-card accent-${team.accent}`} key={team.id}>
                    <div className="ranking-card__pos">#{i + 1}</div>
                    <div className="ranking-card__avatar">
                      <video src={team.webm} autoPlay loop muted playsInline />
                    </div>
                    <div className="ranking-card__info">
                      <h3>{team.name}</h3>
                      <p>{team.points} pontos</p>
                    </div>
                    <div className="ranking-card__bar">
                      <span style={{ width: `${(team.points / topScore) * 100}%` }} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* AVATARES E PRÊMIOS NA LATERAL */}
          <aside className="prizes-panel">
            <div className="prizes-panel__sticky">
              <div className="draggable-bench">
                <div className="draggable-group">
                  <h3>Avatares</h3>
                  <div className="draggable-row">
                    {availableItems.avatars.map((team) => (
                      <div key={team.id} className={`draggable-item draggable-item--${team.accent}`} draggable onDragStart={(e) => handleDragStart(e, team)}>
                        <div className="draggable-media"><video src={team.webm} autoPlay loop muted playsInline /></div>
                        <span>{team.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="draggable-group">
                  <h3>Prêmios</h3>
                  <div className="draggable-row">
                    {availableItems.prizes.map((p) => (
                      <div key={p.id} className="draggable-item" draggable onDragStart={(e) => handleDragStart(e, p)}>
                        <div className="draggable-media"><video src={p.webm} autoPlay loop muted playsInline /></div>
                        <span>{p.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Ranking;