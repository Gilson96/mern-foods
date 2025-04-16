import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Menu from "./Menu";
import { Divider } from "@chakra-ui/react";
import { useGetRestaurantQuery } from "../../features/Recipe";
import { useLocation, useParams } from "react-router-dom";
import NavigatorBar from "../Navigator/NavigatorBar";
import useScreenSize from "../../features/useScreenSize";
import Reviews from "./Reviews";

type RestaurantProps = {
  state: { postcode: string; login: string };
};

const Restaurant = () => {
  // Getting id from url
  const { _id } = useParams();
  // parseInt(id!) < ! > => makes variable non-nullable
  // Fix string | undefined error
  const { data: restaurant, isLoading } = useGetRestaurantQuery(_id!);
  const { state }: RestaurantProps = useLocation();
  const screenSize = useScreenSize();

  if (!restaurant) return <p></p>;
  if (isLoading) return <p>...</p>;

  return (
    <>
      <div className="max-tablet:p-[3%] tablet:py-[2%] tablet:px-[1%] small-laptop:py-[3%]">
        <NavigatorBar
          postcode={state.postcode}
          login={state.login}
          setActiveCategory={() => ""}
        />
      </div>
      <main className="h-full w-full flex flex-col justify-center items-center">
        {/* Hero image */}
        <div
          style={{ backgroundImage: `url('${restaurant.poster_image}')` }}
          className={`h-[10rem] w-full absolute bg-neutral-400 bg-center bg-no-repeat bg-cover left-0 flex justify-end p-[2%] gap-1  tablet:h-[15rem] large-phone:h-[12rem] small-laptop:w-[90%] small-laptop:relative small-laptop:left-[7%] small-laptop:rounded-xl small-laptop:top-[0.5rem] small-laptop:h-[20rem] medium-laptop:h-[25rem] medium-laptop:left-[6%] medium-laptop:top-0`}
        >
          <i className="h-[3rem] w-[3rem] bg-white flex justify-center items-center rounded-full shadow-lg">
            <HeartIcon className="h-6 w-6 text-black" />
          </i>
        </div>

        {screenSize.width < 1024 ? (
          <>
            {/* Title && Details */}
            <section className="flex flex-col justify-center items-center pt-[60%] pb-[2%] medium-phone:pt-[50%] tablet:pt-[35%]">
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

            <Menu _id={_id} postcode={state.postcode} login={state.login}/>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between px-[3%] pt-[2%] pb-[1%] small-laptop:pr-[3%] small-laptop:pl-[7%]">
              <div className="h-full flex items-end gap-5">
                <p className="text-2xl font-bold">{restaurant.name}</p>
                <div className="flex items-center gap-1">
                  <p className="">{restaurant.rating}</p>
                  <StarIcon className="h-4 w-4" />
                  <span className="text-neutral-500">&#183;</span>
                  <div>{restaurant.address}</div>
                </div>
              </div>
              <div className="h-[2rem] flex items-center justify-center text-white gap-3 font-medium">
                <p className="flex items-center bg-black rounded-full w-full py-1 px-3 gap-2">
                  <p className="">
                    £{Number(restaurant.deliveryFee).toFixed(2)}
                  </p>
                  <p>Delivery Fee</p>
                </p>
                <p className="bg-neutral-400 rounded-full py-1 px-3 flex gap-1">
                  <span>{restaurant.arrival}</span>
                  <span>min</span>
                </p>
              </div>
            </div>
            <Divider width={"90%"} position={"relative"} left={"7%"} />
            <Reviews _id={_id!} />
            <Divider
              width={"90%"}
              position={"relative"}
              left={"7%"}
              top={"30px"}
            />
            <Menu _id={_id} postcode={state.postcode} login={state.login}/>
          </>
        )}
      </main>
    </>
  );
};

export default Restaurant;
