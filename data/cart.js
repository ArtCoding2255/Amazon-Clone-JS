export const cart = [];
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
