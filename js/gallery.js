// gallery.js - JavaScript functionality for the gallery page

document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Data with publicly available images
    const galleryImages = [
        {
            src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
            alt: "Maldives Beach",
            title: "Maldives Beach Paradise",
            description: "Crystal clear waters and white sand beaches",
            category: "beach"
        },
        {
            src: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6",
            alt: "Swiss Alps",
            title: "Swiss Alps",
            description: "Majestic mountain views and hiking trails",
            category: "mountain"
        },
        {
            src: "https://media.istockphoto.com/id/478627080/photo/evening-view-of-ama-dablam.jpg?s=612x612&w=0&k=20&c=GLKvtQt1JVoOB4yR2WI86_fYOmG8WObeZP_QV_gFG_0=",
            alt: "Himalayas",
            title: "Himalayan Mountain Range",
            description: "The roof of the world with breathtaking views",
            category: "mountain"
        },
        {
            src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
            alt: "Tokyo City",
            title: "Tokyo, Japan",
            description: "Modern cityscape with traditional elements",
            category: "city"
        },
        {
            src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
            alt: "Paris City",
            title: "Paris, France",
            description: "The city of lights and romantic atmosphere",
            category: "city"
        },
        {
            src: "https://media.istockphoto.com/id/935746242/photo/mata-atlantica-atlantic-forest-in-brazil.jpg?s=612x612&w=0&k=20&c=NqE6m2Q8J2w6M7x7Pi8VxnMzLzq-HJQvCt5EMuvMU5o=",
            alt: "Amazon Rainforest",
            title: "Amazon Rainforest",
            description: "Explore the world's largest tropical rainforest",
            category: "nature"
        },
        {
            src: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c",
            alt: "Grand Canyon",
            title: "Grand Canyon, USA",
            description: "One of the world's seven natural wonders",
            category: "nature"
        },
        {
            src: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
            alt: "Santorini Greece",
            title: "Santorini, Greece",
            description: "White buildings against the blue Aegean Sea",
            category: "city"
        },
        {
            src: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73",
            alt: "Northern Lights",
            title: "Northern Lights in Norway",
            description: "Aurora Borealis dancing in the night sky",
            category: "nature"
        },
        {
            src: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8",
            alt: "Great Barrier Reef",
            title: "Great Barrier Reef, Australia",
            description: "World's largest coral reef system",
            category: "nature"
        },
        {
            src: "https://images.unsplash.com/photo-1534430480872-3498386e7856",
            alt: "New York City",
            title: "New York City, USA",
            description: "The city that never sleeps",
            category: "city"
        },
        {
            src: "https://media.istockphoto.com/id/1388018793/photo/grand-canal-in-venice.jpg?s=612x612&w=0&k=20&c=uDUrctquPNUPzlpNLwTkJIkc1Gig0aUWJknF6FrqxJE=",
            alt: "Venice Italy",
            title: "Venice, Italy",
            description: "The floating city with romantic canals",
            category: "city"
        },
        {
            src: "https://t4.ftcdn.net/jpg/00/91/45/03/360_F_91450375_0ODbAerkYKJiwd5POIxvFtnNfOkrvXFm.jpg",
            alt: "Bora Bora",
            title: "Bora Bora, French Polynesia",
            description: "Overwater bungalows in paradise",
            category: "beach"
        },
        {
            src: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
            alt: "Machu Picchu",
            title: "Machu Picchu, Peru",
            description: "Ancient Incan citadel set against a dramatic mountain backdrop",
            category: "mountain"
        }
    ];

    // Initialize the gallery
    initGallery();
    
    // Initialize filter buttons
    initFilters();
    
    // Initialize lightbox functionality
    initLightbox();
    
    // Function to initialize the gallery with images
    function initGallery() {
        const galleryContainer = document.getElementById('gallery-container');
        
        // Clear any existing content
        galleryContainer.innerHTML = '';
        
        // Check if we can access filesystem to scan for images
        // Since browser JavaScript can't directly access the filesystem,
        // we're using our predefined image array instead
        
        // Add each image to the gallery
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', image.category);
            galleryItem.setAttribute('data-index', index);
            
            galleryItem.innerHTML = `
                <div class="gallery-image">
                    <img src="${image.src}" alt="${image.alt}" loading="lazy">
                    <div class="overlay">
                        <h3>${image.title}</h3>
                        <p>${image.description}</p>
                    </div>
                </div>
            `;
            
            galleryContainer.appendChild(galleryItem);
        });
    }
    
    // Initialize filter functionality
    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                        item.classList.add('visible');
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('visible');
                    }
                });
            });
        });
    }
    
    // Initialize lightbox functionality
    function initLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeLightbox = document.querySelector('.close-lightbox');
        
        // Global variable to keep track of current image index
        window.currentImageIndex = 0;
        
        // Open lightbox when a gallery item is clicked
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const imgAlt = this.querySelector('img').getAttribute('alt');
                const imgTitle = this.querySelector('h3').textContent;
                const imgDesc = this.querySelector('p').textContent;
                const imgIndex = parseInt(this.getAttribute('data-index'));
                
                lightboxImg.setAttribute('src', imgSrc);
                lightboxCaption.innerHTML = `<h3>${imgTitle}</h3><p>${imgDesc}</p>`;
                lightbox.style.display = 'block';
                
                // Set current image index for navigation
                window.currentImageIndex = imgIndex;
            });
        });
        
        // Close lightbox when close button is clicked
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
    
    // Function to change image in lightbox
    window.changeImage = function(direction) {
        // Calculate new index
        let newIndex = window.currentImageIndex + direction;
        
        // Handle wraparound
        if (newIndex < 0) {
            newIndex = galleryImages.length - 1;
        } else if (newIndex >= galleryImages.length) {
            newIndex = 0;
        }
        
        // Update lightbox content
        const newImage = galleryImages[newIndex];
        document.getElementById('lightbox-img').setAttribute('src', newImage.src);
        document.getElementById('lightbox-caption').innerHTML = `
            <h3>${newImage.title}</h3>
            <p>${newImage.description}</p>
        `;
        
        // Update current index
        window.currentImageIndex = newIndex;
    };
});