const CheckFormFields = (datas) => {
  const obj = {};
  Object.entries({ ...datas }).map((el) => {
    obj[el[0]] = {};
    return (obj[el[0]] = switchAndReturnMessageError(el));
  });
  return obj;
};

const switchAndReturnMessageError = (entry) => {
  let value = entry[1].value;
  const constraints = Object.keys(entry[1]);

  if (constraints.includes("required")) return "Ce champs est requis !";
  else if (!value) {
    return null;
  } else if (
    constraints.includes("type") &&
    !entry[1].type.some((el) => el === typeof value)
  )
    return "Type de donnée incorrect";
  else if (constraints.includes("regex") && !entry[1].regex.test(value))
    return "Format incorrect !";
  else if (
    constraints.includes("uniq") &&
    entry[1].uniq[1].some((el) => new RegExp(`^${value}$`, "i").test(el))
  )
    return "Cette valeur existe déjà !";
  else if (
    constraints.includes("length") &&
    entry[1].value.length < entry[1].length
  )
    return "Taille non valide !";
  else if (
    constraints.includes("range") &&
    (entry[1].value < entry[1].range[0] || entry[1].value > entry[1].range[1])
  )
    return "Nombre d'éléments invalides !";
  else return null;
};

export default CheckFormFields;
