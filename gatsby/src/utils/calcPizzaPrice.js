const sizes = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

export default function calcPizzaPrice(price, size) {
  return price * sizes[size];
}