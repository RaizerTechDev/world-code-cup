# World Code Cup! ⚽💻

## 📖 Documentação da Experiência Temática - Copa do Mundo

## Fase 1

### 🎯 Objetivos
- **Clareza**: apresentar a programação de forma simples e organizada.  
- **Atratividade**: usar elementos visuais e interativos que remetam ao clima da Copa.  
- **Engajamento**: incentivar o visitante a explorar mais e participar das experiências.  

### 💡 Proposta de Experiência Digital
1. **Landing Page temática**  
   - Fundo animado estilo estádio ou campo de futebol.  
   - Destaque para o slogan da campanha.  
   - Botão de chamada para ação: “Conheça nossa programação”.

2. **Seção de Programação Especial**  
   - Cards com cada evento (telão para jogos, promoções, shows temáticos).  
   - Ícones visuais (bola, torcida, bandeiras) para reforçar o clima.  
   - Animações de entrada em sequência para dar dinamismo.

3. **Experiências exclusivas**  
   - Destaque para ações diferenciadas: combos temáticos, sorteios, ambientação especial.  
   - Uso de hover interativo para revelar detalhes extras.

4. **Agenda interativa**  
   - Calendário integrado mostrando dias e horários dos jogos e eventos.  
   - Opção de adicionar ao calendário pessoal (Google/Outlook).

5. **Dark/Light Mode com ambientação**  
   - **Light Mode**: raios de sol e atmosfera de dia de jogo.  
   - **Dark Mode**: estrelas e clima de noite de estádio.  
   - Transição suave entre os modos, reforçando a imersão.

### 🖼️ Resultado Esperado
- O visitante acessa a página e imediatamente sente o **clima da Copa**.  
- A programação é apresentada de forma clara e visualmente atraente.  
- As animações e interatividade despertam interesse e incentivam a exploração.  
- O modo dia/noite reforça a ambientação e torna a experiência memorável.  

---

## 📂 Estrutura de Pastas

```text
src/
├── index.jsx
├── App.jsx
├── App.scss
├── /components
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.scss
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.scss
│   └── Card/
│       ├── Card.jsx
│       └── Card.scss
├── /pages
│   └── Home/
│       ├── Home.jsx
│       └── Home.scss
└── /styles
    ├── global.scss
    └── variables.scss

## 📦 Dependências instaladas

### 1. Desenvolvimento

```bash
npm install -D vite
npm install -D @vitejs/plugin-react
npm install -D sass-embedded
```

### 2. Produção

```bash
npm install react react-dom
```

### 3. 🚀 Como rodar o projeto

#### Instalar dependências

```bash
npm install 
```

#### Rodar servidor de 

```bash
npm run dev
```

#### Build para produção

```bash
npm run build
```

## 🗂️ Fluxo de Navegação - Fase 1

```text

HEADER
  Logo + Menu + Botão de alternância 🌞/🌙
    ▼
HERO / LANDING
  Fundo animado + slogan + CTA
    ▼
SEÇÃO DE PROGRAMAÇÃO
  Cards de eventos + animações
    ▼
EXPERIÊNCIAS EXCLUSIVAS
  Combos, sorteios, ambientação
    ▼
AGENDA INTERATIVA
  Calendário + integração Google/Outlook
    ▼
FOOTER
  Links úteis + redes sociais + contato


```