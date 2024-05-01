document.addEventListener('DOMContentLoaded', () => {
    adjustGalleryImages();
});

function adjustGalleryImages() {
    const galleryImages = document.querySelectorAll('.kg-gallery-image img');
    galleryImages.forEach(img => {
        if (img.complete) {  // Check if the image is already loaded
            adjustImageFlex(img);
        } else {
            img.onload = () => adjustImageFlex(img);  // Set it to adjust once it loads
        }
    });
}

function adjustImageFlex(img) {
    const aspectRatio = (img.naturalWidth / img.naturalHeight).toFixed(4);
    img.parentNode.style.flex = `${aspectRatio} 1 0%`;  // Set flex basis based on the image aspect ratio
}
