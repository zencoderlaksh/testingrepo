document.addEventListener('DOMContentLoaded', () => {
    // Sample Food Items Data
    const foodItemsData = [ // Renamed to avoid conflict with a potential DOM element
        {
            id: 1,
            name: 'Classic Burger',
            price: 8.99,
            image_url: 'https://via.placeholder.com/150/FFC107/000000?Text=Burger',
            description: 'A delicious classic beef burger with lettuce, tomato, and cheese.'
        },
        {
            id: 2,
            name: 'Margherita Pizza',
            price: 12.50,
            image_url: 'https://via.placeholder.com/150/F44336/FFFFFF?Text=Pizza',
            description: 'Classic Margherita pizza with fresh mozzarella, basil, and tomato sauce.'
        },
        {
            id: 3,
            name: 'Caesar Salad',
            price: 7.25,
            image_url: 'https://via.placeholder.com/150/4CAF50/FFFFFF?Text=Salad',
            description: 'Crisp romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.'
        },
        {
            id: 4,
            name: 'Spaghetti Carbonara',
            price: 10.75,
            image_url: 'https://via.placeholder.com/150/9C27B0/FFFFFF?Text=Pasta',
            description: 'Creamy spaghetti with pancetta, egg, and Parmesan cheese.'
        }
    ];

    let cartItems = [];

    // Function to display food items
    function displayFoodItems() {
        const foodItemsContainer = document.getElementById('food-items-container');
        if (!foodItemsContainer) {
            console.error('Food items container not found!');
            return;
        }

        foodItemsContainer.innerHTML = ''; // Clear loading message

        foodItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'food-item';
            itemDiv.innerHTML = `
                <img src="${item.image_url}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="price">$${item.price.toFixed(2)}</p>
                <p class="description">${item.description}</p>
                <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
            `;
            foodItemsContainer.appendChild(itemDiv);
        });

        // Add event listeners to "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = parseInt(event.target.dataset.id);
                addToCart(itemId);
            });
        });
    }

    // Add item to cart
    function addToCart(itemId) {
        const itemToAdd = foodItemsData.find(item => item.id === itemId);
        if (!itemToAdd) {
            console.error('Item not found!');
            return;
        }

        // Check if item already in cart, if so, increment quantity
        const existingItem = cartItems.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...itemToAdd, quantity: 1 });
        }
        console.log(cartItems); // For debugging
        updateCartDisplay();
    }

    // Update cart display
    function updateCartDisplay() {
        const cartItemsList = document.getElementById('cart-items');
        const cartTotalSpan = document.getElementById('cart-total');

        if (!cartItemsList || !cartTotalSpan) {
            console.error('Cart elements not found in DOM!');
            return;
        }

        cartItemsList.innerHTML = ''; // Clear current cart items

        if (cartItems.length === 0) {
            cartItemsList.innerHTML = '<li>No items in cart</li>';
            cartTotalSpan.textContent = '0.00';
            return;
        }

        let total = 0;
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
            // You could add more details or structure here (e.g., remove button)
            cartItemsList.appendChild(listItem);
            total += item.price * item.quantity;
        });

        cartTotalSpan.textContent = total.toFixed(2);
    }

    // Hamburger Menu Toggle
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('header nav');

    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            hamburgerButton.setAttribute('aria-expanded', isExpanded);
            if(isExpanded) {
                hamburgerButton.classList.add('open');
            } else {
                hamburgerButton.classList.remove('open');
            }
        });
    } else {
        console.error('Hamburger button or nav menu not found!');
    }

    // Initial call to display food items and update cart (e.g. if cart is persisted)
    displayFoodItems();
    updateCartDisplay(); // Initial call to set "No items in cart" or load from storage
});
