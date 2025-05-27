# 🛒 WenShop

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📖 Descrição

Esse projeto contém uma interface de usuário moderna e responsiva para e-commerce desenvolvida com Next.js 15, React 18, TypeScript e Tailwind CSS. Esse é um WebApp Full-Stack, para usar ele em sua totalidade em seu ambiente você precisa da [WenShop API](https://github.com/jhonatanwen/wenshop-api). O site oferecerá uma experiência de compra completa(Lista de desejos, Carrinho de Compras, Checkout e Tela de finalização de compra), autenticação de usuários e catálogo de produtos e suporte a tema claro\escuro.

## 🚀 Características

- ⚡ **Next.js 15** - Framework React com SSR
- 🎨 **Tailwind CSS** - Styling utilitário e responsivo
- 🌓 **Dark/Light Mode** - Tema automático baseado na preferência do sistema
- 🛒 **Carrinho de Compras** - Gerenciamento de estado global
- 🔐 **Autenticação** - Sistema completo de login/registro
- 📱 **Responsivo** - Design adaptativo para todos os dispositivos
- ⚡ **Performance** - Otimização automática e carregamento rápido
- 🔄 **Server Components** - Renderização híbrida otimizada

## 🛠️ Tecnologias

- **Framework**: Next.js 15
- **UI Library**: React 18
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Lint**: ESLint
- **Build Tool**: Turbopack (desenvolvimento)

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- Git

## ⚡ Instalação e Configuração

### 1. Clone do repositório

```bash
git clone <url-do-repositorio>
```

### 2. Entre na pasta

```bash
cd ecommerce-backend
```

### 3. Instalação das dependências

```bash
npm install
```

### 4. Execução

```bash
npm run dev
```

## 🎯 Funcionalidades

### 🏠 Rotas Principais

- **Home** (`/`) - Página inicial com produtos em destaque
- **Produtos** (`/products`) - Catálogo completo de produtos
- **Produto** (`/products/[id]`) - Detalhes do produto individual
- **Lista de Desejos**(`/wishlist`) - Gerenciamento da lista de desejos _(a implementar)_
- **Carrinho** (`/cart`) - Gerenciamento do carrinho de compras
- **Login** (`/login`) - Autenticação de usuários
- **Registro** (`/register`) - Cadastro de novos usuários
- **Perfil** (`/profile`) - Área do usuário logado

## 🔒 Segurança

- **XSS Protection** - Sanitização automática do React
- **CSRF Protection** - Tokens de autenticação seguros
- **Content Security Policy** - Headers de segurança

---

⭐ WenShop e o [WenShop-API](https://github.com/jhonatanwen/wenshop-api) são projetos para meu portfólio **se esses projetos foram interessantes para você, deixe uma estrela!**
