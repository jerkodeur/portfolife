export const imageExist = (dir, file) => {
    fetch(`/assets/images/${dir}/${file}`)
        .then(res => res.headers.get('Content-Type').startsWith('image/') )
}
