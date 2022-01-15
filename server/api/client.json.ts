import dotenv from "dotenv";
dotenv.config();

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
};

export default async (req, res) => {
  const params = new URLSearchParams(req.url);
  const client_id = params.get("client_id");
  const url = `https://api.airtable.com/v0/appl59VVNYe2k9Wim/Clients/${client_id}`;
  const client = await fetch(url, { headers }).then((res) => res.json());
  if (client) {
    return {
      name: client.fields.Name,
      logo_url: client.fields["Company Logo"][0].url,
    };
  } else {
    res.statusCode = 404;
    return "Client not found";
  }
};
