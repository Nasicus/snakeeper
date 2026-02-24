import { FC, Dispatch, SetStateAction } from "react";
import { Modal, Stack, Button, Group } from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { Animal } from "../animal/animal.ts";
import { AnimalNameEditor } from "../animal/editors/AnimalNameEditor.tsx";
import { AnimalTypeEditor } from "../animal/editors/AnimalTypeEditor.tsx";
import { AnimalSubTypeEditor } from "../animal/editors/AnimalSubTypeEditor.tsx";
import { AnimalSexEditor } from "../animal/editors/AnimalSexEditor.tsx";

export const AnimalFormModal: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
  onSave: () => void;
  onCancel: () => void;
  title?: string;
}> = ({ animal, changeAnimal, onSave, onCancel, title = "Add Animal" }) => {
  return (
    <Modal opened={!!animal} onClose={onCancel} title={title} withCloseButton>
      <Stack>
        <AnimalNameEditor animal={animal} changeAnimal={changeAnimal} />
        <AnimalTypeEditor animal={animal} changeAnimal={changeAnimal} />
        <AnimalSubTypeEditor animal={animal} changeAnimal={changeAnimal} />
        <AnimalSexEditor animal={animal} changeAnimal={changeAnimal} />
        <Group justify="flex-end">
          <Button variant="default" leftSection={<IconX size={14} />} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            leftSection={<IconDeviceFloppy size={14} />}
            disabled={!animal?.name}
            onClick={onSave}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
