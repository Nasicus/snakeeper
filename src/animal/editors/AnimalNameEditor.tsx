import { FC, Dispatch, SetStateAction } from "react";
import { Input } from "@mantine/core";
import { Animal } from "../animal.ts";

export const AnimalNameEditor: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
}> = ({ animal, changeAnimal }) => {
  return (
    <Input
      value={animal?.name ?? ""}
      onChange={(e) =>
        changeAnimal((a) => ({ ...a, name: e.currentTarget.value }))
      }
    />
  );
};
