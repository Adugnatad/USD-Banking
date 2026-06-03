export type ActiveView =
  | "home"
  | "benefits"
  | "cards"
  | "load"
  | "open-account"
  | "login"
  | "Dashboard"
  | "become-partner"
  | "become-partner-coworking"
  | "become-partner-hotel";

export interface MileTransaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  icon: string;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  userType: "local" | "premium";
  identityNumber: string;
  residence: string;
  nationality: string;
}

export interface AccountState {
  milesBalance: number;
  savingsBalance: number;
  cardBalance: number;
  shebaMilesNumber: string | null;
  applicantName: string;
  recentTransactions: MileTransaction[];
  userProfile?: UserProfile;
}
