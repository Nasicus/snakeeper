import { FC, Dispatch, SetStateAction } from "react";
import { Animal } from "./animal.ts";
import { DateInput } from "@mantine/dates";

export const AnimalDateOfBirthEditor: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
}> = ({ animal, changeAnimal }) => {
  return (
    <DateInput
      value={animal?.dateOfBirth}
      onChange={(e) =>
        changeAnimal((a) => ({ ...a, dateOfBirth: e || undefined }))
      }
    />
  );
};
