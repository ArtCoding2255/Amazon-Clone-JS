export let cart = JSON.parse(localStorage.getItem('cart'));

// if cart is empty (null) give it default value
if (!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1',
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2',
    },
  ];
}

//save changes to local storage
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); //local storage can only save string
}

// ---Add to Cart Function---
export function addToCart(productId) {
  let matchingCartItem;
  //Check if product is already in the cart
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingCartItem = cartItem;
    }
  });

  if (matchingCartItem) {
    matchingCartItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    });
  }

  //console.log(cart);
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingCartItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingCartItem = cartItem;
    }
  });

  matchingCartItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
