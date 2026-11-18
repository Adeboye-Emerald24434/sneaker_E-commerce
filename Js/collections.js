let productData;
let cartCount = 0;
let currentIndex = 0;
let productImages = [];

const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const qtyInput = document.getElementById("qty-input");
const cartBadge = document.getElementById("cart-badge");
const addToCartButton = document.querySelector(".add-to-cart-btn");
const cartItems = document.querySelector(".cart-items");
const cartIcon = document.querySelector(".cart-icon");
const cartDropdown = document.querySelector(".cart-dropdown");
const clickableImages = document.querySelectorAll(".clickable-image");
const imageModal = document.querySelector(".image-modal");
const modalImage = document.querySelector(".modal-image");
const closeModal = document.querySelector(".close-modal");
const nextButton = document.querySelector(".next-button");
const prevButton = document.querySelector(".prev-button");

if (minusBtn) {
  minusBtn.addEventListener("click", function () {
    let quantity = Number(qtyInput.value);
    if (quantity > 1) {
      qtyInput.value = quantity - 1;
    }
  });
}

if (plusBtn) {
  plusBtn.addEventListener("click", function () {
    let quantity = Number(qtyInput.value);
    if (quantity < 99) {
      qtyInput.value = quantity + 1;
    }
  });
}

if (addToCartButton) {
  addToCartButton.addEventListener("click", function () {
    if (!productData || !cartItems) {
      return;
    }

    const quantity = Number(qtyInput.value);
    const productPrice = productData.price;
    const totalPrice = productPrice * quantity;

    cartCount += quantity;
    cartBadge.innerText = cartCount;
    cartBadge.style.display = "block";

    const emptyCart = document.querySelector(".empty-cart");
    if (emptyCart) {
      emptyCart.remove();
    }

    cartItems.innerHTML += `<div class="cart-item">
      <img src="${productData.images[0].thumbnail}" alt="${productData.name}">
      <div class="product-details">
        <p>${productData.name}</p>
        <p>$${productPrice}.00 × ${quantity}</p>
        <p><strong>Total: $${totalPrice}.00</strong></p>
      </div>
    </div>`;
    
  });
}


async function getProducts() {
  const response = await fetch("../products.json");
  const products = await response.json();

  const menProducts = products.filter(product => product.category === "men");
  const womenProducts = products.filter(product => product.category === "women");
  const unisexProducts = products.filter(product => product.category === "unisex");

  console.log("Men products", menProducts);
  console.log("Women Products", womenProducts);
  console.log("Unisex Products", unisexProducts);

  displayProducts(menProducts, "menProducts");
  displayProducts(womenProducts, "womenProducts");
  displayProducts(unisexProducts, "unisexProducts");

  function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "col-12 col-sm-6 col-lg-3";

      card.innerHTML = `
        <div class="card h-100 product-card" data-id="${product.id}">
      <img src="../${product.image}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h4 class="card-title">${product.name}</h4>
        <h5 class="card-text">$${product.price}.00</h5>
        <a href="#" class="btn btn-sm">Shop Now</a>
      </div>
    </div>
      `;

      card.querySelector(".product-card").addEventListener("click", function () {
      const productId = product.id;
      const selectedProduct = products.find(item => item.id === productId);

      document.getElementById("modalProductImage").src = `../${selectedProduct.image}`;
      document.getElementById("modalProductImage").alt = selectedProduct.name;
      document.getElementById("modalProductCompany").textContent = selectedProduct.company;
      document.getElementById("modalProductTitle").textContent = selectedProduct.name;
      document.getElementById("modalProductDescription").textContent = selectedProduct.description;
      document.getElementById("modalProductPrice").textContent = `$${selectedProduct.price}.00`;

      const productModal = new bootstrap.Modal(document.getElementById("productModal"));
      productModal.show();
});

      container.appendChild(card);
    });

  }
}

getProducts();


const modalMinusBtn = document.getElementById("modalMinusBtn");
const modalPlusBtn = document.getElementById("modalPlusBtn");
const modalQtyInput = document.getElementById("modalQtyInput");

if (modalMinusBtn && modalPlusBtn && modalQtyInput) {
  modalMinusBtn.addEventListener("click", function () {
    let quantity = Number(modalQtyInput.value);
    if (quantity > 1) {
      modalQtyInput.value = quantity - 1;
    }
  });

  modalPlusBtn.addEventListener("click", function () {
    let quantity = Number(modalQtyInput.value);
    if (quantity < 99) {
      modalQtyInput.value = quantity + 1;
    }
  });
}