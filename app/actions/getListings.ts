import client from "../libs/prismadb";

export type ListingsParams = {
  userId?: string;
};

export default async function getListings(params: ListingsParams) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    const listings = await client.listings.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (err: any) {
    throw new Error(err);
  }
}
