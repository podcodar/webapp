import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/api')) {
    // This logic is only applied to /about
    return new Response('Unauthorized', {
      status: 403,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  const basicAuth = req.headers.get('authorization');
  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [user, pwd] = atob(auth).split(':');

    if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASSWD) {
      return NextResponse.next();
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}
