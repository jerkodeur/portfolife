export const snakeToCamelCase = (string) => {
  console.log(string);
  return string.split("_").reduce((acc, curr, index) => {
    acc += index !== 0 ? curr[0].toUpperCase() + curr.slice(1) : curr;
    return acc;
  }, "");
};

export const camelToSnakeCase = (string) =>
  string
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();

// Display only the path of the url (remove http://www.)
export const formatLink = (url) => {
  const urlRegex = /(https?:\/\/(www\.)?)(.{10})/g;
  let urlFormated = url.replace(urlRegex, "$3");
  return urlFormated;
};
