import { FC, useState } from "react";
import { Animal } from "../animal/animal.ts";
import { Card, Group, Title, ActionIcon, Text, SimpleGrid } from "@mantine/core";
import { IconPencil, IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AnimalFormModal } from "../animalsOverview/AnimalFormModal.tsx";

export const AnimalDetails: FC<{
  animal: Animal;
  onUpdate: (animal: Animal) => unknown;
}> = ({ animal, onUpdate }) => {
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);

  return (
    <>
      <Card shadow="sm" padding="lg" withBorder mb="lg">
        <Group justify="space-between" mb="md">
          <Group>
            <ActionIcon
              variant="subtle"
              component={Link}
              to="/"
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <Title order={2}>{animal.name}</Title>
          </Group>
          <ActionIcon variant="subtle" onClick={() => setAnimalToEdit(animal)}>
            <IconPencil size={20} />
          </ActionIcon>
        </Group>

        <SimpleGrid cols={{ base: 2, sm: 4 }}>
          <div>
            <Text size="sm" c="dimmed">
              Type
            </Text>
            <Text fw={500}>{animal.type || "-"}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Subtype
            </Text>
            <Text fw={500}>{animal.subType || "-"}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Sex
            </Text>
            <Text fw={500}>{animal.sex || "-"}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Date of Birth
            </Text>
            <Text fw={500}>
              {animal.dateOfBirth ? (
                <>
                  {animal.dateOfBirth.toDateString()} (
                  {getAge(animal.dateOfBirth)})
                </>
              ) : (
                "-"
              )}
            </Text>
          </div>
        </SimpleGrid>
      </Card>

      <AnimalFormModal
        animal={animalToEdit}
        changeAnimal={setAnimalToEdit}
        onSave={() => {
          if (animalToEdit) {
            onUpdate(animalToEdit);
            setAnimalToEdit(null);
          }
        }}
        onCancel={() => setAnimalToEdit(null)}
        title="Edit Animal"
      />
    </>
  );

  function getAge(date: Date) {
    const now = new Date();
    let months: number;
    months = (now.getFullYear() - date.getFullYear()) * 12;
    months -= date.getMonth();
    months += now.getMonth();
    return months <= 0 ? `-` : `${(months / 12).toFixed(1)} years`;
  }
};
