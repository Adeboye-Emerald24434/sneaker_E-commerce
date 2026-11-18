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

clickableImages.forEach(function (image, index) {
  image.addEventListener("click", function () {
    currentIndex = index;
    modalImage.src = image.dataset.large;
    imageModal.classList.add("active");
  });
});

if (closeModal) {
  closeModal.addEventListener("click", function () {
    imageModal.classList.remove("active");
  });
}

if (nextButton) {
  nextButton.addEventListener("click", function () {
    currentIndex++;
    if (currentIndex >= productImages.length) {
      currentIndex = 0;
    }
    modalImage.src = productImages[currentIndex];
  });
}

if (prevButton) {
  prevButton.addEventListener("click", function () {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = productImages.length - 1;
    }
    modalImage.src = productImages[currentIndex];
  });
}

if (cartIcon) {
  cartIcon.addEventListener("click", function () {
    cartDropdown.classList.toggle("active");
  });
}

async function getProducts() {
  const response = await fetch("products.json");
  if (!response.ok) {
    throw new Error("Could not load products.json");
  }

  const products = await response.json();
  productData = products[0];
  productImages = productData.images.map(function (image) {
    return image.large;
  });

  const productName = document.getElementById("product-name");
  const productDescription = document.getElementById("product-description");
  const productPrice = document.getElementById("product-price");
  const productDiscount = document.getElementById("product-discount");
  const oldPrice = document.getElementById("old-price");
  const mainImage = document.querySelector(".img-lg");
  const thumbnails = document.querySelectorAll(".img-sm");

  if (productName) productName.innerText = productData.name;
  if (productDescription) productDescription.innerText = productData.description;
  if (productPrice) productPrice.innerText = "$" + productData.price + ".00";
  if (productDiscount) productDiscount.innerText = productData.discount + "%";
  if (oldPrice) oldPrice.innerText = "$" + productData.oldPrice + ".00";

  if (mainImage) {
    mainImage.src = productData.images[0].large;
    mainImage.dataset.large = productData.images[0].large;
    mainImage.alt = productData.name;
  }

  thumbnails.forEach(function (image, index) {
    if (productData.images[index]) {
      image.src = productData.images[index].thumbnail;
      image.dataset.large = productData.images[index].large;
      image.alt = productData.name;
    }
  });
}

getProducts().catch(function (error) {
  console.error(error);
});

const checkoutButton = document.querySelector(".checkout-btn");
if (checkoutButton) {
  checkoutButton.addEventListener("click", function () {
    alert("Proceeding to checkout");
  });
}
