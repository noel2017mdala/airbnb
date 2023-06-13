"use client";
import React, { useMemo } from "react";
import { Resevation } from "@prisma/client";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "./ListingHead";

type Props = {
  listing: any;
  currentUser?: any;
  reservations?: Resevation[];
};

const ListingClient = ({ listing, currentUser }: Props) => {
  const category = useMemo(() => {
    return categories.find((item) => {
      item.label === listing.category;
    });
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
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
