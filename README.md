# Moto-Log 🚀

## 📖 Descrição

Moto-Log é um e-commerce multi-vendor desenvolvido como parte de um trabalho universitário, com o objetivo de ajudar pequenas empresas locais a vender seus produtos online. O sistema oferece uma experiência de compra fácil e segura, permitindo que lojas físicas criem suas vitrines online e se conectem com clientes de maneira intuitiva e eficiente.

## 🌟 Funcionalidades

- **Cadastro de Lojistas**: Lojistas podem se cadastrar e criar suas lojas facilmente.
- **Gestão de Produtos**: Adicione, edite e remova produtos de suas lojas com facilidade.
- **Dashboard Personalizado**: Um painel intuitivo para gerenciar vendas, estoque e informações da loja.
- **Busca e Navegação**: Pesquise e explore produtos de diferentes lojas de maneira fácil e rápida.
- **Autenticação**: Login e registro de usuários com NextAuth.
- **Design Responsivo**: Acesse o site de qualquer dispositivo, com uma experiência otimizada tanto para desktop quanto para mobile.

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [ShadcnUI](https://ui.shadcn.com/)
- **Backend**:
  - [Node.js](https://nodejs.org/)
- **Banco de Dados**:
  - [PostgreSQL](https://www.postgresql.org/)
  - [Prisma](https://www.prisma.io/)
  - [Neon](https://neon.tech)
- **Autenticação**:
  - [NextAuth](https://next-auth.js.org/)
- **Hospedagem**:
  - [Vercel](https://vercel.com/)

## 🚀 Como Começar

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### Clonar o Repositório

Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/JoaoOliveiraskt/Moto-Log.git
cd Moto-Log
```

### Instalação

Instale as dependências do projeto:

```bash
npm install
```

### Configuração do Banco de Dados

Crie um arquivo .env na raiz do projeto e adicione suas configurações de banco de dados e autenticação:

```bash
DATABASE_URL="postgresql://username:password@host:port/database"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Executar as Migrações do Prisma

Aplique as migrações do banco de dados:

```bash
npx prisma migrate dev
```

### Executar o Projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse o aplicativo em http://localhost:3000.

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório.
2. Crie uma nova branch: `git checkout -b feature/MinhaFeature`.
3. Faça suas mudanças e commit: `git commit -m 'Add nova feature'`.
4. Envie a branch para o repositório remoto: `git push origin feature/MinhaFeature`.
5. Abra um Pull Request.

## 📞 Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato!

João Victor - joaoliveiraam@gmail.com

## 👥 Membros da Equipe

- Auro Garcia
- Diego Felipe
- Gabriell Vianna
- João Victor
- Rosária
- Samuel Oliveira
- Vitor Hugo
