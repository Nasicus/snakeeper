import { FC } from "react";
import { Card, Text, Badge, Group, ActionIcon } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Animal } from "../animal/animal.ts";

export const AnimalCard: FC<{
  animal: Animal;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ animal, onEdit, onDelete }) => {
  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Group justify="space-between" mb="xs">
        <Text
          fw={600}
          size="lg"
          component={Link}
          to={`animals/${animal.id}`}
          td="none"
          c="snake"
        >
          {animal.name}
        </Text>
        <Group gap="xs">
          <ActionIcon variant="subtle" onClick={onEdit}>
            <IconPencil size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={onDelete}>
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Group>
      <Group gap="xs">
        {animal.type && (
          <Badge variant="light" color="snake">
            {animal.type}
          </Badge>
        )}
        {animal.subType && (
          <Badge variant="outline" color="snake">
            {animal.subType}
          </Badge>
        )}
        {animal.sex && <Badge variant="dot">{animal.sex}</Badge>}
      </Group>
    </Card>
  );
};
