export type Animal = {
  id?: string;
  name?: string;
  type?: string;
  subType?: string;
  sex?: AnimalSex;
};

export type AnimalSex = "male" | "female";
