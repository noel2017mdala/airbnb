import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

type Props = {
  reservationId?: string;
};

export async function DELETE(request: Request, { params }: { params: Props }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID provided");
  }

  const reservation = await client.resevation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
