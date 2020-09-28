import path from 'path';

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


export async function createPages(params) {
  await Promise.all([
    createPizzaPages(params),
    createToppingPages(params)
  ]);
}