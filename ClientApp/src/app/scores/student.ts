import { IScore } from "./score";

export interface IStudent {
    studentId: number;
    firstName: string;
    lastName: string;
    scores: Array<IScore>;
  }