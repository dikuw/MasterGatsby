import calcPizzaPrice from "./calcPizzaPrice";

export default function calcOrderTotal(order, pizzas) {
  return order.reduce((acc, item) => {
    const pizza = pizzas.find(pizza => pizza.id === item.id);
    return acc + calcPizzaPrice(pizza.price, item.size);
  }, 0);
}