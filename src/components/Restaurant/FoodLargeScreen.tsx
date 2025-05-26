import { Divider } from "@chakra-ui/react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { removeFromCart, addToCart } from "../../features/cartSlice";
import useScreenSize from "../../features/useScreenSize";
import { Meal } from "../../features/Recipe";
import { useDispatch } from "react-redux";
import { memo } from "react";

type FoodLargeScreenProps = {
  poster_image: string;
  onClose: () => void;
  name: string;
  price: string;
  description: string;
  foodsActualQuantity: number | undefined;
  food: Meal;
  foodsTotalPrice: () => number;
};

const FoodLargeScreen = memo(({
  poster_image,
  onClose,
  name,
  price,
  foodsActualQuantity,
  food,
  description,
  foodsTotalPrice,
}: FoodLargeScreenProps) => {
  const screenSize = useScreenSize();
  const dispatch = useDispatch();
  return (
    <>
      <div className="h-full w-full flex justify-between ">
        <img
          style={{
            height:
              screenSize.width >= 768 && screenSize.width < 1024
                ? 17 + "rem"
                : 13 + "rem",
            width: 100 + "%",
          }}
          src={poster_image}
        />
        <i className="bg-white h-10 w-10 absolute left-[16.7rem] text-neutral-600 cursor flex justify-center items-center rounded-full top-2 medium-phone:left-[20rem] large-phone:left-[24rem] tablet:left-[44rem] ">
          <XMarkIcon className="text-black h-5 w-5" onClick={onClose} />
        </i>
      </div>

      <div className="h-full w-full p-[3%] tablet:">
        <div className="flex flex-col justify-start gap-1 mb-[5%] tablet:flex-row tablet:justify-between tablet:items-center tablet:mb-[2%]">
          <div className="tablet:flex tablet:items-end tablet:gap-2">
            <p className="text-2xl font-semibold">{name}</p>
            <p className="text-neutral-500 tablet:bg-black tablet:px-3 tablet:text-white text-xl font-bold rounded-full place-items-end">
              £{price}
            </p>
          </div>
          <div className="h-[5rem] flex items-center gap-2 place-self-center max-tablet:hidden tablet:h-[3rem]">
            <p className="text-xl">Quantity</p>
            <button disabled={foodsActualQuantity === 0 ? true : false}>
              <MinusCircleIcon
                className={`h-7 w-7  ${
                  foodsActualQuantity === 0 ? "text-neutral-400" : "text-black"
                }`}
                onClick={() => dispatch(removeFromCart(food))}
              />
            </button>
            <p className="text-xl">{foodsActualQuantity}</p>
            <PlusCircleIcon
              className="h-7 w-7"
              onClick={() => dispatch(addToCart(food))}
            />
          </div>
        </div>
        <Divider className=" max-tablet:hidden" />
        <p className="tablet:hidden">{description}</p>
        <Divider className="py-[2%] tablet:hidden" />

        <div className="h-[7rem] flex items-center gap-2 place-self-center pb-[12%] tablet:hidden">
          <p className="text-xl">Quantity</p>
          <button disabled={foodsActualQuantity === 0 ? true : false}>
            <MinusCircleIcon
              className={`h-7 w-7  ${
                foodsActualQuantity === 0 ? "text-neutral-400" : "text-black"
              }`}
              onClick={() => dispatch(removeFromCart(food))}
            />
          </button>
          <p className="text-xl">{foodsActualQuantity}</p>
          <PlusCircleIcon
            className="h-7 w-7"
            onClick={() => dispatch(addToCart(food))}
          />
        </div>
        <div className="tablet:flex tablet:justify-between tablet:pt-[2%] ]">
          <p className="max-tablet:hidden tablet:w-[30%]">{description}</p>
          <div
            onClick={onClose}
            className={`fixed bottom-1 left-[2rem] h-[3rem] w-[80%] flex justify-center items-center ${
              foodsTotalPrice() === 0
                ? "text-neutral-500 bg-neutral-200"
                : "bg-black shadow-2xl text-white"
            } text-lg font-semibold place-self-center tablet:left-[5rem] tablet:static tablet:w-[30%]`}
          >
            <p> Add for £{foodsTotalPrice().toFixed(2)}</p>
          </div>
        </div>
       
      </div>
    </>
  );
});

export default FoodLargeScreen;
