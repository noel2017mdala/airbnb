"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

type ErrorStateParams = {
  error: Error;
};

const ErrorState: React.FC<ErrorStateParams> = ({ error }) => {
  useEffect(() => {
    console.log("error");
  }, [error]);
  return (
    <EmptyState
      title="Ops something went wrong"
      subTitle="Please try refreshing your page or contact us"
    />
  );
};

export default ErrorState;
