"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

type Props = {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
};

const EmptyState = ({
  title = "No exact matches",
  showReset,
  subTitle = "Try changing your filters",
}: Props) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subTitle={subTitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="remove all filters"
            onclick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
