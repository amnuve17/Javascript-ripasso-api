fetch('https://jsonplaceholder.typicode.com/photos/')
    .then(response => response.json())
    .then(photos => {
        const photoContainer = document.querySelector('#photo-gallery .photo-container');
        photos.slice(0, 30).forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.thumbnailUrl;
            img.classList.add('photo');
            photoContainer.appendChild(img);
        });
    })
    .catch((err)=>{
    console.log(err);
});