"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = (props: Props) => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [steps, setSteps] = useState<number>(Steps.CATEGORY);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const rooms = watch("roomCount");
  const bathrooms = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const price = watch("price");
  const title = watch("title");
  const description = watch("description");

  const Map = useMemo(() => {
    return dynamic(() => import("../Map"), {
      ssr: false,
    });
  }, [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setSteps((value) => value - 1);
  };

  const onNext = () => {
    setSteps((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (steps !== Steps.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setSteps(Steps.CATEGORY);
      })
      .catch(() => {
        toast.error("Ops something went wrong");
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (steps === Steps.PRICE) {
      return "Create";
    }

    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === Steps.CATEGORY) return undefined;

    return "Back";
  }, [steps]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of those best describes your place"
        subTitle="Pick a category"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((items, index) => (
          <div className="col-span-1" key={items.label}>
            {/* {items.label}    */}
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === items.label}
              label={items.label}
              icon={items.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (steps === Steps.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help guest find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (steps === Steps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subTitle="what amenities do you have?"
        />

        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onchange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={rooms}
          onchange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many Bathrooms do you have?"
          value={bathrooms}
          onchange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (steps === Steps.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your place"
          subTitle="Show guests what your place looks like!"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (steps === Steps.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place"
          subTitle="Short and sweet works the best"
        />

        <hr />
        <Input
          id="title"
          label="Tittle"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (steps === Steps.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now set your price"
          subTitle="How much  do you charge per night"
        />

        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
          type="number"
        />
      </div>
    );
  }
  return (
    <Modal
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActonLabel={secondaryActionLabel}
      secondaryAction={steps === Steps.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
