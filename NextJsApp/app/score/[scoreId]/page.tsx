interface Props {
    params: Promise<{ scoreId: string }>
}
  
export default async function ScorePage({ params }: Props) {
    const { scoreId } = await params

    return (
        <div className="p-10">
        <h1>Score ID: {scoreId}</h1>
        </div>
    )
}