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
/*-----------API----------*/

function initMap() {
  var location = { lat: 49.472359, lng: 15.00308 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: location,
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

/*-----------Shop----------*/

let carts = document.querySelectorAll(".add-to-cart");

let products = [
  {
    name: "Honey nr.1",
    tag: "Honey nr.1",
    price: 25,
    inCart: 0,
  },
  {
    name: "Honey nr.2",
    tag: "Honey nr.2",
    price: 20,
    inCart: 0,
  },
  {
    name: "Honey nr.3",
    tag: "Honey nr.3",
    price: 15,
    inCart: 0,
  },
  {
    name: "Honey nr.4",
    tag: "Honey nr.4",
    price: 10,
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
