// main.js - ALSA3ATI E-Commerce Functionality

/**
 * CART OBJECT - Main controller for all shopping cart operations
 */
const cart = {
    items: [],    // Stores all cart items
    total: 0,     // Stores current cart total
    
    /**
     * Initialize the cart functionality
     */
    init() {
        this.loadCart();              // Load saved cart from localStorage
        this.setupEventListeners();   // Set up all event handlers
    },
    
    /**
     * Set up all event listeners for cart interactions
     */
    setupEventListeners() {
        // Toggle cart visibility
        document.getElementById('cartToggle')?.addEventListener('click', () => {
            this.openCart();
        }); 
        
        // Close cart button
        document.getElementById('closeCart')?.addEventListener('click', () => {
            this.closeCart();
        });
        
        // Overlay click to close cart
        document.getElementById('overlay')?.addEventListener('click', () => {
            this.closeCart();
        });
        
        // Add to cart buttons (dynamically handles all collection pages)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
                this.addProductToCart(button);
            }
        });
        
        // Checkout button
        document.querySelector('.checkout-btn')?.addEventListener('click', () => {
            this.handleCheckout();
        });
    },
    
    /**
     * Add product to cart from product button
     * @param {HTMLElement} button - The clicked "Add to Cart" button
     */
    addProductToCart(button) {
        const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image,
            quantity: 1
        };
        
        this.addItem(product);
        this.showAddedToCart(product.name);
    },
    
    /**
     * Open cart sidebar
     */
    openCart() {
        document.getElementById('cartSidebar').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    },
    
    /**
     * Close cart sidebar
     */
    closeCart() {
        document.getElementById('cartSidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    },
    
    /**
     * Add item to cart or increase quantity if exists
     * @param {Object} product - Product to add
     */
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push(product);
        }
        
        this.updateCart();
    },
    
    /**
     * Remove item from cart completely
     * @param {string} id - Product ID to remove
     */
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateCart();
    },
    
    /**
     * Update item quantity in cart
     * @param {string} id - Product ID to update
     * @param {number} change - Quantity change (+1 or -1)
     */
    updateQuantity(id, change) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                this.removeItem(id);
                return;
            }
        }
        this.updateCart();
    },
    
    /**
     * Calculate current cart total
     */
    calculateTotal() {
        this.total = this.items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 0
        );
    },
    
    /**
     * Update cart display in UI
     */
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartCount = document.querySelector('.cart-count');
        
        // Clear current items
        cartItems.innerHTML = '';
        
        // Handle empty cart
        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            cartCount.textContent = '0';
            return;
        }
        
        // Add all cart items to display
        this.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                    <div class="cart-item-actions">
                        <button class="decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">✕</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Update totals
        cartTotal.textContent = this.total.toFixed(2);
        cartCount.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Add event listeners to dynamic buttons
        this.setupDynamicCartEvents();
    },
    
    /**
     * Set up event listeners for dynamically generated cart elements
     */
    setupDynamicCartEvents() {
        // Quantity decrease buttons
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                this.updateQuantity(e.target.dataset.id, -1);
            });
        });
        
        // Quantity increase buttons
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                this.updateQuantity(e.target.dataset.id, 1);
            });
        });
        
        // Remove item buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                this.removeItem(e.target.dataset.id);
            });
        });
    },
    
    /**
     * Handle checkout process
     */
    handleCheckout() {
        if (this.items.length > 0) {
            alert(`Thank you for your purchase!\nTotal: $${this.total.toFixed(2)}`);
            this.items = [];
            this.updateCart();
            this.closeCart();
        } else {
            alert('Your cart is empty!');
        }
    },
    
    /**
     * Save cart to localStorage
     */
    saveCart() {
        localStorage.setItem('talla_cart', JSON.stringify({
            items: this.items,
            total: this.total
        }));
    },
    
    /**
     * Load cart from localStorage
     */
    loadCart() {
        const savedCart = localStorage.getItem('talla_cart');
        if (savedCart) {
            const cartData = JSON.parse(savedCart);
            this.items = cartData.items || [];
            this.total = cartData.total || 0;
            this.updateCartDisplay();
        }
    },
    
    /**
     * Show "Added to cart" notification
     * @param {string} productName - Name of the added product
     */
    showAddedToCart(productName) {
        const notification = document.createElement('div');
        notification.className = 'add-to-cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart</span>
        `;
        
        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: '2000',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            transform: 'translateY(100px)',
            opacity: '0',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Animate out after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            
            // Remove after animation
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },
    
    /**
     * Main cart update function
     */
    updateCart() {
        this.calculateTotal();
        this.updateCartDisplay();
        this.saveCart();
    }
};

// Initialize cart when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    cart.init();
});
const searchInput = document.getElementById('searchInput');

if (searchInput) { 
    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase(); 
        const cards = document.querySelectorAll('.in-grid'); 

        cards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();

            if (title.includes(searchText)) {
                card.style.display = ""; 
            } else {
                card.style.display = "none"; 
            }
        });
    });
}
/**
 * SEARCH FUNCTIONALITY - Filters watch cards based on search input
 */
const setupSearch = () => {
    const searchBtn = document.querySelector('.filter-group button[type="submit"]');
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.products-grid .card');

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        productCards.forEach(card => {
            // Get the title from the card__title element
            const title = card.querySelector('.card__title').innerText.toLowerCase();
            // Get the description text
            const description = card.querySelector('.card__description').innerText.toLowerCase();

            // If the search term is found in title or description, show the card; otherwise hide it
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex'; // Shows the card
                card.style.opacity = '1';
            } else {
                card.style.display = 'none'; // Hides the card
            }
        });
    };

    // Trigger search when button is clicked
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents page reload
        performSearch();
    });

    // Optional: Trigger search when "Enter" is pressed in the input field
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
};

// Initialize the search when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
});
/**
 * UNIFIED FILTER SYSTEM - Filters by Search, Category, Brand, and Price
 */
const setupFilters = () => {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const priceValue = document.getElementById('priceValue');
    const searchBtn = document.querySelector('.filter-group button[type="submit"]');
    const productCards = document.querySelectorAll('.products-grid .card');

    // Update the price text ($8,000) as you slide the bar
    priceFilter.addEventListener('input', () => {
        priceValue.textContent = Number(priceFilter.value).toLocaleString();
    });

    const applyAllFilters = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value; // e.g., "Watches" or "Wall Clocks"
    const selectedBrand = brandFilter.value;
    const maxPrice = parseFloat(priceFilter.value);

    productCards.forEach(card => {
        const title = card.querySelector('.card__title').innerText.toLowerCase();
        const description = card.querySelector('.card__description').innerText.toLowerCase();
        
        // 1. Get Category from the new data attribute
        const cardCategory = card.dataset.category; 
        
        // 2. Get Price from the Add to Cart button
        const price = parseFloat(card.querySelector('.add-to-cart').dataset.price);
        
        // --- Condition Checks ---
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        
        // FIXED: Check if the card's category matches the dropdown selection
        const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
        
        const matchesBrand = selectedBrand === 'all' || title.includes(selectedBrand.toLowerCase());
        const matchesPrice = price <= maxPrice;

        // Only show if ALL conditions are true
        if (matchesSearch && matchesCategory && matchesBrand && matchesPrice) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
};

    // Event Listeners for instant filtering
    searchBtn.addEventListener('click', (e) => { e.preventDefault(); applyAllFilters(); });
    categoryFilter.addEventListener('change', applyAllFilters);
    brandFilter.addEventListener('change', applyAllFilters);
    priceFilter.addEventListener('change', applyAllFilters);
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
});