import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import Order from '../components/Order';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import calcPizzaPrice from '../utils/calcPizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values,
  });
  return (
    <>
      <SEO title={'Order a pizza'} />
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={values.name} onChange={updateValue}></input>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={values.email} onChange={updateValue}></input>
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map(pizza => (
            <MenuItemStyles key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map(size => (
                  <button key={pizza.id + size} type="button" onClick={() => addToOrder({
                    id: pizza.id,
                    size,
                  })}>
                    {size} {formatMoney(calcPizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <Order order={order} pizzas={pizzas} removeFromOrder={removeFromOrder} />
        </fieldset>
      </OrderStyles>
    </>
  );
}


export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;