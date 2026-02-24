import { FC, Dispatch, SetStateAction } from "react";
import { TextInput } from "@mantine/core";
import { Animal } from "../animal.ts";

export const AnimalTypeEditor: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
}> = ({ animal, changeAnimal }) => {
  return (
    <TextInput
      label="Type"
      value={animal?.type ?? ""}
      onChange={(e) =>
        changeAnimal((a) => ({ ...a, type: e.currentTarget.value }))
      }
    />
  );
};
