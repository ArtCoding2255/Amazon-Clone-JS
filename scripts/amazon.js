// const products = [
//   {
//     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating: {
//       stars: 4.5,
//       count: 87,
//     },
//     priceCents: 1090, //1 dollar = 100 cents
//   },
//   {
//     image: 'images/products/intermediate-composite-basketball.jpg',
//     name: 'Intermediate Size Basketball',
//     rating: {
//       stars: 4,
//       count: 127,
//     },
//     priceCents: 2095, //1 dollar = 100 cents
//   },
//   {
//     image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799, //1 dollar = 100 cents
//   },
//   {
//     image: 'images/products/black-2-slot-toaster.jpg',
//     name: '2 Slot Toaster - Black',
//     rating: {
//       stars: 5,
//       count: 2179,
//     },
//     priceCents: 1899, //1 dollar = 100 cents
//   },
// ];

//--- Combine the HTML of these products html --

//ther

//have to import cart from the cart.js file because we use module

import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from '../scripts/utils/money.js';

let productsHtml = '';
// products variable is come from data/products.js file

products.forEach((product) => {
  productsHtml += `
   <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
                ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${formatCurrency(
            product.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart "data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
        
    `;
});
//console.log(productsHtml);

document.querySelector('.js-products-grid').innerHTML = productsHtml;
// --- Products ---
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {});
});

//--- cartQuantity function---
function updateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
  console.log('Total cart quantity:', totalQuantity);
}
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    //dataset property gives us access to all data that is attached to the element

    //Add product to cart
    const productId = button.dataset.productId;
    addToCart(productId);

    //-- Calculate the total quantity of the cart--//
    updateCartQuantity();
  });
});
