import { describe, it, expect, beforeEach } from 'vitest';

// Mock Clarity contract state
let reputations = new Map();
let privacySettings = new Map();

// Mock Clarity functions
function addReputation(user: string, app: string, score: number): number {
  const key = `${user}-${app}`;
  const currentScore = reputations.get(key) || 0;
  const newScore = currentScore + score;
  reputations.set(key, newScore);
  return newScore;
}

function getReputation(user: string, app: string): number | null {
  const key = `${user}-${app}`;
  return reputations.get(key) || null;
}

function setPrivacy(user: string, isPublic: boolean): boolean {
  privacySettings.set(user, isPublic);
  return isPublic;
}

function getPrivacy(user: string): boolean {
  return privacySettings.get(user) ?? true;
}

describe('Reputation Contract', () => {
  beforeEach(() => {
    reputations.clear();
    privacySettings.clear();
  });
  
  it('should add reputation and retrieve it', () => {
    const user1 = 'user1';
    const user2 = 'user2';
    const app = 'app1';
    
    expect(addReputation(user1, app, 10)).toBe(10);
    expect(addReputation(user2, app, 5)).toBe(5);
    
    expect(getReputation(user1, app)).toBe(10);
    expect(getReputation(user2, app)).toBe(5);
  });
  
  it('should update existing reputation', () => {
    const user = 'user1';
    const app = 'app1';
    
    expect(addReputation(user, app, 10)).toBe(10);
    expect(addReputation(user, app, 5)).toBe(15);
    expect(getReputation(user, app)).toBe(15);
  });
  
  it('should set and get privacy settings', () => {
    const user = 'user1';
    
    expect(getPrivacy(user)).toBe(true); // Default to public
    expect(setPrivacy(user, false)).toBe(false);
    expect(getPrivacy(user)).toBe(false);
  });
  
  it('should return null for non-existent reputation', () => {
    expect(getReputation('nonexistent', 'app1')).toBeNull();
  });
});

