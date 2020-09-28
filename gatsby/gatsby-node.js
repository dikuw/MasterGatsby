import path from 'path';
import fetch from 'isomorphic-fetch';

async function createPizzaPages({ graphql, actions }) {
  const template = path.resolve('./src/templates/Pizza.js');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach(pizza => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: template,
      context: {
        slug: pizza.slug.current,
        name: pizza.name,
      }
    });
  });
}

async function createToppingPages({ graphql, actions }) {
  const template = path.resolve('./src/pages/pizzas.js');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.toppings.nodes.forEach(topping => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: template,
      context: { 
        topping: topping.name,
      }
    });
  });
}

async function fetchBeers({ actions, createNodeId, createContentDigest }) {
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer)
      }
    };
    actions.createNode({
      ...beer,
      ...nodeMeta
    });
  }
}

export async function sourceNodes(params) {
  await Promise.all([
    fetchBeers(params),
  ]);
}

export async function createPages(params) {
  await Promise.all([
    createPizzaPages(params),
    createToppingPages(params),
  ]);
}