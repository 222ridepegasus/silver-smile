
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.viewport'); // Main container
        let currentImageIndex = 0;
        const images = document.querySelectorAll('.kg-gallery-image img, .kg-image'); // Targeting both gallery and post images
    
        // Adjust image flex as soon as the page loads for gallery images
        adjustGalleryImages();
    
        // Setup event listeners for lightbox navigation and opening
        setupLightbox(container, images);
    
        function adjustGalleryImages() {
            const galleryImages = document.querySelectorAll('.kg-gallery-image img');
            galleryImages.forEach(img => {
                if (img.complete) {
                    adjustImageFlex(img);
                } else {
                    img.onload = () => adjustImageFlex(img);
                }
            });
        }
    
        function adjustImageFlex(img) {
            const aspectRatio = (img.naturalWidth / img.naturalHeight).toFixed(4);
            img.parentNode.style.flex = `${aspectRatio} 1 0%`;
        }
    
        function setupLightbox(container, images) {
            container.addEventListener('click', function(event) {
                const img = event.target.closest('.kg-gallery-image img, .kg-image'); // This selector targets both
                if (!img) return; // If no image is targeted, do nothing
                event.stopPropagation(); // Prevent the click from propagating further
                currentImageIndex = Array.from(images).indexOf(img);
                openLightbox(img.src);
            });
    
            const lightbox = document.getElementById('lightbox');
            lightbox.addEventListener('click', closeLightbox);
    
            document.querySelector('.lightbox-close').addEventListener('click', function(event) {
                event.stopPropagation();
                closeLightbox();
            });
    
            document.querySelector('.lightbox-prev').addEventListener('click', function(event) {
                event.stopPropagation();
                changeImage(-1, images);
            });
    
            document.querySelector('.lightbox-next').addEventListener('click', function(event) {
                event.stopPropagation();
                changeImage(1, images);
            });
    
            // Keyboard controls
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    closeLightbox();
                } else if (event.key === 'ArrowRight') {
                    changeImage(1, images);
                } else if (event.key === 'ArrowLeft') {
                    changeImage(-1, images);
                }
            });
        }
    
        function openLightbox(src) {
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'flex';
            document.getElementById('lightbox-img').src = src;
        }
    
        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'none';
        }
    
        function changeImage(direction, images) {
            currentImageIndex += direction;
    
            if (currentImageIndex >= images.length) {
                currentImageIndex = 0;
            } else if (currentImageIndex < 0) {
                currentImageIndex = images.length - 1;
            }
    
            const newImgSrc = images[currentImageIndex].src;
            openLightbox(newImgSrc);
        }
    });
    