// Image data with different quality for mobile/desktop
const images = [
    { 
        id: 1, 
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", 
        title: "Mountain Lake", 
        category: "nature",
        tags: ["mountains", "water", "nature"] 
    },
    { 
        id: 2, 
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000", 
        title: "Night City", 
        category: "city",
        tags: ["city", "night", "lights"] 
    },
    
    { 
        id: 4, 
        src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0", 
        title: "Futuristic Tech", 
        category: "technology",
        tags: ["tech", "future", "digital"] 
    },
    { 
        id: 5, 
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", 
        title: "Forest Path", 
        category: "nature",
        tags: ["forest", "path", "trees"] 
    },
    { 
        id: 6, 
        src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df", 
        title: "Urban Architecture", 
        category: "city",
        tags: ["architecture", "urban", "building"] 
    },
    { 
        id: 7, 
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b", 
        title: "Mountain Sunrise", 
        category: "nature",
        tags: ["sunrise", "mountains", "morning"] 
    },
    { 
        id: 8, 
        src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390", 
        title: "City Skyline", 
        category: "city",
        tags: ["skyline", "city", "buildings"] 
    },
    { 
        id: 9, 
        src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab", 
        title: "Abstract Art", 
        category: "abstract",
        tags: ["abstract", "art", "design"] 
    },
    
    { 
        id: 11, 
        src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd", 
        title: "Geometric Abstract", 
        category: "abstract",
        tags: ["geometric", "abstract", "pattern"] 
    },
    { 
        id: 12, 
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", 
        title: "Data Network", 
        category: "technology",
        tags: ["data", "network", "digital"] 
    },
    { 
        id: 13, 
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", 
        title: "Aerial Nature", 
        category: "nature",
        tags: ["aerial", "nature", "landscape"] 
    },
    { 
        id: 14, 
        src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1", 
        title: "Coastal City", 
        category: "city",
        tags: ["coast", "city", "ocean"] 
    },
    { 
        id: 15, 
        src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262", 
        title: "Travel Adventure", 
        category: "travel",
        tags: ["travel", "adventure", "explore"] 
    },
    { 
        id: 16, 
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba", 
        title: "Mountain Peak", 
        category: "nature",
        tags: ["mountain", "peak", "snow"] 
    }
];

// DOM Elements
const gallery = document.getElementById('imageGallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileFilterOptions = document.querySelectorAll('.mobile-filter-option');
const viewButtons = document.querySelectorAll('.view-btn');
const searchInput = document.getElementById('searchInput');
const desktopSearch = document.getElementById('desktopSearch');
const currentCount = document.getElementById('currentCount');
const totalCount = document.getElementById('totalCount');
const loadingIndicator = document.getElementById('loadingIndicator');
const mobileFilterMenu = document.getElementById('mobileFilterMenu');
const mobileFilterBtn = document.getElementById('mobileFilterBtn');
const closeFilterBtn = document.getElementById('closeFilterBtn');
const mobileFilterNavBtn = document.getElementById('mobileFilterNavBtn');
const imageQuality = document.getElementById('imageQuality');
const itemsPerPage = document.getElementById('itemsPerPage');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const currentPage = document.getElementById('currentPage');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const favoriteBtn = document.getElementById('favoriteBtn');

// State variables
let currentIndex = 0;
let filteredImages = [];
let currentFilter = 'all';
let currentView = 'grid';
let currentPageNum = 1;
let itemsPerPageNum = 12;
let favoriteImages = JSON.parse(localStorage.getItem('favorites')) || [];

// Initialize gallery
function initGallery() {
    // Set total count
    totalCount.textContent = images.length;
    
    // Add event listeners
    addEventListeners();
    
    // Initial render
    filteredImages = [...images];
    renderGallery();
    
    // Check screen size on load
    checkScreenSize();
    
    // Load favorites
    updateFavoritesUI();
}

// Add all event listeners
function addEventListeners() {
    // Desktop filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => filterGallery(btn.dataset.filter));
    });
    
    // Mobile filter options
    mobileFilterOptions.forEach(option => {
        option.addEventListener('click', () => {
            filterGallery(option.dataset.filter);
            closeMobileFilterMenu();
        });
    });
    
    // View toggle buttons
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            gallery.classList.toggle('list-view', currentView === 'list');
        });
    });
    
    // Lightbox navigation
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    if (desktopSearch) {
        desktopSearch.addEventListener('input', handleSearch);
    }
    
    // Lightbox click outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
    
    // Mobile filter menu
    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', openMobileFilterMenu);
    }
    if (closeFilterBtn) {
        closeFilterBtn.addEventListener('click', closeMobileFilterMenu);
    }
    if (mobileFilterNavBtn) {
        mobileFilterNavBtn.addEventListener('click', openMobileFilterMenu);
    }
    
    // Settings
    if (imageQuality) {
        imageQuality.addEventListener('change', updateImageQuality);
    }
    if (itemsPerPage) {
        itemsPerPage.addEventListener('change', updateItemsPerPage);
    }
    
    // Pagination
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', goToPrevPage);
    }
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', goToNextPage);
    }
    
    // Lightbox actions
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadImage);
    }
    if (shareBtn) {
        shareBtn.addEventListener('click', shareImage);
    }
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', toggleFavorite);
    }
    
    // Window resize for responsive behavior
    window.addEventListener('resize', checkScreenSize);
}

