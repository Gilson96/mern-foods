import { Meal } from "../../features/Recipe";
import {
  useGetUserQuery,
  usePostToFavouriteMutation,
  useRemoveFromFavouriteMutation,
} from "../../features/auth";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useToast } from "@chakra-ui/react";
import StartingPageUser from "../Login/StartingPageUser";

type RestaurantHeroImageProps = {
  favouritesRestaurants: [];
  restaurantId: string | undefined;
  restaurant: Meal | undefined;
  isLoading: boolean;
  isFetching: boolean;
};

const RestaurantHeroImage = ({
  restaurantId,
  restaurant,
  isFetching,
  isLoading,
}: RestaurantHeroImageProps) => {
  const [addToFavourites] = usePostToFavouriteMutation();
  const [removeFromFavourites] = useRemoveFromFavouriteMutation();
  const { data: user, refetch } = useGetUserQuery();
  const loading = !restaurant || isLoading || isFetching;
  const toast = useToast();

  if (!user) return <StartingPageUser />;

  const checkIfExistInFavourites = () => {
    return user?.users[0].favouritesRestaurants?.some(
      (restaurant: { _id: string }) => restaurant._id === restaurantId
    );
  };

  const addOrRemoveFavourites = async () => {
    try {
      if (!checkIfExistInFavourites()) {
        await addToFavourites({
          userId: user?.users[0]._id,
          body: {
            _id: restaurant!._id,
            name: restaurant!.name,
            deliveryFee: restaurant!.deliveryFee,
            arrival: restaurant!.arrival,
            rating: restaurant!.rating,
            poster_image: restaurant!.poster_image,
          },
        }).unwrap();
        refetch();
        toast({
          title: "Added to Favourites",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        await removeFromFavourites({
          userId: user?.users[0]._id,
          restaurantId: restaurantId,
        }).unwrap();
        refetch();
        toast({
          title: "Remove from Favourites",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(checkIfExistInFavourites());

  return (
    <div
      style={{
        backgroundImage: `${loading ? "" : `url(${restaurant.poster_image})`} `,
      }}
      className={`${
        loading && "animate-pulse"
      } h-[10rem] w-full absolute bg-neutral-400 bg-center bg-no-repeat bg-cover left-0 flex justify-end p-[2%] gap-1  tablet:h-[15rem] large-phone:h-[12rem] small-laptop:w-[90%] small-laptop:relative small-laptop:left-[7%] small-laptop:rounded-xl small-laptop:top-[0.5rem] small-laptop:h-[20rem] medium-laptop:h-[25rem] medium-laptop:left-[6%] medium-laptop:top-0`}
      onClick={addOrRemoveFavourites}
    >
      <span className="h-[3rem] w-[3rem] bg-white flex justify-center items-center rounded-full shadow-lg cursor-pointer">
        {!checkIfExistInFavourites() ? (
          <HeartIcon className="h-6 w-6 text-black" />
        ) : (
          <HeartIconSolid className="h-6 w-6 text-black" />
        )}
      </span>
    </div>
  );
};

export default RestaurantHeroImage;
