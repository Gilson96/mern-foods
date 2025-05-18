import { Meal } from "../../features/Recipe";
import { StarIcon } from "@heroicons/react/24/solid";

type RestaurantDetailsProps = {
  restaurant: Meal;
  isLoading: boolean;
  isFetching: boolean;
};

export const RestaurantDetailsSmallScreen = ({
  restaurant,
  isLoading,
  isFetching,
}: RestaurantDetailsProps) => {
  const loading = !restaurant || isLoading || isFetching;

  return (
    <section className="flex flex-col justify-center items-center pt-[60%] pb-[2%] medium-phone:pt-[50%] tablet:pt-[35%]">
      <p
        className={`${
          loading
            ? "bg-neutral-300 h-[2rem] w-[50%] animate-pulse"
            : "text-2xl font-bold pb-[2%]"
        } `}
      >
        {!loading && restaurant.name}
      </p>{" "}
      <div className="flex flex-wrap justify-center items-center gap-1">
        <p className={`flex items-center text-black`}>
          <span className={`${loading && 'h-[1rem] w-[2rem] bg-neutral-300'}`}>{!loading && parseFloat(restaurant.rating).toFixed(2)}</span>
          <span>
            <StarIcon className="h-5 w-5" />
          </span>
        </p>
        <span className="text-neutral-500 ">&#183;</span>
        <p className={`${loading && 'h-[1rem] w-[7rem] bg-neutral-300'} text-neutral-500`}>
          {!loading && '£' + parseFloat(restaurant.deliveryFee).toFixed(2) + 'Delivery Fee'} 
        </p>
        <span className="text-neutral-500">&#183;</span>
        <p className={`${loading && 'h-[1rem] w-[2rem] bg-neutral-300'} text-neutral-500`}>{!loading && restaurant.arrival + 'min'} </p>
        <p className={`${loading && 'h-[1rem] w-[2rem] bg-neutral-300'} text-neutral-500`}>{!loading && restaurant.address}</p>
      </div>
    </section>
  );
};

export const RestaurantDetailsLargeScreen = ({
  restaurant,
  isLoading,
  isFetching,
}: RestaurantDetailsProps) => {
  const loading = !restaurant || isLoading || isFetching;
  
  return (
    <div className="flex items-center justify-between px-[3%] pt-[2%] pb-[1%] small-laptop:pr-[3%] small-laptop:pl-[7%]"> 
      <div className="h-full flex items-end gap-5">
        {/* restaurant name */}
        <p className={`${loading && 'h-[1.5rem] w-[9rem] bg-neutral-300 animate-pulse'} font-bold text-2xl`}> {!loading && restaurant.name}</p>     
        <div className="flex items-center gap-1">
          {/* restaurant rating */}
          <p className={`${loading && 'h-[1.2rem] w-[2rem] bg-neutral-300 animate-pulse'}`}>{!loading && restaurant.rating}</p>
          <StarIcon className="h-4 w-4" />
          {/* restaurant address */}
          <span className="text-neutral-500">&#183;</span>
          <div className={`${loading && 'h-[1.2rem] w-[9rem] bg-neutral-300 animate-pulse'}`}>{!loading && restaurant.address}</div>
        </div>
      </div>
      <div className="h-[2rem] flex items-center justify-center text-white gap-3 font-medium">
        <p className="flex items-center bg-black rounded-full w-full py-1 px-3 gap-2">
          <p className={`${loading && 'invisible'}`}>{!loading && '£' + Number(restaurant.deliveryFee).toFixed(2)}</p>
          <p>Delivery Fee</p>
        </p>
        <p className="bg-neutral-400 rounded-full py-1 px-3 flex gap-1">
          <span className={`${loading && 'invisible'}`}>{!loading && restaurant.arrival}</span>
          <span>min</span>
        </p>
      </div>
    </div>
  );
};
