export type Animal = {
  id?: string;
  name?: string;
  type?: string;
  subType?: string;
  sex?: AnimalSex;
  
  // the following fields are set via reports
  dateOfBirth?: Date;
};

export type AnimalSex = "male" | "female";
