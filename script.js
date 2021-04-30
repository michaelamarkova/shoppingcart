/*-----------Hamb menu----------*/

const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".closeMenu");
const openMenu = document.querySelector(".openMenu");

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close);

function show() {
  mainMenu.style.display = "flex";
  mainMenu.style.top = "0";
}
function close() {
  mainMenu.style.top = "-100%";
}

/*-----------Shop----------*/

let carts = document.querySelectorAll(".add-to-cart");

let products = [
  {
    name: "Monstera",
    tag: "monstera",
    price: 25,
    inCart: 0,
  },
  {
    name: "Ivy",
    tag: "ivy",
    price: 15,
    inCart: 0,
  },
  {
    name: "Fig",
    tag: "fig",
    price: 30,
    inCart: 0,
  },
  {
    name: "Fern",
    tag: "fern",
    price: 15,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  console.log("My cartCost is", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}
/*-----------Cart page----------*/

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
      <button class="delete-button" type="button" onclick="removeFromCart('${
        item.name
      }')">
    DELETE
  </button>
      <img src= "${item.tag}.jpg">
      <span>${item.name}</span>
      </div>
      <div class="price">£${item.price},00</div>
      <div class="quantity">
      <span>${item.inCart}</span>
      </div>
      <div class="total">
      £${item.inCart * item.price},00
      </div>
      `;
    });
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">
    Basket total
    </h4>
    <h4 class="basketTotal">
    £${cartCost},00
    </h4>
    </div>`;
  }
}
onLoadCartNumbers();
displayCart();
