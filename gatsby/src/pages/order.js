import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calcPizzaPrice from '../utils/calcPizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function OrderPage({ data }) {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO title={'Order a pizza'} />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={values.name} onChange={updateValue}></input>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={values.email} onChange={updateValue}></input>
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          {pizzas.map(pizza => (
            <div key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map(size => (
                  <button key={pizza.id + size} type="button">
                    {size} {formatMoney(calcPizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
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