import { FC } from "react";
import { deleteDoc, DocumentReference } from "firebase/firestore";
import { Modal, Text, Group, Button } from "@mantine/core";

export const DeleteAnimalModal: FC<{
  animal: { name: string; docRef: DocumentReference } | null;
  onClose: () => void;
}> = ({ animal, onClose }) => {
  return (
    <Modal
      opened={animal !== null}
      onClose={onClose}
      title="Delete Animal"
      centered
    >
      <Text mb="lg">
        Are you sure you want to delete{" "}
        <Text span fw={700}>
          {animal?.name}
        </Text>
        ? This cannot be undone.
      </Text>
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => {
            if (animal) {
              deleteDoc(animal.docRef);
              onClose();
            }
          }}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
};
