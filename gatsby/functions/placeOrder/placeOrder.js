const nodemailer = require('nodemailer');

function generateEmail({ order, total }) {
  return `
    <div>
      <h2>Your Recent Order for ${total}</h2>
      <p>Your order will be ready in 20 minutes</P>
    </div>
    <ul>
      ${order.map(item => `
        <li>
          <img src="${item.thumbnail}" alt="${item.name}" />
          ${item.size} ${item.name} - ${item.price}
        </li>
      `).join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong>.</p>
    <style>
      ul {
        list-style: none;
      }
    </style>
  `;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
  }
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({message: `${field} is required. Please try again`})
      }
    }
  }

  const info = await transporter.sendMail({
    from: "Slick's Slices <slice@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "New Order",
    html: generateEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  }
}