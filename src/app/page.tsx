import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type AuthStatusResponse = {
  isValid: boolean;
  success: boolean;
  error?: string;
};

async function checkAuthStatus() {
  const sessionCookie = cookies().get('url_shortener_gh_session');
  
  if (!sessionCookie) {
    return false;
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate`, {
      headers: {
        Cookie: `url_shortener_gh_session=${sessionCookie.value}`,
      },
    });
    const data: AuthStatusResponse = await response.json();
    console.log("Data:", data);
    return data.success && data.isValid;
  } catch (error) {
    console.error('Error validating session:', error);
    return false;
  }
}

export default async function RootPage() {
  const isLoggedIn = await checkAuthStatus();

  if (isLoggedIn) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }

  // This return statement will never be reached due to the redirects,
  // but it's here to satisfy TypeScript
  return null;
}