// Render gallery
function renderGallery() {
    gallery.innerHTML = '';
    
    // Show loading indicator
    loadingIndicator.classList.add('active');
    
    // Calculate pagination
    const startIndex = (currentPageNum - 1) * itemsPerPageNum;
    const endIndex = startIndex + itemsPerPageNum;
    const pageImages = filteredImages.slice(startIndex, endIndex);
    
    // Update counters
    currentCount.textContent = filteredImages.length;
    currentPage.textContent = currentPageNum;
    
    // Update pagination buttons
    prevPageBtn.disabled = currentPageNum === 1;
    nextPageBtn.disabled = endIndex >= filteredImages.length;
    
    // Render images with delay for loading effect
    let loadedCount = 0;
    
    pageImages.forEach((image, index) => {
        setTimeout(() => {
            const item = document.createElement('div');
            item.className = `gallery-item ${currentView === 'list' ? 'list-item' : ''}`;
            item.dataset.id = image.id;
            
            // Adjust image quality based on settings and screen size
            const imgSrc = getImageUrl(image.src);
            
            item.innerHTML = `
                <img src="${imgSrc}" alt="${image.title}" loading="lazy">
                <div class="image-overlay">
                    <h4 class="image-title">${image.title}</h4>
                    <span class="image-category">${image.category}</span>
                    ${favoriteImages.includes(image.id) ? 
                        '<i class="fas fa-heart favorite-icon" style="position: absolute; top: 10px; right: 10px; color: #f472b6;"></i>' : 
                        ''}
                </div>
            `;
            
            item.addEventListener('click', () => openLightbox(startIndex + index));
            gallery.appendChild(item);
            
            loadedCount++;
            if (loadedCount === pageImages.length) {
                // Hide loading indicator when all images are loaded
                setTimeout(() => {
                    loadingIndicator.classList.remove('active');
                }, 300);
            }
        }, index * 50); // Stagger loading for visual effect
    });
    
    // If no images, show message
    if (pageImages.length === 0) {
        setTimeout(() => {
            gallery.innerHTML = `
                <div class="no-images" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">
                    <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 20px; display: block;"></i>
                    <h3>No images found</h3>
                    <p>Try a different filter or search term</p>
                </div>
            `;
            loadingIndicator.classList.remove('active');
        }, 500);
    }
}

// Get optimized image URL
function getImageUrl(baseUrl) {
    const isMobile = window.innerWidth <= 768;
    const quality = imageQuality ? imageQuality.value : 'auto';
    
    let query = '';
    
    if (quality === 'auto') {
        query = isMobile ? '?w=400&q=80' : '?w=800&q=85';
    } else if (quality === 'high') {
        query = '?w=1200&q=95';
    } else if (quality === 'medium') {
        query = '?w=800&q=85';
    } else {
        query = '?w=400&q=75';
    }
    
    return baseUrl + query;
}

