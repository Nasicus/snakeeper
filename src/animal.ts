export type Animal = {
  id?: string;
  name?: string;
  type?: string;
  subType?: string;
  sex?: AnimalSex;
  dateOfBirth?: Date;
};

export type AnimalSex = "male" | "female";
