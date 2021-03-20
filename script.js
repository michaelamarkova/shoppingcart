let carts = document.querySelectorAll('.add-to-cart')

let products = [
  {
    name: 'Monstera'
    tag: 'monstera'
    price: 25
    inCart: 0
  }, 
  {
    name: 'Ivy'
    tag: 'ivy'
    price: 25
    inCart: 0
  }, 
  {
    name: 'Fig'
    tag: 'fig'
    price: 25
    inCart: 0
  }, 
  {
    name: 'Fern'
    tag: 'fern'
    price: 25
    inCart: 0
  }, 
]

for (let i=0; i <carts.length; i++) {
  carts[i].addEventListener('click', () => 
  {cartNumbers("added to cart");
})
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }

}

function cartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers){
    localStorage.setItem('cartNumbers', productNumbers +1);
    document.querySelector('cart span').textContent = productNumbers +1;
  } 
  else {
    localStorage.setItem('cartNumbers',1);
    document.querySelector('cart span').textContent = 1;
  }
}
}

onLoadCartNumbers();

