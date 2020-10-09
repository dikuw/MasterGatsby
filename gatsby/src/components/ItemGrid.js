import React from 'react';
import { ItemStyles, ItemsGrid } from '../styles/Grids';

export default function ItemGrid({ items }) {
  return (
    <ItemsGrid>
      {items.map(item => (
        <ItemStyles key={item._id}>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            width="500"
            height="400" 
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`} 
            alt={item.name}
            style={{
              background: `url(${item.image.asset.metadata.iqlp})`,
              backgroundSize: 'cover',
            }}
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}