// Filter gallery
function filterGallery(filter) {
    currentFilter = filter;
    currentPageNum = 1;
    
    // Update active filter buttons
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    mobileFilterOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.filter === filter);
    });
    
    // Filter images
    if (filter === 'all') {
        filteredImages = [...images];
    } else {
        filteredImages = images.filter(img => img.category === filter);
    }
    
    renderGallery();
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length < 2) {
        // If search term is too short, revert to current filter
        filterGallery(currentFilter);
        return;
    }
    
    filteredImages = images.filter(img => 
        img.title.toLowerCase().includes(searchTerm) ||
        img.category.toLowerCase().includes(searchTerm) ||
        img.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    currentPageNum = 1;
    renderGallery();
}

// Open lightbox
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show previous image
function showPrevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateLightbox();
    }
}

// Show next image
function showNextImage() {
    if (currentIndex < filteredImages.length - 1) {
        currentIndex++;
        updateLightbox();
    }
}

// Update lightbox
function updateLightbox() {
    const image = filteredImages[currentIndex];
    const imgSrc = getImageUrl(image.src);
    
    lightboxImg.src = imgSrc;
    lightboxImg.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent = image.category;
    
    // Update favorite button
    const isFavorite = favoriteImages.includes(image.id);
    favoriteBtn.innerHTML = isFavorite ? 
        '<i class="fas fa-heart"></i>' : 
        '<i class="far fa-heart"></i>';
    favoriteBtn.style.color = isFavorite ? '#f472b6' : '#38bdf8';
    
    // Update navigation button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === filteredImages.length - 1;
}

// Mobile filter menu functions
function openMobileFilterMenu() {
    mobileFilterMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileFilterMenu() {
    mobileFilterMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Update image quality
function updateImageQuality() {
    renderGallery();
}

// Update items per page
function updateItemsPerPage(e) {
    itemsPerPageNum = parseInt(e.target.value);
    currentPageNum = 1;
    renderGallery();
}

// Pagination functions
function goToPrevPage() {
    if (currentPageNum > 1) {
        currentPageNum--;
        renderGallery();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredImages.length / itemsPerPageNum);
    if (currentPageNum < totalPages) {
        currentPageNum++;
        renderGallery();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Check screen size for responsive behavior
function checkScreenSize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile-specific adjustments
        gallery.classList.remove('list-view');
        viewButtons.forEach(btn => {
            if (btn.dataset.view === 'list') {
                btn.style.display = 'none';
            }
        });
    } else {
        // Desktop adjustments
        viewButtons.forEach(btn => {
            btn.style.display = 'flex';
        });
    }
}

// Download image
function downloadImage() {
    const image = filteredImages[currentIndex];
    const imgSrc = getImageUrl(image.src);
    
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Share image
function shareImage() {
    const image = filteredImages[currentIndex];
    
    if (navigator.share) {
        navigator.share({
            title: image.title,
            text: `Check out this beautiful image: ${image.title}`,
            url: window.location.href,
        });
    } else {
        // Fallback for desktop
        navigator.clipboard.writeText(`${image.title} - ${window.location.href}`);
        alert('Link copied to clipboard!');
    }
}

// Toggle favorite
function toggleFavorite() {
    const image = filteredImages[currentIndex];
    const index = favoriteImages.indexOf(image.id);
    
    if (index > -1) {
        // Remove from favorites
        favoriteImages.splice(index, 1);
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.style.color = '#38bdf8';
    } else {
        // Add to favorites
        favoriteImages.push(image.id);
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
        favoriteBtn.style.color = '#f472b6';
    }
    
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favoriteImages));
    
    // Update gallery item
    const galleryItem = document.querySelector(`.gallery-item[data-id="${image.id}"]`);
    if (galleryItem) {
        const favoriteIcon = galleryItem.querySelector('.favorite-icon');
        if (favoriteIcon) {
            favoriteIcon.style.display = index > -1 ? 'none' : 'block';
        }
    }
}

// Update favorites UI
function updateFavoritesUI() {
    // This function updates the favorite icons in the gallery
    // Called after gallery is rendered
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);

// Preload images for better experience
function preloadImages() {
    images.forEach(img => {
        const image = new Image();
        image.src = getImageUrl(img.src);
    });
}

// Start preloading images after initial load
window.addEventListener('load', preloadImages);