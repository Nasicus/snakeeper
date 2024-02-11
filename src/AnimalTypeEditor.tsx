import { FC, Dispatch, SetStateAction } from "react";
import { Input } from "@mantine/core";
import { Animal } from "./animal.ts";

export const AnimalTypeEditor: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
}> = ({ animal, changeAnimal }) => {
  return (
    <Input
      value={animal?.type ?? ""}
      onChange={(e) =>
        changeAnimal((a) => ({ ...a, type: e.currentTarget.value }))
      }
    />
  );
};
