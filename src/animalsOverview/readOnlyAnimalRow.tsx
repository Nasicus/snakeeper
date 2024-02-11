import { FC, useState } from "react";
import { EditableAnimalRow } from "./editableAnimalRow.tsx";
import { Table, ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Animal } from "../animal/animal.ts";

export const ReadOnlyAnimalRow: FC<{
  animal: Animal;
  onDelete: () => unknown;
  onUpdate: (updatedAnimal: Animal) => unknown;
}> = ({ animal, onDelete, onUpdate }) => {
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);
  const isEditMode = !!animalToEdit;

  if (isEditMode) {
    return (
      <EditableAnimalRow
        animal={animalToEdit}
        changeAnimal={setAnimalToEdit}
        cancelEdit={() => setAnimalToEdit(null)}
        saveChanges={() => {
          onUpdate(animalToEdit);
          setAnimalToEdit(null);
        }}
      />
    );
  }

  return (
    <Table.Tr>
      <Table.Td>
        <Link to={`animals/${animal.id}`}>{animal.name}</Link>
      </Table.Td>
      <Table.Td>{animal.type}</Table.Td>
      <Table.Td>{animal.subType}</Table.Td>
      <Table.Td>{animal.sex}</Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => setAnimalToEdit(animal)}>
          <IconPencil />
        </ActionIcon>
        <ActionIcon onClick={onDelete} ml="xs">
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};
