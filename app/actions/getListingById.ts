import client from "../libs/prismadb";

type Props = {
  listingId?: string;
};

export default async function getListingById(params: Props) {
  try {
    const { listingId } = params;

    const listing = await client.listings.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error();
  }
}
