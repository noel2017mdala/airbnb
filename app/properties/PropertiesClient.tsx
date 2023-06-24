"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

type Props = {
  listings: any[];
  currentUser?: any;
};

const PropertiesClient = ({ listings, currentUser }: Props) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property deleted successfully");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((list) => (
          <ListingCard
            key={list.id}
            data={list}
            actionId={list.id}
            onAction={onCancel}
            disabled={deleteId === list.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
