import { FC, useState } from "react";
import { Animal } from "../animal/animal.ts";
import { Flex, Title, ActionIcon, Text } from "@mantine/core";
import { AnimalNameEditor } from "../animal/editors/AnimalNameEditor.tsx";
import { IconPencil, IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AnimalTypeEditor } from "../animal/editors/AnimalTypeEditor.tsx";
import { AnimalSubTypeEditor } from "../animal/editors/AnimalSubTypeEditor.tsx";
import { AnimalSexEditor } from "../animal/editors/AnimalSexEditor.tsx";

export const AnimalDetails: FC<{
  animal: Animal;
  onUpdate: (animal: Animal) => unknown;
}> = ({ animal, onUpdate }) => {
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);
  const isEditMode = !!animalToEdit;

  return (
    <>
      <Flex align="center" justify="flex-start">
        {!isEditMode && (
          <Title order={2} mr="sm">
            {animal.name}
          </Title>
        )}
        {isEditMode && (
          <AnimalNameEditor
            animal={animalToEdit}
            changeAnimal={setAnimalToEdit}
          />
        )}
        {!isEditMode && (
          <>
            <ActionIcon onClick={() => setAnimalToEdit(animal)} mr="sm">
              <IconPencil />
            </ActionIcon>
            <Link to="/">Back</Link>
          </>
        )}
        {isEditMode && (
          <>
            <ActionIcon
              onClick={() => {
                onUpdate(animalToEdit);
                setAnimalToEdit(null);
              }}
              disabled={!animalToEdit?.name}
              ml="sm"
              mr="sm"
            >
              <IconDeviceFloppy />
            </ActionIcon>
            <ActionIcon onClick={() => setAnimalToEdit(null)}>
              <IconX />
            </ActionIcon>
          </>
        )}
      </Flex>

      <Flex justify="space-between" mt="sm" mb="xl">
        <div>
          <Text fw={700} display="block">
            Type
          </Text>
          {!isEditMode && animal.type}
          {isEditMode && (
            <AnimalTypeEditor
              animal={animalToEdit}
              changeAnimal={setAnimalToEdit}
            />
          )}
        </div>
        <div>
          <Text fw={700} display="block">
            Subtype
          </Text>
          {!isEditMode && animal.subType}
          {isEditMode && (
            <AnimalSubTypeEditor
              animal={animalToEdit}
              changeAnimal={setAnimalToEdit}
            />
          )}
        </div>
        <div>
          <Text fw={700} display="block">
            Sex
          </Text>
          {!isEditMode && animal.sex}
          {isEditMode && (
            <AnimalSexEditor
              animal={animalToEdit}
              changeAnimal={setAnimalToEdit}
            />
          )}
        </div>
        <div>
          <Text fw={700} display="block">
            Date Of Birth
          </Text>

          {animal.dateOfBirth?.toDateString() || "-"}
        </div>
      </Flex>
    </>
  );
};
