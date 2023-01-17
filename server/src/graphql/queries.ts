import dotenv from "dotenv";

dotenv.config();

export const getProductById = async (id: string) => {
  const products = await fetch(process.env.CMS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HYGRAPH_API_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
      query getProductById($id: ID) {
        products(where: { id: $id }) {
          id
          category
          title
          text
          stock
          img {
            url
          }
          color
          shadow
          rating
          price
        }
      }
      `,
      variables: {
        id,
      },
    }),
  })
    .then((res) => res.json())
    .then((result) => result.data.products)
    .catch((error) => console.log(error));

  return products;
};
