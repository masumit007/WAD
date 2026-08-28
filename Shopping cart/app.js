const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 1499,
    description: "Comfortable Bluetooth headphones with clear sound.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 2199,
    description: "Track steps, notifications, heart rate, and workouts.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Classic Sneakers",
    category: "fashion",
    price: 1799,
    description: "Daily wear sneakers with a clean modern finish.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Cotton Hoodie",
    category: "fashion",
    price: 1299,
    description: "Soft hoodie for casual college and travel use.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Desk Lamp",
    category: "home",
    price: 899,
    description: "Minimal LED lamp with focused reading light.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Ceramic Mug Set",
    category: "home",
    price: 649,
    description: "Four-piece mug set for tea, coffee, and study breaks.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    name: "Skin Care Kit",
    category: "beauty",
    price: 999,
    description: "Compact kit with cleanser, moisturizer, and serum.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    name: "Travel Backpack",
    category: "fashion",
    price: 1599,
    description: "Durable backpack with laptop and bottle sections.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
  }
];

const state = {
  cart: JSON.parse(localStorage.getItem("shoppingCart") || "[]"),
  search: "",
  category: "all"
};

const productGrid = document.querySelector("#productGrid");
const productTemplate = document.querySelector("#productTemplate");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const cartDrawer = document.querySelector("#cartDrawer");
const overlay = document.querySelector("#overlay");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartCount = document.querySelector("#cartCount");
const subtotal = document.querySelector("#subtotal");
const delivery = document.querySelector("#delivery");
const grandTotal = document.querySelector("#grandTotal");
const checkoutButton = document.querySelector("#checkoutButton");

function money(value) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(state.cart));
}

function filteredProducts() {
  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(state.search.toLowerCase());
    const matchesCategory = state.category === "all" || product.category === state.category;
    return matchesSearch && matchesCategory;
  });
}

function renderProducts() {
  productGrid.innerHTML = "";
  const visibleProducts = filteredProducts();

  if (!visibleProducts.length) {
    productGrid.innerHTML = '<p class="no-results">No products found. Try another search or category.</p>';
    return;
  }

  visibleProducts.forEach((product) => {
    const card = productTemplate.content.cloneNode(true);
    const image = card.querySelector(".product-image");
    image.src = product.image;
    image.alt = product.name;
    card.querySelector(".product-category").textContent = product.category;
    card.querySelector(".product-title").textContent = product.name;
    card.querySelector(".product-description").textContent = product.description;
    card.querySelector(".product-price").textContent = money(product.price);
    card.querySelector(".add-button").addEventListener("click", () => addToCart(product.id));
    productGrid.appendChild(card);
  });
}

function addToCart(productId) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    state.cart.push({ id: productId, quantity: 1 });
  }
  saveCart();
  renderCart();
  openCart();
}

function updateQuantity(productId, change) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((entry) => entry.id !== productId);
  saveCart();
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let itemCount = 0;
  let subtotalValue = 0;

  state.cart.forEach((entry) => {
    const product = products.find((item) => item.id === entry.id);
    if (!product) return;

    itemCount += entry.quantity;
    subtotalValue += product.price * entry.quantity;

    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <p>${money(product.price)} each</p>
        <div class="quantity-row">
          <div class="stepper" aria-label="Quantity controls">
            <button type="button" aria-label="Decrease quantity">-</button>
            <span>${entry.quantity}</span>
            <button type="button" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-button" type="button">Remove</button>
        </div>
      </div>
    `;

    const [decrease, increase] = row.querySelectorAll(".stepper button");
    decrease.addEventListener("click", () => updateQuantity(product.id, -1));
    increase.addEventListener("click", () => updateQuantity(product.id, 1));
    row.querySelector(".remove-button").addEventListener("click", () => removeFromCart(product.id));
    cartItems.appendChild(row);
  });

  const deliveryValue = subtotalValue === 0 || subtotalValue >= 999 ? 0 : 99;
  cartCount.textContent = itemCount;
  subtotal.textContent = money(subtotalValue);
  delivery.textContent = deliveryValue === 0 ? "Free" : money(deliveryValue);
  grandTotal.textContent = money(subtotalValue + deliveryValue);
  checkoutButton.disabled = itemCount === 0;
  cartEmpty.style.display = itemCount === 0 ? "block" : "none";
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  overlay.hidden = true;
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});

categoryFilter.addEventListener("change", (event) => {
  state.category = event.target.value;
  renderProducts();
});

document.querySelector("#openCart").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

checkoutButton.addEventListener("click", () => {
  if (!state.cart.length) return;
  alert("Checkout page prepared. Order summary is ready for submission.");
});

renderProducts();
renderCart();
