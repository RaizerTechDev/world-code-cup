# World Code Cup! ⚽💻

![Banner](https://capsule-render.vercel.app/api?type=waving&color=0:0f4c5c,100:1b9aaa&height=200&section=header&text=World%20Code%20Cup&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Frontend%20Case%20%7C%20Interactive%20Gamified%20Ranking&descAlignY=55&descSize=16)

<p align="center">
  🚀 <a href="https://world-code-cup.vercel.app/" target="_blank"><b>Acessar experiência ao vivo</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20V2-0f4c5c?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-React-1b9aaa?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Logic-Custom%20Hooks-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass">
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

---

## 🧭 O que é este projeto

O **World Code Cup** é uma experiência interativa gamificada inspirada na Copa do Mundo. O projeto evoluiu de uma interface informativa para um **Dashboard Dinâmico**, onde o usuário gerencia o desempenho de seleções de tecnologia através de um motor de pontuação real e um pódio interativo.

O objetivo é criar uma sensação de **produto real**, onde a narrativa visual e a interação contínua mantêm o usuário engajado.

---

## 🧭 Problema e Solução

### **O Problema**
Interfaces tradicionais de ranking e regulamentos costumam ser **passivas**:
- Leitura puramente passiva.
- Baixa retenção de atenção.
- Ausência de interação direta com os dados.
- Interfaces que não se adaptam bem a interações complexas (como Drag and Drop) no mobile.

### **A Solução (Mudanças V2)**
O projeto foi refatorado para oferecer **agência ao usuário**:
- **Motor de Pontuação Lógica:** O usuário define as notas. O sistema calcula a soma e reordena o ranking automaticamente.
- **Gamificação Real:** Introdução de **pontuação negativa** (Cartão Vermelho) e limites técnicos (Anti-Absurdo) para simular uma competição real.
- **UX Híbrida Inteligente:** Sistema que identifica o dispositivo e alterna entre *Drag and Drop* (Desktop) e *Click-to-Place* (Mobile).
- **Performance Extrema:** Substituição de GIFs por **vídeos WebM**, garantindo transparência e fluidez com baixo consumo de dados.

---

## 🎬 Demonstração Visual

<img src="https://raw.githubusercontent.com/RaizerTechDev/world-code-cup/main/public/outros/world-code-cup-video-readme.gif" alt="World Code Cup" width="800">

---

## 🕹️ Lógica e Regras de Negócio

Para garantir o equilíbrio da "competição", implementamos regras matemáticas no motor do Ranking:
1. **Clean Code & Testes:** Pontuações técnicas de 0 a 30.
2. **Tempo & Pênaltis:** Critérios de desempate de 0 a 10.
3. **Cartão Vermelho (Anti-Cheat):** Única regra que permite **pontuação negativa (-5)**, podendo derrubar o líder do pódio.
4. **Persistência:** Uso de `LocalStorage` para que o usuário não perca seu progresso ao fechar o navegador.

---

## ⚙️ Arquitetura

O projeto utiliza o padrão de **Separation of Concerns**, isolando a lógica em Custom Hooks específicos para cada página.

```text
src/
├── assets/
│   ├── animations/     # Transições de chute (WebM)
│   ├── audio/          # Trilha sonora temática
│   ├── ranking/        # Backgrounds e imagens de palco
│   └── webm/           # Avatares de seleções em alta performance
├── components/         # UI Reutilizável
│   ├── Card/           # Cards de navegação
│   ├── Header/         # Menu com controle de áudio e navegação blindada
│   ├── Footer/         # Créditos e links
│   └── KickTransition/ # Componente global de transição WebM
├── hooks/              # Lógica Global (useKick)
├── pages/
│   ├── Home/           # JSX, SCSS e useHome (Hook de estado da Home)
│   ├── Ranking/        # Motor do Pódio, Modal de pontos e useRanking
│   └── Regulamento/    # Regras e premiações
├── routes/             # React Router com navegação assíncrona
└── styles/             # Mixins responsivos e variáveis globais
```

---

## 🧠 Desafios de Engenharia Superados

### 1. Navegação Blindada
Implementamos uma lógica de `targetPath` e `setTimeout` no `useKick`. Isso garante que o site mude de página apenas enquanto a animação do chute cobre a tela inteira, eliminando o erro visual do fundo antigo "piscar" antes da nova página carregar.

### 2. Responsividade Proporcional
Utilizamos o cálculo de `clamp()` e posicionamento por **porcentagem (%)** para garantir que os avatares (Player e Bola) fiquem sempre alinhados exatamente sobre os elementos da imagem de fundo (computador e título), independente do zoom ou tamanho da tela (iPhone vs Samsung S20).

### 3. Mobile Drag and Drop Workaround
Como a API nativa de Drag do HTML5 não funciona em touch, criamos uma lógica de **Seleção Ativa**. No mobile, o usuário toca no avatar e depois toca no slot do pódio para "colar" o item, mantendo a experiência fluida.

---

## ⚡ Como rodar localmente

```bash
git clone https://github.com/SEU_USUARIO/world-code-cup.git

cd world-code-cup

npm install

npm run dev
```

---

## 🗂️ Fluxo de Navegação

- **Splash Intro:** Animação de impacto ao entrar no site.
- **Home:** Impacto visual imediato e acesso aos módulos principais.
- **Regulamento:** Cards interativos detalhando as premiações.
- **Ranking Dinâmico:** Onde a mágica acontece — edição de pontos, gerenciamento do pódio e celebração de campeão com confetes.

---

## 🧰 Stack
- **React:** Componentização e reatividade.
- **Vite:** Build e Hot Reload de alta performance.
- **SCSS:** Estilização modular com Mixins e Variáveis.
- **Canvas-Confetti:** Feedback visual de gamificação.
- **Vercel:** Deploy e CI/CD.

---

## 🏁 Resultados Alcançados

- **Engajamento:** A interface deixa de ser apenas um texto para ser uma ferramenta de exploração.
- **Manutenibilidade:** Lógica 100% separada do visual, facilitando futuras expansões.
- **Consistência Visual:** Identidade visual forte mantida através de todos os breakpoints.

---

## 🔗 Acesso

👉 https://world-code-cup.vercel.app/

<br>

### Licença

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

</br> 

## 👨‍💻 Autor

<table>
<tr>
  <td align="center">
    <img src="https://avatars.githubusercontent.com/u/87991807?v=4" width="80" />
  </td>
  <td>
    **RafaRaizer-Dev** <br>
    <a href="https://api.whatsapp.com/send/?phone=47999327137">📱 WhatsApp</a> | 
    <a href="https://www.linkedin.com/in/raizer-rafael/">💼 LinkedIn</a> | 
    <a href="https://github.com/RaizerTechDev">🐱 GitHub</a> | 
    <a href="https://raizertechdev-portfolio.netlify.app/">🌐 Portfólio</a>
  </td>
</tr>
</table>

<br>

<div align="center">