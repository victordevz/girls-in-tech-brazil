# Girls in Tech Brazil Web Platform

Plataforma web estatica para destacar criadoras e referencias femininas na tecnologia brasileira.

## Estado atual

Este repositorio esta na fase fundacional (Epic E1). O foco atual e setup tecnico, rotas placeholder e qualidade base para evolucao dos proximos epicos.

## Pre-requisitos

- Node.js >= 22.0.0
- npm >= 10.0.0

## Setup local

```bash
npm install
npm run dev
```

Aplicacao local: `http://localhost:3000`

## Rotas placeholder do MVP

- `/`
- `/sobre`
- `/contribuir`
- `/criadoras`
- `/criadoras/exemplo`

## Scripts disponiveis

- `npm run dev`: sobe ambiente local
- `npm run build`: gera build estatico
- `npm run start`: inicia app em modo producao
- `npm run lint`: executa lint
- `npm run type-check`: executa tipagem sem emitir arquivos
- `npm run format`: formata arquivos
- `npm run format:check`: valida formatacao

## Estrutura de diretorios

```text
src/
  app/
  components/
  data/creators/
  lib/
  schemas/
  styles/
public/
```

## Legado da comunidade

O conteudo historico original do repositorio foi preservado em `README-legacy.md`.

## Contribuicao

Fluxo de contribuicao via Pull Request. Antes de abrir PR, execute:

```bash
npm run lint
npm run type-check
npm run build
```
