export const imageFormFields = [
  {
    id: "imgPrefix",
    label: "Préfixe des images",
    placeholder: "Ajouter un prefix",
    isRequired: true
  },
  {
    id: "background",
    label: "Couleur de fond carousel d'images",
    type: "color",
    isRequired: true
  },
  {
    label: "Nb images (min: 1, max: 20)",
    id: "nbImages",
    isRequired: true,
    type: "number",
    min: 0,
    max: 20
  }
];

export const linkFormFields = [
  {
    id: "urlGithub",
    isRequired: false,
    label: "Lien vers le dépôt github",
    placeholder: "Insérer le lien du dépôt github",
    type: "url"
  },
  {
    id: "urlTest",
    isRequired: false,
    label: "Lien vers la page de test",
    placeholder: "Insérer le lien de la page de test",
    type: "url"
  }
];

export const contextFormFields = [
  {
    id: "context",
    isRequired: true,
    label: "Contexte",
    placeholder: "Entreprise ou école ou a été réalisé le projet"
  },
  {
    id: "contextUrl",
    isRequired: false,
    label: "Lien de l'établissement",
    placeholder: "Lien de l'établissement du contexte",
    type: "url"
  }
];

export const MainFormFields = [
  {
    id: "date",
    isRequired: true,
    label: "Date du projet",
    type: "date"
  },
  {
    id: "title",
    isRequired: true,
    label: "titre",
    placeholder: "titre du projet"
  },
  {
    id: "shortDescription",
    isRequired: true,
    label: "courte description",
    placeholder: "description courte du projet (Apparaît dans les vignettes)"
  }
];
