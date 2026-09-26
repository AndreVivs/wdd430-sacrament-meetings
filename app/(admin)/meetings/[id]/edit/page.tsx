interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;

  return (
    <main>
      <h1>Edit Meeting {id} — Coming in Week 04</h1>
    </main>
  );
}