# Como contribuir

Obrigada por querer contribuir com o Girls in Tech Brazil.

Este projeto reúne perfis de mulheres referências em tecnologia no Brasil. A contribuição principal do MVP é adicionar ou atualizar perfis de criadoras por meio de Pull Requests.

## Pré-requisitos

- Node.js 22 ou superior
- npm 10 ou superior
- Git
- Conta no GitHub

## Setup inicial do repositório (maintainers)

Estas configuracoes sao obrigatorias uma unica vez para ativar o fluxo completo de CI/CD.

### 1. GitHub Pages

1. Abra `Settings -> Pages` no repositório.
2. Em **Source**, selecione **GitHub Actions**.
3. Salve.

Depois disso, todo merge na `main` aciona o deploy automatico para:
`https://bullas.github.io/girls-in-tech-brazil/`

### 2. Branch protection da `main`

Em `Settings -> Branches -> main`, habilite:

- `Require a pull request before merging`
- `Require status checks to pass before merging`
- check obrigatório do job `validate` (workflow `CI - Validacao de PR`)
- `Require branches to be up to date before merging` (recomendado)

### 3. Fluxo operacional esperado

1. Contribuidora abre PR para `main`.
2. `ci.yml` roda (`validate:ci`, `lint`, `type-check`, `build`).
3. PR aprovado e mergeado.
4. `deploy-pages.yml` publica automaticamente no GitHub Pages.

## Fluxo rápido para adicionar seu perfil

1. Faça um fork do repositório.
2. Clone seu fork localmente.
3. Crie uma branch com `git checkout -b add/seu-slug`.
4. Copie `src/data/creators/_example.json` para um novo arquivo em `src/data/creators/` com o nome `seu-slug.json`.
5. Preencha os campos do arquivo seguindo as regras abaixo.
6. Execute `npm install`.
7. Execute `npm run validate`.
8. Se tudo passar, faça commit, push e abra um Pull Request usando o template do projeto.

## Estrutura esperada do arquivo

Os campos devem seguir esta ordem:

1. `slug`
2. `name`
3. `headline`
4. `bio`
5. `region`
6. `categories`
7. `tags`
8. `links`
9. `avatar`
10. `featured`

## Regras dos campos

### Obrigatórios

- `slug`: identificador único em kebab-case. Exemplo: `ana-silva-dev`
- `name`: nome público da criadora
- `headline`: frase curta com 10 a 80 caracteres
- `bio`: biografia com 50 a 500 caracteres
- `categories`: pelo menos uma categoria permitida
- `links`: pelo menos um link público válido

### Opcionais

- `region`: sigla de UF brasileira válida, como `SP`, `RJ` ou `PE`
- `tags`: até 8 tags com 2 a 24 caracteres cada
- `avatar`: URL HTTPS ou caminho local em `/images/creators/`
- `featured`: destaque editorial; se ausente, o valor padrão é `false`

## Categorias permitidas

- `Frontend`
- `Backend`
- `Full Stack`
- `Mobile`
- `Data`
- `AI`
- `Cloud`
- `DevOps`
- `Security`
- `UX/UI`
- `Career`
- `Community`
- `Open Source`
- `Education`
- `Product`
- `Engineering Leadership`

## Tipos de conteúdo derivados dos links

O projeto calcula automaticamente os tipos de conteúdo com base nas chaves presentes em `links`. Você não precisa preencher esse campo manualmente.

Chaves aceitas:

- `youtube`
- `instagram`
- `linkedin`
- `github`
- `website`
- `blog`
- `podcast`
- `newsletter`
- `twitter`

## Regras de validação importantes

- O nome do arquivo deve ser exatamente o mesmo valor de `slug`.
- `slug` não pode duplicar outro perfil.
- `name` não pode duplicar outro perfil.
- `categories` só aceita valores da lista permitida.
- `tags` não podem ficar duplicadas depois da normalização.
- `links` precisa ter ao menos uma URL válida.
- Arquivos iniciados com `_` são ignorados pelo dataset público.

## Exemplo mínimo

```json
{
  "slug": "exemplo-criadora",
  "name": "Exemplo Criadora",
  "headline": "Educadora tech e criadora de conteúdo sobre carreira",
  "bio": "Perfil fictício usado como referência para mostrar o formato esperado dos dados de uma criadora no projeto Girls in Tech Brazil.",
  "categories": ["Education"],
  "links": {
    "youtube": "https://www.youtube.com/@exemplocriadora"
  }
}
```

## Comandos úteis

- `npm run validate`: valida o dataset de criadoras
- `npm run lint`: executa o lint do projeto
- `npm run type-check`: valida a tipagem TypeScript
- `npm run build`: garante que a aplicação ainda gera a build corretamente

## Para maintainers

Para que o CI bloqueie merges com dados inválidos, configure a branch `main` no GitHub com:

- `Require status checks to pass before merging`
- check obrigatório do job `validate`
- `Require branches to be up to date before merging`

## Boas práticas ao abrir seu PR

- Explique se o PR adiciona um novo perfil ou corrige um existente.
- Informe se executou `npm run validate`.
- Evite alterar arquivos que não estejam relacionados à sua contribuição.
