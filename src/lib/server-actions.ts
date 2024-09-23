'use server'

import { cookies } from 'next/headers';

export async function shortenUrl(formData: FormData) {
  const cookieStore = cookies();
  const token = cookieStore.get('url_shortener_gh_session');

  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
    body: JSON.stringify({
      originalUrl: formData.get('url'),
      shortCode: formData.get('shortCode') ?? "",
      expiration: formData.get('expirationDate') ? new Date(formData.get('expirationDate') as string).getTime() : -1,
      description: formData.get('description') ?? "",
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to shorten URL');
  }

  const jsonResponse = response.json();

  console.log(jsonResponse);

  return jsonResponse;
}