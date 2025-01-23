// Get the modal elements
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');

// Get all images in the gallery
function addClickEventsToImages() {
    const galleryImages = document.querySelectorAll('#gallery img');
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = image.src;
            captionText.innerHTML = image.alt;
        });
    });
}

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Load more images dynamically
loadMoreBtn.addEventListener('click', () => {
    const newImages = [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=500&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60',
    ];
    newImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Portrait of a female';
        gallery.appendChild(img);
    });
    addClickEventsToImages();
});

// Initialize events
addClickEventsToImages();
