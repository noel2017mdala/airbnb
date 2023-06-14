"use client";

import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/HeartButton";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";

type Props = {
  title: string;
  imgSrc: string;
  locationValue: string;
  id: string;
  currentUser?: any;
};

const ListingHead = ({
  title,
  imgSrc,
  locationValue,
  id,
  currentUser,
}: Props) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image src={imgSrc} alt="image" fill className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
