export interface BirthDetails {
  date: string;
  time: string;
  city: string;
  country: string;
}

export interface AstrologyReading {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  natalAnalysis: string;
  currentPrediction: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}