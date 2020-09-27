import React from 'react';
import styled from 'styled-components';
import Pizza from './Pizza';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map(pizza => (
        <Pizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  )
}