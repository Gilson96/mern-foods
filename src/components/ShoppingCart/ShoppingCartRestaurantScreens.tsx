import {
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Meal } from "../../features/Recipe";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { addToCart, removeFromCart } from "../../features/cartSlice";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

type ShoppingCartRestaurantProps = {
  onOpen: () => void | undefined;
  setSelectedFood: (value: React.SetStateAction<Meal[] | undefined>) => void;
  selectedFoods: Meal[] | undefined;
  index: number | undefined;
  foods: Meal;
  foodsActualQuantity: (food_id: string) => number | undefined
};

export const ShoppingCartRestaurantSmallScreen = ({
  onOpen,
  setSelectedFood,
  selectedFoods,
  index,
  foods,
}: ShoppingCartRestaurantProps) => {
  return (
    <div
      onClick={() => {
        onOpen();
        setSelectedFood([...selectedFoods!]);
      }}
      key={index}
      className="flex w-full h-full justify-between items-center py-1 gap-2"
    >
      <Avatar name={foods.name} src={foods.logo_image} size={"md"} />

      <p className="font-semibold truncate w-[50%]">{foods.name}</p>

      <div className="flex items-center gap-2">
        <p className="h-5 w-5 flex justify-center items-center p-3 rounded-full bg-black text-white">
          {foods.quantity}
        </p>
        <ChevronRightIcon className="h-5 w-5 text-neutral-400" />
      </div>
    </div>
  );
};

export const ShoppingCartRestaurantLargeScreen = ({
  selectedFoods,
  foods,
  foodsActualQuantity
}: ShoppingCartRestaurantProps) => {
    const dispatch = useDispatch();
  return (
    <div className="w-full">
      <Accordion allowToggle>
        <AccordionItem
          width={"112%"}
          position={"relative"}
          right={"1.5rem"}
          overflowX={"hidden"}
        >
          <h2>
            <AccordionButton _expanded={{ bg: "white" }}>
              <div className="flex justify-between items-center w-full">
                <Avatar src={foods.logo_image} size={"lg"} />
                <p className="font-semibold"> {foods.name} </p>
                <AccordionIcon />
              </div>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <div className="flex flex-col gap-2 overflow-x-hidden">
              {selectedFoods?.map((food: Meal) => (
                <div className="flex items-center justify-between px-[1%] overflow-x-hidden">
                  <Avatar src={food.poster_image} size={"lg"} />
                  <div className="flex flex-col items-start justify-start w-full pl-[5%]">
                    <p className="font-semibold">{food.name}</p>
                    <p className="text-neutral-500 font-semibold">
                      £{Number(food.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="flex items-center gap-1">
                      <MinusCircleIcon
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => dispatch(removeFromCart(food))}
                      />
                      <span>{foodsActualQuantity(food._id)}</span>
                      <PlusCircleIcon
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => dispatch(addToCart(food))}
                      />
                    </p>
                    <p className="text-neutral-500 font-semibold pr-[6%]">
                      £
                      {Number(
                        foodsActualQuantity(food._id)! * Number(food.price)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
