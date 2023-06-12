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

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        let msg = "";

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          msg = "deleted";
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          msg = "added";
        }

        await request();
        router.refresh();
        toast.success(`Favorites ${msg} successfully`);
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, listingId, hasFavorite, loginModal, router]
  );

  return { hasFavorite, toggleFavorite };
};

export default useFavorite;
