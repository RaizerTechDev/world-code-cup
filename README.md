 # World Code Cup! ⚽💻

## 📖 Documentação da Experiência Temática - Copa do Mundo

### 🎯 Objetivos

- **Clareza**: apresentar regulamento e ranking de forma simples e organizada.  

- **Atratividade**: usar elementos visuais e interativos que remetam ao clima da Copa.  

- **Engajamento**: incentivar o visitante a explorar mais e acompanhar a competição.  

### 💡 Proposta de Experiência Digital

1. **Landing Page temática**  
   - Fundo animado estilo estádio noturno.  
   - Destaque para o slogan da campanha.  
   - Elementos visuais como bola e notebook reforçando o tema.

2. **Seção de Regulamento e Ranking**  
   - Cards neon com informações claras e acessíveis.  
   - Regulamento da competição.  
   - Ranking atualizado dos participantes.  
   - Hover interativo para destacar cada card.

3. **Experiências exclusivas**  
   - Ambientação temática com gifs de bola e jogador.  
   - Estrelas e linhas animadas no campo para dar dinamismo.  

4. **Footer informativo**  
   - Links para GitHub e LinkedIn.  
   - Créditos do projeto.  
   - Rolagem junto com o conteúdo (não fixo).

### 🖼️ Resultado Esperado
- O visitante acessa a página e imediatamente sente o **clima da Copa**.  
- Regulamento e ranking são apresentados de forma clara e visualmente atraente.  
- As animações e interatividade despertam interesse e incentivam a exploração.  
- O rodapé traz informações úteis sem atrapalhar a navegação.

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

┌─────────────────────────────────────────────────────────┐
│                    HEADER (Fixo)                        │
│             [ Home ]   [ Ranking
[ Regras ]         │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 HERO / LANDING PAGE                     │
│  - Fundo dinâmico (Estádio Noturno + Linhas Animadas)   │
│  - Elementos flutuantes (Animação da Bola + Jogador)   │
│  - Subtítulo interativo com efeito Underline Neon       │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     CARDS GRID                          │
│     [ Card: Regulamento ]      [ Card: Ranking ]        │
│  - Efeito Hover 3D (Scale + Text Shadow + Box Shadow)   │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    FOOTER (Relativo)                    │
│   [ Ícones Sociais (Esquerda) ]  [ Créditos (Direita) ] │
└─────────────────────────────────────────────────────────┘

```