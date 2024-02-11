import { FC, Dispatch, SetStateAction } from "react";
import { Table, ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { Animal } from "../animal/animal.ts";
import { AnimalNameEditor } from "../animal/editors/AnimalNameEditor.tsx";
import { AnimalTypeEditor } from "../animal/editors/AnimalTypeEditor.tsx";
import { AnimalSubTypeEditor } from "../animal/editors/AnimalSubTypeEditor.tsx";
import { AnimalSexEditor } from "../animal/editors/AnimalSexEditor.tsx";

export const EditableAnimalRow: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
  saveChanges: () => unknown;
  cancelEdit?: () => unknown;
}> = ({ animal, changeAnimal, saveChanges, cancelEdit }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <AnimalNameEditor animal={animal} changeAnimal={changeAnimal} />
      </Table.Td>
      <Table.Td>
        <AnimalTypeEditor animal={animal} changeAnimal={changeAnimal} />
      </Table.Td>
      <Table.Td>
        <AnimalSubTypeEditor animal={animal} changeAnimal={changeAnimal} />
      </Table.Td>
      <Table.Td>
        <AnimalSexEditor animal={animal} changeAnimal={changeAnimal} />
      </Table.Td>
      <Table.Td>
        <ActionIcon disabled={!animal?.name} onClick={saveChanges}>
          <IconDeviceFloppy />
        </ActionIcon>
        {cancelEdit && (
          <ActionIcon onClick={cancelEdit} ml="xs">
            <IconX />
          </ActionIcon>
        )}
      </Table.Td>
    </Table.Tr>
  );
};
