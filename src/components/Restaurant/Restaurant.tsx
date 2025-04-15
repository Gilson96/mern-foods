import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import Menu from "./Menu";
import { Divider } from "@chakra-ui/react";
import { useGetRestaurantQuery } from "../../features/Recipe";
import { useParams } from "react-router-dom";
import NavigatorBar from "../Navigator/NavigatorBar";
import useScreenSize from "../../features/useScreenSize";
import Reviews from "./Reviews";

const Restaurant = () => {
  // Getting id from url
  const { _id } = useParams();
  // parseInt(id!) < ! > => makes variable non-nullable
  // Fix string | undefined error
  const { data: restaurant, isLoading } = useGetRestaurantQuery(_id!);

  const screenSize = useScreenSize();

  if (!restaurant) return <p></p>;
  if (isLoading) return <p>...</p>;

  return (
    <>
      <NavigatorBar setActiveCategory={() => ""} />
      <main className="h-full w-full flex flex-col justify-center items-center">
        {/* Hero image */}
        <div
          style={{ backgroundImage: `url('${restaurant.poster_image}')` }}
          className={`h-[10rem] w-full absolute bg-neutral-400 bg-center bg-no-repeat bg-cover left-0 flex justify-end p-[2%] gap-1 tablet:h-[15rem]  small-laptop:w-[95%] small-laptop:relative small-laptop:left-[3%] small-laptop:rounded-xl small-laptop:top-[2rem] small-laptop:h-[20rem]`}
        >
          <i className="h-[3rem] w-[3rem] bg-white flex justify-center items-center rounded-full shadow-lg">
            <HeartIcon className="h-6 w-6 text-black" />
          </i>
        </div>

        {screenSize.width < 1024 ? (
          <>
            {/* Title && Details */}
            <section className="flex flex-col justify-center items-center pt-[60%] pb-[2%] tablet:pt-[35%]">
              <p className="text-2xl font-bold pb-[2%]">{restaurant.name}</p>
              <div className="flex flex-wrap justify-center items-center gap-1">
                <p className="flex items-center text-black">
                  <span>{parseFloat(restaurant.rating).toFixed(2)}</span>
                  <span>
                    <StarIcon className="h-5 w-5" />
                  </span>
                </p>
                <span className="text-neutral-500 ">&#183;</span>
                <p className="text-neutral-500">
                  £{parseFloat(restaurant.deliveryFee).toFixed(2)} Delivery Fee
                </p>
                <span className="text-neutral-500">&#183;</span>
                <p className="text-neutral-500">{restaurant.arrival} min</p>
                <p className="text-neutral-500">7{restaurant.address}</p>
              </div>
            </section>

            <Divider />

            <Menu _id={_id} />
          </>
        ) : (
          <>
            <div className="flex items-center px-[3%] pt-[4%] pb-[1%]">
              <div className="h-full w-full flex items-end gap-5">
                <p className="text-2xl font-bold">{restaurant.name}</p>
                <div className="flex items-center gap-1">
                  <p className="">{restaurant.rating}</p>
                  <StarIcon className="h-4 w-4" />
                  <span className="text-neutral-500">&#183;</span>
                  <div>{restaurant.address}</div>
                </div>
              </div>
              <div className="h-[2rem] w-[20%] flex items-end justify-end text-neutral-500 gap-3">
                <p>
                  £{Number(restaurant.deliveryFee).toFixed(2)} Delivery Fee
                </p>
                <p>{restaurant.arrival}min</p>
              </div>
            </div>
            <Divider width={"95%"} position={"relative"} left={"3%"} />
            <Reviews _id={_id!} />
            <Divider
              width={"95%"}
              position={"relative"}
              left={"3%"}
              top={"30px"}
            />
            <Menu _id={_id} />
          </>
        )}
      </main>
    </>
  );
};

export default Restaurant;
