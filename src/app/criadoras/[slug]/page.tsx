export async function generateStaticParams() {
  return [{ slug: 'exemplo' }]
}

export default async function CriadoraPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main>
      <h1>Criadora: {slug}</h1>
      <p>Pagina individual placeholder em construcao.</p>
    </main>
  )
}
