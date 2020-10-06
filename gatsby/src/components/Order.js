import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import Img from 'gatsby-image';
import calcPizzaPrice from '../utils/calcPizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function Order({ order, pizzas, removeFromOrder, }) {
  return (
    <>
      {order.map((item, index) => {
        const pizza = pizzas.find(pizza => pizza.id === item.id);
        return (
          <MenuItemStyles key={`${item.id}-${index}`}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calcPizzaPrice(pizza.price, item.size))}
              <button 
                type="button" 
                className="remove" 
                title={`Remove ${item.size} ${pizza.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        )
      })}
    </>
  )
}