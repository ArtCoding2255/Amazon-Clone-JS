export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency; //don't need {} anymore when import this function bcoz it only export 1 thing
