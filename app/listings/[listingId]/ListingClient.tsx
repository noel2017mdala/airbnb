"use client";
import React, { useMemo } from "react";
import { Resevation } from "@prisma/client";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

type Props = {
  listing: any;
  currentUser?: any;
  reservations?: Resevation[];
};

const ListingClient = ({ listing, currentUser }: Props) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label == listing.category);
  }, [categories, listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imgSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
