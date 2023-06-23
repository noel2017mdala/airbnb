import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";

import React from "react";
import ClientFavorites from "./ClientFavorites";
import getFavorites from "../actions/getFavoriteListings";

type Props = {};

const FavoritesPage = async (props: Props) => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavorites();

  if (!favorites) {
    return (
      <EmptyState
        title="Unauthorized access"
        subTitle="Please login into your account"
      />
    );
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subTitle="Looks like you haven't added any favorites yet"
      />
    );
  }
  return <ClientFavorites currentUser={currentUser} favorites={favorites} />;
};

export default FavoritesPage;
