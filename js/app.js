'use strict';

//global variables
let allProduct = [];
let clicks = 0;
let clicksAllowed = 25;
let productValidation = [];
let checkProductValidation = [];

let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.getElementById('imgOne');
let imageTwo = document.getElementById('imgTwo');
let imageThree = document.getElementById('imgThree');

let thumbsImg = 'img/thumbs.jpeg';


function CreateProduct(product, fileExtension = 'jpg') {
  this.product = product;
  this.src = `img/${product}.${fileExtension}`;
  this.clicked = 0;
  this.views = 0;
  this.thumbs = 0;
  allProduct.push(this);
}

new CreateProduct('bag');
new CreateProduct('banana');
new CreateProduct('bathroom');
new CreateProduct('boots');
new CreateProduct('breakfast');
new CreateProduct('bubblegum');
new CreateProduct('chair');
new CreateProduct('cthulhu');
new CreateProduct('dog-duck');
new CreateProduct('dragon');
new CreateProduct('pen');
new CreateProduct('pet-sweep');
new CreateProduct('scissors');
new CreateProduct('shark');
new CreateProduct('sweep', 'png');
new CreateProduct('tauntaun');
new CreateProduct('unicorn');
new CreateProduct('water-can');
new CreateProduct('wine-glass');

function selectRandomProductIndex() {
  return Math.floor(Math.random() * allProduct.length);
}

function renderRandomProduct() {

  while (productValidation.length < 3) {
    let uniqueProduct = selectRandomProductIndex();
    while (!productValidation.includes(uniqueProduct) && !checkProductValidation.includes(uniqueProduct)) {
      productValidation.push(uniqueProduct);
      checkProductValidation.unshift(uniqueProduct);
    }
  }

  if (checkProductValidation.length > 3) {
    checkProductValidation.splice(3, 5)
  }

  let productOne = productValidation.pop();
  let productTwo = productValidation.pop();
  let productThree = productValidation.pop();

  imageOne.src = allProduct[productOne].src;
  imageOne.alt = allProduct[productOne].product;
  allProduct[productOne].views++;



  imageTwo.src = allProduct[productTwo].src;
  imageTwo.alt = allProduct[productTwo].product;
  allProduct[productTwo].views++;


  imageThree.src = allProduct[productThree].src;
  imageOne.alt = allProduct[productThree].product;
  allProduct[productThree].views++;
}


function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('click on an IMAGE please');
  }
  clicks++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProduct.length; i++) {
    if (clickedProduct === allProduct[i].product) {
      allProduct[i].clicked++;
      allProduct[i].thumbs++;
    }
  }
  renderRandomProduct();
  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);

  }
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < allProduct.length; i++) {
    let li = document.createElement('li');
    let data = document.createElement('p')

    data.textContent = `${allProduct[i].product.toUpperCase()}: Had ${allProduct[i].views} views, Was clicked ${allProduct[i].clicked} times.`;
    li.appendChild(data);
    for (let j = 0; j < allProduct[i].clicked; j++) {
      let thumsPic = document.createElement('img');
      thumsPic.setAttribute('src',thumbsImg);
      console.log(thumsPic);
      li.appendChild(thumsPic);
    }

    // li.textContent = data
    ul.appendChild(li);
  }
}

function handleButtonClick(event) { //eslint-disable-line
  if (clicks === clicksAllowed) {
    renderResults();
  }
}

renderRandomProduct();


myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', handleButtonClick);
