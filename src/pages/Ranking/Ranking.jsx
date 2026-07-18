// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Ranking.scss';
import { useRanking, ruleDefinitions } from './useRanking';

// Assets
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

const initialTeams = [
  { id: 1, name: 'Brasil', webm: brazil, accent: 'green' },
  { id: 2, name: 'Argentina', webm: argentina, accent: 'sky' },
  { id: 3, name: 'França', webm: france, accent: 'blue' },
  { id: 4, name: 'Portugal', webm: portugal, accent: 'red' },
  { id: 5, name: 'Espanha', webm: spain, accent: 'white' },
  { id: 6, name: 'Japão', webm: japan, accent: 'rose' },
  { id: 7, name: 'EUA', webm: eua, accent: 'crimson' },
  { id: 8, name: 'Marrocos', webm: morocco, accent: 'gold' },
].map(t => ({ ...t, rules: Array(5).fill(0) }));

const prizeItems = [
  { id: 'trophy', label: 'Ouro', webm: trophy, type: 'trophy' },
  { id: 'silver-trophy', label: 'Prata', webm: silverTrophy, type: 'silver-trophy' },
  { id: 'bronze-trophy', label: 'Bronze', webm: bronzeTrophy, type: 'bronze-trophy' },
];

const Ranking = ({ userId }) => {
  const {
    teamsData, slots, setSlots, sortedRanking, topScore, availableAvatars,
    activeSelection, setActiveSelection, editingTeamId, setEditingTeamId,
    championBounce, dragOverSlot, setDragOverSlot,
    calculateTotal, handleUpdateRule, generateAutoScores, executeMove, handleDragStart, handleDrop, resetScores
  } = useRanking(userId, initialTeams, prizeItems);

  const teamToEdit = teamsData.find(t => t.id === editingTeamId);
  const orderedSlots = ['second', 'first', 'third'];
  const slotConfig = {
    first: { title: '1º Lugar', ringClass: 'podium-slot__avatar--gold', labelClass: 'podium-slot__label--gold' },
    second: { title: '2º Lugar', ringClass: 'podium-slot__avatar--silver', labelClass: 'podium-slot__label--silver' },
    third: { title: '3º Lugar', ringClass: 'podium-slot__avatar--bronze', labelClass: 'podium-slot__label--bronze' },
  };

  return (
    <main className="ranking-page" onContextMenu={(e) => e.preventDefault()}>
     <section className="ranking-hero">
  <p className="ranking-kicker">WORLD CODE CUP • RANKING AO VIVO</p>
  <h1 className="neon-text-golden-ranking">Pódio das Seleções</h1>
  <p className="subtitle-text">Gerencie a pontuação e posicione as seleções e premiação conforme o desempenho.</p>
  
  <div className="hero-actions">
    <button className="btn-auto-score" onClick={generateAutoScores}>✨ Gerar Scores</button>
    
    {/* NOVO BOTÃO AQUI */}
    <button className="btn-reset-scores" onClick={resetScores}>🔄 Resetar Scores</button>
    
    <button className="btn-reset-board" onClick={() => { setSlots({ first: null, second: null, third: null, firstPrize: null, secondPrize: null, thirdPrize: null }); }}>Limpar Pódio</button>
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
                  <article key={slotKey} className={`podium-slot slot-${slotKey} ${dragOverSlot === slotKey ? 'drag-over' : ''}`}>
                    <div
                      className={`podium-circle podium-circle--avatar ${config.ringClass} ${slotKey === 'first' && championBounce ? 'champion-bounce' : ''} ${activeSelection?.kind === 'avatar' && !teamInSlot ? 'can-drop' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDragOverSlot(slotKey); }}
                      onDrop={(e) => handleDrop(e, slotKey, false)}
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
                         onDragOver={(e) => e.preventDefault()}
                         onDrop={(e) => handleDrop(e, slotKey, true)}
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
                <p className="instruction-text">Desktop: Arraste | Mobile: Toque no avatar e no pódio</p>
                <div className="draggable-row">
                  {availableAvatars.map((team) => (
                    <div key={team.id} className={`draggable-item ${activeSelection?.id === team.id ? 'is-selected' : ''}`} 
                         draggable onDragStart={(e) => handleDragStart(e, team)}
                         onClick={() => setActiveSelection(team)}>
                      <div className="draggable-media"><video src={team.webm} autoPlay loop muted playsInline /></div>
                      <span>{team.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="draggable-group">
                <h3>Premiação</h3>
                <div className="draggable-row">
                  {prizeItems.map((p) => (
                    <div key={p.id} className={`draggable-item ${activeSelection?.id === p.id ? 'is-selected' : ''}`} 
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

      {/* MODAL COM CONTROLES DE + E - */}
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
            
            <div className="stepper-control">
              {/* BOTÃO DE MENOS */}
              <button 
                className="step-btn" 
                onClick={() => handleUpdateRule(teamToEdit.id, idx, Number(val) - 1)}
              >
                −
              </button>

              <input 
                type="text" 
                inputMode="numeric" 
                value={val} 
                onChange={e => handleUpdateRule(teamToEdit.id, idx, e.target.value)}
              />

              {/* BOTÃO DE MAIS */}
              <button 
                className="step-btn" 
                onClick={() => handleUpdateRule(teamToEdit.id, idx, Number(val) + 1)}
              >
                +
              </button>
            </div>
            <span className="limit-label">
              Limites: {ruleDefinitions[idx].min} a {ruleDefinitions[idx].max}
            </span>
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