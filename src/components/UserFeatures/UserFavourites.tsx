import { useGetUserQuery } from "../../features/auth";
import { Circle } from "@chakra-ui/react";
import { useGetRestaurantsQuery } from "../../features/Recipe";
import { Link, useLocation } from "react-router-dom";
import NavigatorBar from "../Navigator/NavigatorBar";
import StartingPageUser from "../Login/StartingPageUser";
import { useEffect } from "react";

type UserFavouritesProps = {
  state: {
    postcode: string;
    login: string;
  };
};

const UserFavourites = () => {
  const { data: user, isLoading, isFetching, refetch } = useGetUserQuery();
  const { data: restaurant } = useGetRestaurantsQuery();
  const { state }: UserFavouritesProps = useLocation();
  const loading = isLoading || isFetching;

  useEffect(() => {
    refetch();
  }, [user]);

  if (!user && !restaurant) return <StartingPageUser />;

  const userFavouritesRestaurants = user?.users[0].favouritesRestaurants?.map(
    (find: { id: string }) => find.id
  );

  const findRestaurant = () => {
    const restaurants = [];
    for (let i = 0; i < userFavouritesRestaurants!.length; i++) {
      const finder = restaurant?.find(
        (find) => find._id === user?.users[0].favouritesRestaurants[i]?._id
      );

      restaurants.push(finder);
    }
    return restaurants;
  };
  

  return (
    <div className="flex flex-col p-[3%]">
      <NavigatorBar
        login={state.login}
        postcode={state.postcode}
        setActiveCategory={() => ""}
      />
      <p className="small-laptop:p-0 small-laptop:pt-[4%] small-laptop:pl-[4.5%] desktop:pl-[3.3%] text-xl font-bold p-[1%]">
        Favourites foods
      </p>

      <div className="small-laptop:grid small-laptop:grid-cols-3 small-laptop:p-[3%] tablet:grid tablet:grid-cols-2 w-full">
        {findRestaurant().map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant?._id}`}
            state={{
              postcode: state.postcode,
              login: state.login,
            }}
          >
            <div className="flex justify-between gap-[2%] my-[3%]">
              <img
                src={restaurant?.poster_image}
                alt="restaurant"
                className="small-laptop:w-[50%] small-laptop:h-[50%] w-[30%] h-[30%] rounded-2xl"
              />
              <div className=" w-full">
                <div className="flex max-tablet:justify-between items-center gap-[10%]">
                  <p className="font-medium">{restaurant?.name}</p>
                  <Circle
                    size="7"
                    bg="#d4d4d4"
                    color="black"
                    fontSize={"sm"}
                    fontWeight={"medium"}
                  >
                    {restaurant?.rating}
                  </Circle>
                </div>
                <div className="text-sm text-neutral-600">
                  <p>
                    {!loading &&
                      "£" +
                        parseFloat(restaurant!.deliveryFee).toFixed(2) +
                        " Delivery Fee"}{" "}
                  </p>
                  <p
                    className={`${
                      loading && "h-[1rem] w-[2rem] bg-neutral-300"
                    } text-neutral-600`}
                  >
                    {!loading && "Estimated in " + restaurant?.arrival + " min"}{" "}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserFavourites;
