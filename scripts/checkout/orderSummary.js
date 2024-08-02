import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../../scripts/utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {
  deliveryOptions,
  getDeliveryOption,
} from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId; //product id from cart

    const matchingProduct = getProduct(productId); //get product from product list

    console.log('Matching Product', matchingProduct);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }    ">
            <div class="delivery-date">Delivery date: ${dateString} </div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">${matchingProduct.name}</div>
                <div class="product-price">$${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
                    matchingProduct.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `;
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    //--Steps--
    //1. Loop through delivery options
    //2. For each option generate some HTML
    //3.Combine all the HTML together
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString =
        deliveryOption.priceCents === 0
          ? 'FREE Shipping'
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
                  <input
                  ${isChecked ? 'checked' : ''}
                  type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">$${priceString} Shipping</div>
                  </div>
      </div>
      `;
    });

    return html;
  }

  //---Controller--
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  //console.log(cartSummaryHTML);
  console.log(cart);
  // Add interactive of delete link
  document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      //console.log('Delete link clicked : ', deleteLink.dataset.productId);
      //remove product
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      //console.log(cart);
      console.log(container);
      container.remove();
      //--rerender payment summary--
      renderPaymentSummary();

      //--Another way to remove product from cart
      // cart.forEach((cartItem) => {
      //   if (cartItem.productId === productId) {
      //     const cartItemIndex = cart.indexOf(cartItem);
      //     cart.splice(cartItemIndex, 1);
      //   }
      // });
      // console.log(cart);
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((option) => {
    option.addEventListener('click', () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId); //controller update data
      renderOrderSummary(); //regenerate view
      renderPaymentSummary(); //regenerate view of payment summary
    });
  });
}
