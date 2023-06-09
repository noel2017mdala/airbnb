import { NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

type Params = {
  listingId?: string;
};

//create user listing
export async function POST(request: Request, { listingId }: Params) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteId = [...(currentUser.favoriteIds || [])];

  favoriteId.push(listingId);

  const updateListing = await client.user.update({
    where: {
      id: currentUser.id,
    },

    data: {
      favoriteIds: favoriteId,
    },
  });

  return NextResponse.json(updateListing);
}

//delete user listing
export async function DELETE(request: Request, { listingId }: Params) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteId = [...(currentUser.favoriteIds || [])];

  favoriteId = favoriteId.filter((id: string) => id === listingId);

  const updateListing = await client.user.update({
    where: {
      id: currentUser.id,
    },

    data: {
      favoriteIds: favoriteId,
    },
  });

  return NextResponse.json(updateListing);
}
