import { NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

type Params = {
  listingId?: string;
};

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID provided");
  }

  const listing = await client.listings.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
