export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  isCitizen: boolean;
  createDate: string;
  phone: string;
}

export interface CreateUserInput {
  numbers: Id;
  firstName: string;
  lastName: string;
  age: number;
  isCitizen: boolean;
  phone: string;
}