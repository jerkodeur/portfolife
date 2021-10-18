import { useCallback, useState } from "react";
import { useToaster } from "@helpers/customHooks";

import { getAllTechnos } from "@controllers/technoController";

export const useFetchTechnos = (initialValue) => {
  const [technos, setTechnos] = useState(initialValue);

  const fetchTechnos = useCallback(
    () =>
      getAllTechnos()
        .then((technos) => setTechnos(technos))
        .catch((err) => console.log(err) || useToaster.fail("Erreur lors de la récupération des technos")),
    []
  );

  return [technos, fetchTechnos];
};
