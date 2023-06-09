import client from "../libs/prismadb";

export default async function getListings() {
  try {
    const listings = await client.listings.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (err: any) {
    throw new Error(err);
  }
}
