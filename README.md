# Girls in Tech Brazil

> Descubra quem está construindo o futuro tech no Brasil.

Vitrine curada de criadoras brasileiras de conteúdo sobre tecnologia — com perfis editoriais, filtros por categoria, busca e página de descoberta animada.

## Sobre o projeto

O **Girls in Tech Brazil** amplifica vozes femininas na tecnologia brasileira. Qualquer pessoa pode contribuir adicionando ou atualizando perfis via Pull Request — sem banco de dados, sem backend, tudo em arquivos JSON validados.

- **20 criadoras** no dataset inicial
- **5 rotas** estáticas geradas com Next.js App Router
- Design system **Pulso BR Tech** — paleta violeta/rosa/dourado, fonte Outfit
- Animações com Framer Motion: parallax, tilt 3D, contadores, scroll reveals
- Deploy estático para GitHub Pages

## Pré-requisitos

- Node.js >= 22.0.0
- npm >= 10.0.0

## Setup local

```bash
npm install
npm run dev
```

Aplicação disponível em `http://localhost:3000`

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Homepage com hero, métricas e destaque de criadoras |
| `/criadoras` | Listagem completa com busca e filtros por categoria |
| `/criadoras/[slug]` | Perfil individual da criadora |
| `/sobre` | Sobre o projeto |
| `/contribuir` | Como contribuir |

## Scripts

```bash
npm run dev          # sobe o ambiente local
npm run build        # gera o build estático para produção
npm run validate     # valida todos os perfis em src/data/creators/
npm run lint         # executa o lint
npm run type-check   # verifica tipagem sem emitir arquivos
npm run format       # formata os arquivos com Prettier
```

## Estrutura de diretórios

```text
src/
  app/            # rotas do App Router (Next.js)
  components/     # componentes React reutilizáveis
  data/creators/  # perfis em JSON — fonte de verdade
  lib/            # utilitários de dados e animação
  schemas/        # schema Zod do perfil de criadora
  styles/         # CSS global e tokens do design system
public/
  images/creators/ # avatares locais (opcional)
scripts/
  validate-data.ts # validação do dataset via Zod
```

## Contribuindo

Quer adicionar seu perfil ou o de outra criadora? Leia o [CONTRIBUTING.md](CONTRIBUTING.md) para o fluxo completo.

Antes de abrir um PR, rode localmente:

```bash
npm run validate
npm run lint
npm run type-check
npm run build
```

## Tecnologias

- [Next.js 15](https://nextjs.org/) — App Router, static export
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zod 4](https://zod.dev/)

## Histórico

O conteúdo original da comunidade foi preservado em [`README-legacy.md`](README-legacy.md).
