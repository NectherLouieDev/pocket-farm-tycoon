const products = [
    { 
        name: "Organic Rice", 
        price: 60, 
        stock: 500, 
        image: "./images/Organic rice.webp"
    },
    { 
        name: "Fresh Vegetables", 
        price: 30, 
        stock: 200, 
        image: "./images/fresh vegetables.jpg"
    },
    { 
        name: "Organic Corn", 
        price: 25, 
        stock: 350, 
        image: "./images/organic corn.webp"
    },
    { 
        name: "Compost Fertilizer", 
        price: 15, 
        stock: 1000, 
        image: "./images/compost fertilizer.jfif"
    },
    { 
        name: "Banana", 
        price: 17, 
        stock: 1000, 
        image: "./images/Organic banana.avif"
    }, 
    { 
        name: "Coconut", 
        price: 10, 
        stock: 1000, 
        image: "./images/coconut.jpg"
    },
    { 
        name: "Avocado", 
        price: 30, 
        stock: 1000, 
        image: "./images/Avocado.jfif"
    }, 
    { 
        name: "Lemon grass", 
        price: 10, 
        stock: 1000, 
        image: "./images/Lemon grass.jfif"
    }
];




// ===============================
// Render Products
// ===============================
function loadProducts() {

    const grid = document.getElementById("productGrid");
    grid.innerHTML = "Loading products...";

    grid.innerHTML = "";

    if (products.length === 0) {
        grid.innerHTML = "<p>No products available.</p>";
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img class="product-image" src="${product.image}">
                <div class="product-details">
                <div class="product-name">${product.name}</div>
                <p>₱${product.price} / kg</p>
                <p>Stock: ${product.stock} kg</p>
                <button class="btn">Contact Farmer</button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Load on page start
loadProducts();