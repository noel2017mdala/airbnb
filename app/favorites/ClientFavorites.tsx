"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/Listings/ListingCard";

type Props = {
  currentUser?: any;
  favorites: any[];
};

const ClientFavorites = ({ favorites, currentUser }: Props) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subTitle="Here are some of your favorite places"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ClientFavorites;
