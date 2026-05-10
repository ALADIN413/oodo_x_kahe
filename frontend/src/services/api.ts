const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

async function request(path: string, options: RequestInit = {}) {
  const url = `${API_URL}/api${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function authRequest(path: string, token: string, options: RequestInit = {}) {
  return request(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}

export const api = {
  signup: (name: string, email: string, password: string) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

  login: (email: string, password: string) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  getMe: (token: string) => authRequest('/auth/me', token),

  createGroup: (token: string, name: string) =>
    authRequest('/groups/create', token, { method: 'POST', body: JSON.stringify({ name }) }),

  joinGroup: (token: string, inviteCode: string) =>
    authRequest('/groups/join', token, { method: 'POST', body: JSON.stringify({ inviteCode }) }),

  getGroup: (token: string, id: string) => authRequest(`/groups/${id}`, token),

  getMyGroups: (token: string) => authRequest('/groups/my', token),

  generateQuestions: (token: string) =>
    authRequest('/trips/questions/generate', token, { method: 'POST' }),

  createTrip: (token: string, data: any) =>
    authRequest('/trips/create', token, { method: 'POST', body: JSON.stringify(data) }),

  submitAnswers: (token: string, tripId: string, answers: string[]) =>
    authRequest('/trips/submit-answers', token, { method: 'POST', body: JSON.stringify({ tripId, answers }) }),

  regenerateDay: (token: string, tripId: string, dayNumber: number, instruction: string) =>
    authRequest('/trips/regenerate-day', token, { method: 'POST', body: JSON.stringify({ tripId, dayNumber, instruction }) }),

  getTrips: (token: string, groupId: string) => authRequest(`/trips/${groupId}`, token),
};
