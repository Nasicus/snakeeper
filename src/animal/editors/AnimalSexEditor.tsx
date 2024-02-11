import { FC, Dispatch, SetStateAction } from "react";
import { Select } from "@mantine/core";
import { Animal, AnimalSex } from "../animal.ts";

export const AnimalSexEditor: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
}> = ({ animal, changeAnimal }) => {
  return (
    <Select
      value={animal?.sex}
      data={[
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ]}
      onChange={(v) =>
        changeAnimal((a) => ({
          ...a,
          sex: (v as AnimalSex) ?? undefined,
        }))
      }
    />
  );
};
