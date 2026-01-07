'use server';

export async function saveNameAction(
  prevState: { ok: boolean } | null,
  formData: FormData
): Promise<{ ok: boolean }> {
  const name = formData.get('name');

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Saving name:', { name });

  return { ok: true };
}
