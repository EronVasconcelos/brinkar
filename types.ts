export interface ActivityFormData {
  location: string;
  childCount: number;
  ageRanges: string[];
  resources: string[];
  duration: string;
  energyLevel: 'calm' | 'medium' | 'high';
}

export interface ActivityResponse {
  title: string;
  objective: string;
  preparation: string;
  rules: string[];
  adaptation: string;
  tip: string;
}

export enum EnergyLevel {
  LOW = 'calm',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface User {
  name: string;
  email: string;
  dob: string;
  password: string; // Em produção, nunca armazene senhas em texto puro
}