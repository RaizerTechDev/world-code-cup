// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Regulamento.scss';

const Regulamento = () => {
  return (
    <main className="regulamento-page">
      <div className="regulamento-container">
        
        {/* 🏟️ PLACAR ELETRÔNICO CHANFRADO */}
        <header className="stadium-scoreboard">
          <div className="live-badge">REGULAMENTO OFICIAL</div>
          <h1>WORLD CODE CUP</h1>
          <p className="neon-text-golden">PREMIAÇÕES DA TEMPORADA</p>
        </header>

        {/* 🏆 SEÇÃO DO PÓDIO CYBERPUNK */}
        <section className="podium-section">
          <div className="podium-grid">
            
            {/* 🥈 2º Lugar */}
            <div className="podium-card silver">
              <h3>2° LUGAR 🥈</h3>
              <p className="reward-title">Troféu / Medalha Prata Cyber</p>
              <span className="reward-sub">Medalha Prata Cyber</span>
            </div>

            {/* 🏆 1º Lugar */}
            <div className="podium-card gold">
              <div className="glow-effect"></div>
              <h3>1° LUGAR 🏆</h3>
              <p className="reward-title">Troféu Grand Master</p>
              <span className="reward-sub">Troféu Grand Master</span>
            </div>

            {/* 🥉 3º Lugar */}
            <div className="podium-card bronze">
              <h3>3° LUGAR 🥉</h3>
              <p className="reward-title">Medalha Bronze Tech</p>
              <span className="reward-sub">Medalha Bronze Tech</span>
            </div>

          </div>
        </section>

        {/* 📜 PAINEL DE DIRETRIZES DA COMPETIÇÃO */}
        <section className="rules-section">
          <div className="rules-grid">
            
            <div className="rule-item">
              <span className="rule-number">01</span>
              <div>
                <h4>Tempo Regular e Prorrogação</h4>
                <p>Partidas de 45min + 10min de prorrogação em empate.</p>
              </div>
            </div>

            <div className="rule-item">
              <span className="rule-number">02</span>
              <div>
                <h4>Clean Code</h4>
                <p>Código sem erros, organizado e comentado.</p>
              </div>
            </div>

            <div className="rule-item">
              <span className="rule-number">03</span>
              <div>
                <h4>Goleada de Testes Automatizados</h4>
                <p>100% dos testes aprovados para pontuação máxima.</p>
              </div>
            </div>

            <div className="rule-item">
              <span className="rule-number">04</span>
              <div>
                <h4>Decisão por Pênaltis</h4>
                <p>Desafio rápido de código para definir o vencedor.</p>
              </div>
            </div>

            <div className="rule-item">
              <span className="rule-number">05</span>
              <div>
                <h4>Cartão Vermelho (Anti-Cheat)</h4>
                <p>Uso de ferramentas proibidas = desclassificação.</p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
};

export default Regulamento;