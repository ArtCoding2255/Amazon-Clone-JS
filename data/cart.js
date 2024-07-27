export const cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
  },
];
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
    });
  }

  console.log(cart);
}
