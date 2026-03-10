import type { Metadata } from 'next'
import { ContributeExperience } from '@/components/contribute-experience'

export const metadata: Metadata = {
  title: 'Como Contribuir',
  description:
    'Veja o passo a passo para contribuir com o catálogo Girls in Tech Brazil e abrir seu Pull Request com segurança.',
  openGraph: {
    title: 'Como Contribuir | Girls in Tech Brazil',
    description:
      'Aprenda o fluxo completo de contribuição: fork, clone, JSON, Pull Request e revisão.',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/contribuir/',
  },
}

const STEPS = [
  {
    title: 'Faça um fork',
    description:
      'Acesse o repositório no GitHub e clique em "Fork" para criar sua cópia pessoal do projeto.',
  },
  {
    title: 'Clone e prepare',
    description:
      'Clone o seu fork localmente, execute npm install e crie uma branch com nome descritivo.',
  },
  {
    title: 'Crie o perfil JSON',
    description:
      'Adicione um arquivo .json em src/data/creators/ seguindo o schema oficial e rode npm run validate.',
  },
  {
    title: 'Abra o Pull Request',
    description:
      'Suba sua branch e abra um PR com o template do projeto, explicando quem é a criadora indicada.',
  },
  {
    title: 'Aguarde a revisão',
    description:
      'Após aprovação e merge, o deploy é automático via GitHub Actions e o perfil entra no site.',
  },
]

const FAQ = [
  {
    question: 'Preciso saber programar para contribuir?',
    answer:
      'Não é necessário conhecimento avançado. Saber editar um arquivo JSON e usar o básico do GitHub já é suficiente.',
  },
  {
    question: 'Posso sugerir meu próprio perfil?',
    answer:
      'Sim. Você pode abrir um PR com seu próprio perfil, desde que o conteúdo seja técnico e os links estejam públicos e ativos.',
  },
  {
    question: 'Quanto tempo leva para o PR ser revisado?',
    answer:
      'A revisão é feita por voluntárias e costuma acontecer em alguns dias. Acompanhe as notificações do GitHub.',
  },
  {
    question: 'O que acontece se meu JSON tiver erro?',
    answer:
      'O CI executa npm run validate:ci automaticamente. Se houver erro, o check falha e aponta o que precisa ser corrigido.',
  },
]

export default function ContribuirPage() {
  return <ContributeExperience steps={STEPS} faq={FAQ} />
}
