export async function generateStaticParams() {
  return [{ slug: 'exemplo' }]
}

export default function CriadoraPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  return (
    <main>
      <h1>Criadora: {slug}</h1>
      <p>Página individual placeholder em construção.</p>
    </main>
  )
}
