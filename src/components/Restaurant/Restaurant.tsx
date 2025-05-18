import Menu from "./Menu";
import { Divider } from "@chakra-ui/react";
import { useGetRestaurantQuery } from "../../features/Recipe";
import { useLocation, useParams } from "react-router-dom";
import NavigatorBar from "../Navigator/NavigatorBar";
import useScreenSize from "../../features/useScreenSize";
import Reviews from "./Reviews";
import {
  RestaurantDetailsLargeScreen,
  RestaurantDetailsSmallScreen,
} from "./RestaurantDetails";
import RestaurantHeroImage from "./RestaurantHeroImage";

type RestaurantProps = {
  state: {
    postcode: string;
    login: string;
    favouritesRestauratans: [];
    userId: string;
  };
};

const Restaurant = () => {
  // Getting id from url
  const { _id } = useParams();
  // parseInt(id!) < ! > => makes variable non-nullable
  // Fix string | undefined error
  const {
    data: restaurant,
    isLoading,
    isFetching,
  } = useGetRestaurantQuery(_id!);
  
  const { state }: RestaurantProps = useLocation();
  const screenSize = useScreenSize();

console.log(state)
  return (
    <>
      <div className="max-tablet:p-[3%] tablet:py-[2%] tablet:px-[1%] small-laptop:py-[3%] desktop:pl-[3%]">
        <NavigatorBar
          postcode={state.postcode}
          login={state.login}
          setActiveCategory={() => ""}
        />
      </div>
      <main className="h-full w-full flex flex-col justify-center items-center">
        {/* Hero image */}
        <RestaurantHeroImage
          restaurantId={restaurant?._id}
          favouritesRestaurants={state.favouritesRestauratans}
          isLoading={isLoading}
          isFetching={isFetching}
          restaurant={restaurant}
          
        />
        {/* Restaurant Details small screen */}
        {screenSize.width < 1024 ? (
          <>
            <RestaurantDetailsSmallScreen
              restaurant={restaurant!}
              isLoading={isLoading}
              isFetching={isFetching}
            />
            <Divider my={'5%'}/>
            <Reviews _id={_id!} />
            <Divider my={'5%'}/>
            <Menu _id={_id} postcode={state.postcode} login={state.login} />
          </>
        ) : (
          <>
            {/* Restaurant Details large screen */}
            <RestaurantDetailsLargeScreen
              restaurant={restaurant!}
              isLoading={isLoading}
              isFetching={isFetching}
            />
            <Divider width={"90%"} position={"relative"} left={"7%"} />
            <Reviews _id={_id!} />
            <Divider
              width={"90%"}
              position={"relative"}
              left={"7%"}
              top={"30px"}
            />
            <Menu _id={_id} postcode={state.postcode} login={state.login} />
          </>
        )}
      </main>
    </>
  );
};

export default Restaurant;
