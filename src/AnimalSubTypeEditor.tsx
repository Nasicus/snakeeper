import { FC, Dispatch, SetStateAction } from "react";
import { Input } from "@mantine/core";
import { Animal } from "./animal.ts";

export const AnimalSubTypeEditor: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
}> = ({ animal, changeAnimal }) => {
  return (
      <Input
          value={animal?.subType ?? ""}
          onChange={(e) =>
              changeAnimal((a) => ({
                ...a,
                subType: e.currentTarget.value,
              }))
          }
      />
  );
};
