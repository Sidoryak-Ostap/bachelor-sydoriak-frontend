import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:3000';

export const handlers = [
  http.get(`${API_BASE_URL}/api/health`, () => {
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),

  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    const { email, password } = body;

    if (email === 'test@gmail.com' && password === 'password123') {
      return HttpResponse.json(
        {
          accessToken: 'fake-jwt-token',
          user: {
            id: 1,
            email,
            name: 'Test User',
          },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }),
];
