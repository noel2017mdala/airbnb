import { type } from "os";
import client from "../libs/prismadb";

type Params = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export default async function getReservations(params: Params) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) query.listingId = listingId;

    if (userId) query.userId = userId;

    if (authorId) query.listing = { userId: authorId };

    const reservations = await client.resevation.findMany({
      where: query,
      include: {
        listing: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (err: any) {
    throw new Error(err);
  }
}
