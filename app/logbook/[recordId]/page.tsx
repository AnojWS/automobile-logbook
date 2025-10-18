import { LogbookView } from "@/components/logbook-view"

export default async function LogbookPage({
  params,
}: {
  params: Promise<{ recordId: string }>
}) {
  const { recordId } = await params
  return <LogbookView recordId={recordId} />
}

