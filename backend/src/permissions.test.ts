import { describe, expect, it, vi } from 'vitest';

// Baze ne potrebujemo, zato povezavo z bazo nadomestimo s praznim objektom.
vi.mock('./db.js', () => ({ prisma: {} }));

import { assertRole, HttpError } from './permissions.js';

const member = { id: 'm-1', role: 'MEMBER' as const, isActive: true };
const trainer = { id: 't-1', role: 'TRAINER' as const, isActive: true };

// Moji testi: preverjanje vlog (kdo sme do katere funkcije).
describe('assertRole – pravice glede na vlogo', () => {
  it('dovoli članu dostop do funkcije za člane', () => {
    expect(() => assertRole(member, 'MEMBER')).not.toThrow();
  });

  it('dovoli dostop, če je vloga ena od več dovoljenih', () => {
    expect(() => assertRole(trainer, 'MEMBER', 'TRAINER')).not.toThrow();
  });

  it('zavrne člana pri funkciji samo za trenerje s statusom 403', () => {
    try {
      assertRole(member, 'TRAINER');
      expect.unreachable('pričakovana je napaka');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect((error as HttpError).status).toBe(403);
    }
  });

  it('zavrne deaktiviran račun s statusom 401', () => {
    try {
      assertRole({ ...member, isActive: false }, 'MEMBER');
      expect.unreachable('pričakovana je napaka');
    } catch (error) {
      expect((error as HttpError).status).toBe(401);
    }
  });
});
