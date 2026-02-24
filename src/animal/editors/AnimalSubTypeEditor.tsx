import { FC, Dispatch, SetStateAction } from "react";
import { TextInput } from "@mantine/core";
import { Animal } from "../animal.ts";

export const AnimalSubTypeEditor: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
}> = ({ animal, changeAnimal }) => {
  return (
      <TextInput
          label="Subtype"
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
