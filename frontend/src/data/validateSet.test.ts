import { describe, expect, it } from 'vitest';
import { validateSet } from './workouts';

// Moji testi: validacija vnosa serije (ponovitve in teža) pred shranjevanjem.
describe('validateSet – validacija serije', () => {
  it('sprejme celo število ponovitev in težo', () => {
    expect(() => validateSet(8, 60)).not.toThrow();
  });

  it('sprejme serijo brez teže (vaja z lastno težo)', () => {
    expect(() => validateSet(12, null)).not.toThrow();
  });

  it('zavrne 0 ponovitev', () => {
    expect(() => validateSet(0, 40)).toThrow('Reps must be a whole number greater than zero.');
  });

  it('zavrne decimalno število ponovitev', () => {
    expect(() => validateSet(8.5, 40)).toThrow('Reps must be a whole number greater than zero.');
  });

  it('zavrne negativno težo', () => {
    expect(() => validateSet(8, -5)).toThrow('Weight must be between 0 and 9,999.99 kg, or left blank.');
  });

  it('zavrne težo nad 9999,99 kg', () => {
    expect(() => validateSet(8, 10000)).toThrow('Weight must be between 0 and 9,999.99 kg, or left blank.');
  });
});
