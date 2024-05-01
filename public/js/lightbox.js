document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.kg-gallery-image img');
    let currentImageIndex = 0;

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the backdrop click event
            currentImageIndex = index;
            openLightbox(img.src);
        });
    });

    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('click', closeLightbox);

    document.querySelector('.lightbox-close').addEventListener('click', function(event) {
        event.stopPropagation();
        closeLightbox();
    });

    document.querySelector('.lightbox-prev').addEventListener('click', function(event) {
        event.stopPropagation();
        changeImage(-1);
    });

    document.querySelector('.lightbox-next').addEventListener('click', function(event) {
        event.stopPropagation();
        changeImage(1);
    });

    // Keyboard controls
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        }
    });
});

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    document.getElementById('lightbox-img').src = src;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

function changeImage(direction) {
    const galleryImages = document.querySelectorAll('.kg-gallery-image img');
    let currentImageIndex = +direction;

    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    const newImgSrc = galleryImages[currentImageIndex].src;
    openLightbox(newImgSrc);
}
