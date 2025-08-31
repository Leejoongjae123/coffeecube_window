export interface UserStats {
  totalInput: string;
  todayInput: string;
  myPoints: string;
}

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    full_name?: string;
  };
}
