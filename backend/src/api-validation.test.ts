import { describe, expect, it, vi } from 'vitest';
import request from 'supertest';

// Testiramo samo zavrnitve, ki se zgodijo pred dostopom do baze.
vi.mock('./db.js', () => ({ prisma: {} }));

import { createApp } from './app.js';

const frontend = 'http://localhost:5173';
const app = createApp(frontend, 'test-only-secret-at-least-32-characters');

// Moji testi: API končne točke zavrnejo neveljavne zahteve.
describe('API – zaščita in validacija zahtevkov', () => {
  it('zavrne dostop do programov brez prijave (401)', async () => {
    const response = await request(app).get('/api/programs');
    expect(response.status).toBe(401);
    expect(response.headers['www-authenticate']).toBe('Bearer');
  });

  it('zavrne ponarejen žeton (401)', async () => {
    const response = await request(app).get('/api/programs').set('Authorization', 'Bearer ponarejen.zeton.123');
    expect(response.status).toBe(401);
  });

  it('zavrne registracijo s prekratkim geslom (400)', async () => {
    const response = await request(app).post('/api/auth/register').set('Origin', frontend)
      .send({ displayName: 'Test', email: 'test@example.com', password: 'kratko' });
    expect(response.status).toBe(400);
    expect(response.body.fields.password).toBeDefined();
  });

  it('zavrne prijavo z neveljavnim e-naslovom (400)', async () => {
    const response = await request(app).post('/api/auth/login').set('Origin', frontend)
      .send({ email: 'ni-e-naslov', password: 'GymTracker-dev-123!' });
    expect(response.status).toBe(400);
  });

  it('zavrne zahtevek z druge spletne strani (403)', async () => {
    const response = await request(app).post('/api/auth/login').set('Origin', 'https://napadalec.example')
      .send({ email: 'member@gymtracker.local', password: 'GymTracker-dev-123!' });
    expect(response.status).toBe(403);
  });
});
