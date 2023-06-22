import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized access"
        subTitle="Please login into your account"
      />
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subTitle="Looks like you no one hasn't saved any reservations yet"
      />
    );
  }

  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPage;
