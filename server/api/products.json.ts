import dotenv from "dotenv";
dotenv.config();

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
};

const weekMap = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 0,
};

export default async (req, res) => {
  const params = new URLSearchParams(req.url);
  const client_id = params.get("client_id");
  try {
    const products = await fetch(
      "https://api.airtable.com/v0/appl59VVNYe2k9Wim/Products",
      { headers }
    ).then((res) => res.json());
    const orders = await fetch(
      `https://api.airtable.com/v0/appl59VVNYe2k9Wim/tblL3uVf1915ffjZU?filterByFormula=ARRAYJOIN(%7BClient+Rec+ID%7D%2C+%22%2C%22)+%3D+'${client_id}'`,
      {
        headers,
      }
    ).then((res) => res.json());
    return products.records
      .map((product) => {
        const productOrders = orders.records
          .filter((order) => order.fields.Product[0] === product.id)
          .map((order) => {
            const date = order.fields["Order Date"];
            order.fields["Order Date"] = new Date(date).getTime();
            return {
              quantity: order.fields.Orders,
              date: order.fields["Order Date"],
            };
          });
        return {
          id: product.fields.id,
          available_days: product.fields["Available Days"].map(
            (day) => weekMap[day]
          ),
          name: product.fields.Name,
          lead_hours: product.fields["Lead Time (hrs)"],
          description: product.fields.Description,
          orders: productOrders,
        };
      })
      .filter((product) => product.orders.length > 0);
  } catch (err) {
    console.error(err);
    res.statusCode = 404;
    return "Client not found";
  }
};
