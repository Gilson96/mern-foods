import { StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import useScreenSize from "../../features/useScreenSize";

type RestaurantListProps = {
  postcode: string;
  login: string;
  name: string;
  deliveryFee: string;
  rating: string;
  poster_image: string;
  arrival: number;
  _id: string;
  isCategoryActive: boolean;
};

const RestaurantList = ({
  name,
  deliveryFee,
  arrival,
  rating,
  poster_image,
  isCategoryActive,
  _id,
  postcode,
  login,
}: RestaurantListProps) => {
  const screenSize = useScreenSize();
  const largePhone = screenSize.width >= 425 && screenSize.width < 768;

  return (
    <Link
      to={`/restaurant/${_id}`}
      state={{
        postcode: postcode,
        login: login,
      }}
      className={`${
        isCategoryActive ? "h-full w-full" : "w-[90%]"
      }  flex flex-col`}
    >
      {/* Restaurant image */}
      <div
        className={`h-[8rem] w-full rounded-xl tablet:h-[8rem]  ${
          isCategoryActive && "h-[10rem] w-full"
        }`}
      >
        <img
          style={{
            height: isCategoryActive
              ? largePhone
                ? 13 + "rem"
                : 10 + "rem"
              : screenSize.width < 1024
              ? 8 + "rem"
              : 10 + "rem",
            width: 100 + "%",
          }}
          src={poster_image}
          alt="restaurant"
          className=" rounded-2xl"
        />
      </div>

      {/* Restaurant details */}
      {/* Name */}
      <div
        className={`flex items-center justify-between w-full px-[1%] small-laptop:px-[2%] large-phone:pt-[2px] tablet:pt-[10%] small-laptop:pt-[15%] medium-laptop:pt-[13%] ${
          isCategoryActive && "mt-[2%] large-phone:mt-[12%] medium-laptop:mt-0"
        }`}
      >
        <p className="font-semibold truncate">{name}</p>
      </div>

      {/* delivery Fee */}
      <p className="flex text-neutral-600 gap-1 px-[1%] medium-phone:py-[1%] small-laptop:px-[2%]">
        <span>£{parseFloat(deliveryFee).toFixed(2)}</span>
        <span>&#183;</span>
        <span className="">Delivery Fee</span>
      </p>

      {/* rating && arrival */}
      <div
        className={`flex gap-1 medium-laptop:pl-[2%] ${
          isCategoryActive && "mb-[5%] items-center small-laptop:px-[2%]"
        } px-[1%] `}
      >
        <p className="flex items-center text-black">
          <span>{parseFloat(rating).toFixed(1)}</span>
          <StarIcon className="h-4 w-4" />
        </p>
        <p className="text-neutral-600">&#183;</p>
        <p className="text-neutral-600">{arrival} min</p>
      </div>
    </Link>
  );
};

export default RestaurantList;
