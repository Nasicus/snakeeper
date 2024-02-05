import { FC } from "react";
import { useParams } from "react-router-dom";

export const AnimalDetail: FC = () => {
  const { animalId } = useParams();

  return <>{animalId}</>;
};
