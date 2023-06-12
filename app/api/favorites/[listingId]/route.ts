import { NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

type UserParams = {
  listingId?: string;
};

//create user listing
export async function POST(
  request: Request,
  { params }: { params: UserParams }
) {
  const { listingId } = params;

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
export async function DELETE(
  request: Request,
  { params }: { params: UserParams }
) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;

  if (!currentUser) return NextResponse.error();

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteId = [...(currentUser.favoriteIds || [])];

  favoriteId = favoriteId.filter((id: string) => id !== listingId);

  console.log(favoriteId);

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
