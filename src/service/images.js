export const imageExist = (dir, file) => {
  fetch(`@images/${dir}/${file}`).then((res) => res.headers.get("Content-Type").startsWith("image/"));
};
