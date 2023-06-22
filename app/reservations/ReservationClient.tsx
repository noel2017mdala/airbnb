"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/Listings/ListingCard";

type Props = {
  reservations: any[];
  currentUser?: any | null;
};

const ReservationClient = ({ reservations, currentUser }: Props) => {
  const router = useRouter();
  const [deleteReservation, setDeleteReservation] = useState<string>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteReservation(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(
            "Failed to cancel the reservation please try again later"
          );
        })
        .finally(() => {
          setDeleteReservation("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subTitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteReservation == reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
