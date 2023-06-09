import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";

type UserInterface = {
  listingId?: string;
  currentUser?: any | null;
};

const useFavorite = ({ listingId, currentUser }: UserInterface) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
  }, []);
};
