// DisciplineOS V2 Data Models

export interface IdentityProfile {
  targetIdentity: string;
  targetDeadline: string;
  currentDerivedIdentity: string;
  identityLevel: number;
  totalAlignedSessions: number;
}

export interface FutureSelfProjection {
  progressPercentage: number;
  originalETA: string; // e.g., "18 months"
  currentETA: string; // e.g., "21 months"
  ifCondition: string; // e.g., "+1h study/day"
  ifETA: string; // e.g., "13 months"
}

export interface DisciplineDebt {
  id: string;
  category: string;
  accumulatedHours: number;
  opportunityCostDays: number;
  severity: 'high' | 'medium' | 'low';
}

export interface Bottleneck {
  primaryIssue: string;
  hoursLostPerMonth: number;
  suggestedFix: string;
  expectedGainHours: number;
}

export interface LeverageAction {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
}

export interface LifeAudit {
  weekStart: string;
  totalInvestedHours: number;
  totalWastedHours: number;
  primaryBottleneck: string;
  wouldRepeat: boolean | null;
}

// --- DEMO DATA FOR V2 ---

export const DEMO_USER = {
  name: 'Kiran',
  email: 'kiran@disciplineos.app',
  joinDate: '2026-01-15',
  tier: 'pro' as const,
};

export const DEMO_IDENTITY: IdentityProfile = {
  targetIdentity: 'AI Engineer & Builder',
  targetDeadline: '2027-12-31',
  currentDerivedIdentity: 'Information Consumer',
  identityLevel: 12,
  totalAlignedSessions: 147,
};

export const DEMO_FUTURE_SELF: FutureSelfProjection = {
  progressPercentage: 23,
  originalETA: '18 months',
  currentETA: '21 months',
  ifCondition: '+1h deep work/day',
  ifETA: '13 months',
};

export const DEMO_DEBT: DisciplineDebt[] = [
  { id: '1', category: 'Deep Work', accumulatedHours: 18.5, opportunityCostDays: 32, severity: 'high' },
  { id: '2', category: 'Sleep', accumulatedHours: 14, opportunityCostDays: 8, severity: 'medium' },
  { id: '3', category: 'Exercise', accumulatedHours: 4.5, opportunityCostDays: 3, severity: 'low' },
];

export const DEMO_BOTTLENECK: Bottleneck = {
  primaryIssue: 'Late Night Phone Usage',
  hoursLostPerMonth: 47,
  suggestedFix: 'Block social media routing after 9 PM',
  expectedGainHours: 29,
};

export const DEMO_LEVERAGE_ACTION: LeverageAction = {
  id: 'action_1',
  title: 'Complete Neural Network API Integration',
  description: 'Clearing this action reduces your Deep Work debt by 2 hours.',
  completed: false,
  category: 'career',
};

export const DEMO_OPERATING_MANUAL = {
  peakFocusWindow: '8:10 AM - 11:40 AM',
  minimumSleep: '6.7 hours',
  distractionThreshold: '>42 min social media → 28% focus drop',
  bestRecovery: '20-minute walking (restores focus in 22 min avg)',
  mostProductiveDay: 'Tuesday',
  worstTrigger: 'Late-night phone use (causes -2h focus next day)',
};

export const DEMO_WEEKLY_AUDIT: LifeAudit = {
  weekStart: '2026-06-04',
  totalInvestedHours: 28.5,
  totalWastedHours: 14.2,
  primaryBottleneck: 'Context switching during study blocks',
  wouldRepeat: null, // Waiting for user input
};
