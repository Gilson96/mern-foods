import { Divider } from "@chakra-ui/react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Meal } from "../../features/Recipe";
import { removeFromCart, addToCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";

type FoodSmallScreenProps = {
  poster_image: string;
  onClose: () => void;
  name: string;
  price: string;
  description: string;
  foodsActualQuantity: number | undefined;
  food: Meal;
  foodsTotalPrice: () => number;
};

const FoodSmallScreen = ({
  poster_image,
  onClose,
  name,
  price,
  foodsActualQuantity,
  food,
  description,
  foodsTotalPrice,
}: FoodSmallScreenProps) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center">
      <img src={poster_image} className="w-[60%]" />
      <div className="w-[90%] pl-[2%]">
        <i className="bg-white h-10 w-10 absolute right-9 text-neutral-600 cursor flex justify-center items-center rounded-full top-2 shadow-xl cursor-pointer">
          <XMarkIcon className="text-black h-5 w-5" onClick={onClose} />
        </i>
        <div>
          <p className="text-xl font-bold">{name}</p>
          <p className="text-neutral-500 font-bold text-xl">
            £{Number(price).toFixed(2)}
          </p>
          <div className="mt-[5%]">
            <p>{description}</p>
          </div>
        </div>
        <Divider width={"90%"} paddingY={"1%"} />
        <div className="h-[5rem] flex items-center gap-2 justify-center">
          <p className="text-xl">Quantity</p>
          <p
            className={`${
              foodsActualQuantity === 0 ? "cursor-auto" : "cursor-pointer"
            }`}
          >
            <MinusCircleIcon
              className={`h-7 w-7  ${
                foodsActualQuantity === 0 ? "text-neutral-400" : "text-black"
              }`}
              onClick={() => dispatch(removeFromCart(food))}
            />
          </p>
          <p className="text-xl">{foodsActualQuantity}</p>
          <p className="cursor-pointer">
            <PlusCircleIcon
              className="h-7 w-7"
              onClick={() => dispatch(addToCart(food))}
            />
          </p>
        </div>
        <Divider width={"90%"} marginBottom={"3%"} />
        <div
          onClick={onClose}
          className={`h-[3rem] w-[90%] flex justify-center items-center relative top-[2rem] ${
            foodsTotalPrice() === 0
              ? "text-neutral-500 bg-neutral-200"
              : "bg-black shadow-2xl text-white cursor-pointer"
          } text-lg font-semibold`}
        >
          <p> Add for £{foodsTotalPrice().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodSmallScreen;
