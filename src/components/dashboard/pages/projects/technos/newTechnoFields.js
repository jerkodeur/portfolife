import CheckFormFields from "@helpers/CheckFormFields";

export const technoInputs = [
  {
    id: "name",
    label: "nom",
    placeholder: "Nom de la techno",
    isRequired: true
  },
  {
    id: "imageName",
    label: "Fichier image",
    placeholder: "image.ext",
    isRequired: true
  },
  {
    id: "priority",
    label: "Priorité d'affichage",
    type: "number",
    min: 1,
    max: 3,
    isRequired: true
  }
];

export const checkTechnoFields = (newTechno, allTechnos) => {
  const constraints = {
    name: {
      value: newTechno.name,
      required: true,
      uniq: [true, allTechnos.map((techno) => techno.name)]
    },
    imageName: {
      value: newTechno.imageName,
      required: true,
      uniq: [true, allTechnos.map((techno) => techno.image_name)]
    },
    priority: {
      value: Number(newTechno.priority),
      required: true,
      regex: /^[1-3]{1}$/,
      type: ["number"]
    }
  };
  return CheckFormFields(constraints);
};
