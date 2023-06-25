"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "@/app/listings/[listingId]/Calendar";
import Counter from "../Inputs/Counter";

type Props = {};
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = (props: Props) => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [steps, setSteps] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathRoomCount, setBathRoomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setSteps((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setSteps((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (steps !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathRoomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.startDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setSteps(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    steps,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathRoomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (STEPS.INFO === steps) {
      return "Search";
    }

    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.LOCATION) return undefined;

    return "Back";
  }, [steps]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subTitle="Find the perfect location"
      />

      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />

      <Map center={location?.latlng} />
    </div>
  );

  if (steps === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subTitle="Make sure everyone is free"
        />

        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
        <hr />
      </div>
    );
  }

  if (steps === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subTitle="Find your perfect place" />

        <Counter
          title="Guests"
          subtitle="How many guest are coming?"
          value={guestCount}
          onchange={(value) => setGuestCount(value)}
        />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onchange={(value) => setRoomCount(value)}
        />

        <Counter
          title="Bathroom"
          subtitle="How many bathrooms do you need?"
          value={bathRoomCount}
          onchange={(value) => setBathRoomCount(value)}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActonLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;
