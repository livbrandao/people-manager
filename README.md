# 🧑‍💼 SEA - Gestão de Funcionários

Bem-vindo ao **SEA - Funcionários**, um sistema web responsivo para cadastro e gerenciamento de funcionários com controle de etapas, EPI's e atividades 🛠️. Desenvolvido com **React + TailwindCSS + Redux**, e utilizando `json-server` como simulação de back-end.

## 🚀 Tecnologias Utilizadas

- ⚛️ **React** — Biblioteca JavaScript para interfaces
- 🎨 **TailwindCSS** — Framework de estilos utilitários
- 🔁 **Redux Toolkit** — Gerenciamento de estado global
- 🔌 **json-server** — Simulação de API REST
- 🧪 **Axios** — Requisições HTTP

## 🖥️ Funcionalidades

✅ Cadastro e edição de funcionários  
✅ Atribuição de atividades e EPI's  
✅ Upload de atestados (com preview do nome do arquivo)  
✅ Controle de progresso com etapas (de 1 a 9)  
✅ Navegação por etapas com botão de avanço/retrocesso  
✅ Switch para indicar conclusão da etapa  
✅ Filtro de funcionários ativos  
✅ Layout responsivo (mobile, tablet, desktop)  
✅ Persistência de dados com `json-server`

## 📂 Estrutura do Projeto

```bash
src/
├── components/          # Componentes reutilizáveis (Switch, Sidebar, etc)
├── pages/               # Páginas principais (Home, ComingSoon)
├── redux/               # Store + Slices (Redux Toolkit)
├── Forms/               # Formulários (Employee, EPI)
├── Home/                # Tela inicial e cards
├── alerts/              # Mensagens de sucesso e exclusão
├── App.js               # Definição de rotas
└── index.js             # Ponto de entrada da aplicação
```

## 🧰 Como executar localmente

```bash
# 1️⃣ Clone o repositório
$ git clone https://github.com/seu-usuario/sea-funcionarios.git
$ cd sea-funcionarios

# 2️⃣ Instale as dependências
$ npm install

# 3️⃣ Inicie o json-server
$ json-server --watch src/mock/db.json --port 3001

# 4️⃣ Rode o projeto
$ npm run dev

# Abra o navegador em [http://localhost:3000] e a API está configurada em http://localhost:3001, entre e veja a aplicação em ação! 🌐
```

## ✨ Pontos que poderia melhorar

- Separar lógica do Redux em diretórios próprios (actions/, reducers/) para projetos maiores
- Criar hooks customizados para encapsular lógica (ex: useEmployees(), useSteps())
- Isolar constante de TOTAL_STEPS em um arquivo de config global
- Uso de biblioteca como Yup + Formik ou React Hook Form para validações mais robustas
- Máscara de entrada para CPF e data (react-input-mask)

## 🚧 Pontos de Dificuldade Superados

1. Controle de etapas e navegação
   ❗Desafio: Manter o currentStep global, navegar entre rotas, e ainda controlar quando mostrar conteúdo principal ou “Em breve”. Resolvi com Redux (stepsSlice), Condicionais com showMainContent e Navegação programática com navigate().

2. Sincronização entre formulário, Redux e API
   ❗Desafio: Quando editar/cadastrar funcionário, atualizar Redux e também persistir via json-server. Consegui separar bem as responsabilidades, atualizar a lista global após POST/PUT e reutilizar o mesmo formulário para "adicionar" e "editar".

3. Estilização condicional e Tailwind
   ❗Desafio: Mostrar estilos diferentes dependendo do status (ativo/inativo, etapa concluída ou não). Usei className condicional com template strings e cores utilitárias para diferenciar visualmente os estados.

## 👨‍💻 Desenvolvido por

**Lívia Brandão**
[LinkedIn](https://www.linkedin.com/in/liviatbrandao/) · [GitHub](https://github.com/livbrandao)
