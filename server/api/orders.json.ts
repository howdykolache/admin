import dotenv from "dotenv";
dotenv.config();

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
};

export default async (req, res) => {
  const params = new URLSearchParams(req.url);
  const client_id = params.get("client_id");
  const products = await fetch(
    "https://api.airtable.com/v0/appl59VVNYe2k9Wim/Products",
    { headers }
  ).then((res) => res.json());
  const client = await fetch(
    `https://api.airtable.com/v0/appl59VVNYe2k9Wim/Clients/${client_id}`,
    { headers }
  ).then((res) => res.json());
  let orders = await fetch(
    `https://api.airtable.com/v0/appl59VVNYe2k9Wim/tblL3uVf1915ffjZU?filterByFormula=ARRAYJOIN(%7BClient+Rec+ID%7D%2C+%22%2C%22)+%3D+'${client_id}'`,
    {
      headers,
    }
  ).then((res) => res.json());
  orders = orders.records.map((order) => {
    const product = products.records.find(
      (product) => product.id === order.fields.Product[0]
    );
    let date = order.fields["Order Date"];
    date = new Date(date).getTime();
    return {
      id: order.fields.id,
      quantity: order.fields.Orders,
      date,
      product: {
        name: product.fields.Name,
        description: product.fields.Description,
      },
    };
  });
  // .filter((order) => order.date >= Date.now());
  if (client) {
    return orders;
  } else {
    res.statusCode = 404;
    return "Client not found";
  }
};
