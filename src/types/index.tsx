export interface User {
  name: string;
  surname: string;
}

export interface Contract {
  id?: string;
  user: User;
  amountInUsd: string;
  currency: string;
  date: string;
}

export type CurrentContract = Contract | object;

export type Contracts = Contract[] | [];

export interface StoreState {
  currentContract: CurrentContract;
  contracts: Contracts;
}
