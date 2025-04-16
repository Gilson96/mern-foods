import {
  useDisclosure,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Meal, useGetRestaurantsQuery } from "../../features/Recipe";
import { useState } from "react";
import ShoppingCartRestaurantModal from "./ShoppingCartRestaurantModal";
import Checkout from "../Checkout/Checkout";
import { addToCart, removeFromCart } from "../../features/cartSlice";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

type ShoppingCartRestaurantProps = {
  screenSize?: string;
  postcode: string
  login: string
};

const ShoppingCartRestaurant = ({
  screenSize,
  login,
  postcode
}: ShoppingCartRestaurantProps) => {
  const [selectedFood, setSelectedFood] = useState<Meal[]>();
  const dispatch = useDispatch();
  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();

  // All restaurants
  const { data: restaurants, isLoading } = useGetRestaurantsQuery();

  // foods in the store
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);

  // the actual quantity of the selected
  const foodsActualQuantity = (food_id: string) =>
    foodsInTheBasket.find((foods) => foods._id === food_id)?.quantity;

  // the total price of the selected food
  const foodsTotalPrice = () =>
    foodsInTheBasket?.reduce(
      (total: number, item: Meal | undefined) =>
        (total +=
          Number.parseFloat(item!.price) * foodsActualQuantity(item!._id)!),
      0
    );

  // finds relevant restaurant
  const findRestaurant = () => {
    const restaurant: Meal[] = [];

    for (let index = 0; index < foodsInTheBasket.length; index++) {
      // get restaurant id from the basket
      const restaurants_id = foodsInTheBasket[index].restaurant;
      // check if restaurant array is empty
      // if true, push first restaurant found
      if (restaurant.length <= 0) {
        restaurant.push({
          ...restaurants!.find((res) => res._id === restaurants_id)!,
          quantity: 0,
        });
      }
      // check if inside restaurant array
      // has duplicate restaurant id
      // if false, add a new one
      // if true, increment quantity
      if (!restaurant.some((res) => res._id === restaurants_id)) {
        restaurant.push({
          ...restaurants!.find((res) => res._id === restaurants_id)!,
          quantity: 1,
        });
      } else {
        const increment = restaurant?.find((res) => res._id === restaurants_id);
        increment!.quantity++;
      }
    }
    return restaurant;
  };

  if (!restaurants) return <p>...</p>;
  if (isLoading) return <p>...</p>;

  return (
    <>
      <div className="flex flex-col items-start w-full gap-3 pb-[5%] tablet:gap-0">
        {findRestaurant().map((foods, index) => {
          // gets selected food
          const selectedFoods = foodsInTheBasket.filter(
            (food) => food.restaurant === foods._id
          );

          return (
            <>
              <Divider
                width={screenSize === "small" ? "120%" : ""}
                position={"relative"}
                right={"1.5rem"}
              />
              {screenSize === "small" ? (
                <div
                  onClick={() => {
                    onOpen();
                    setSelectedFood([...selectedFoods]);
                  }}
                  key={index}
                  className="flex w-full h-full justify-between items-center py-1 gap-2"
                >
                  <Avatar name="R" src={foods.logo_image} size={"md"} />

                  <p className="font-semibold truncate w-[50%]">{foods.name}</p>

                  <div className="flex items-center gap-2">
                    <p className="h-5 w-5 flex justify-center items-center p-3 rounded-full bg-black text-white">
                      {foods.quantity}
                    </p>
                    <ChevronRightIcon className="h-5 w-5 text-neutral-400" />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <Accordion allowToggle>
                    <AccordionItem
                      width={"112%"}
                      position={"relative"}
                      right={"1.5rem"}
                      overflowX={'hidden'}
                    >
                      <h2>
                        <AccordionButton _expanded={{ bg: "white" }}> 
                          <div className='flex justify-between items-center w-full'>
                          <Avatar src={foods.logo_image} size={"lg"} />
                            <p className="font-semibold"> {foods.name} </p>
                          <AccordionIcon />
                          </div>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <div className="flex flex-col gap-2 overflow-x-hidden">
                          {selectedFoods.map((food: Meal) => (
                            <div className="flex items-center justify-between px-[1%] overflow-x-hidden">
                              <Avatar src={food.poster_image} size={"lg"} />
                              <div className="flex flex-col items-start justify-start w-full pl-[5%]">
                                <p className="font-semibold">
                                  {food.name}
                                </p>
                                <p className="text-neutral-500 font-semibold">
                                  £{Number(food.price).toFixed(2)}
                                </p>
                              </div>
                              <div className="flex flex-col items-end">
                                <p className="flex items-center gap-1">
                                  <MinusCircleIcon
                                    className="h-5 w-5 cursor-pointer"
                                    onClick={() =>
                                      dispatch(removeFromCart(food))
                                    }
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
                                    foodsActualQuantity(food._id)! *
                                      Number(food.price)
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
              )}
            </>
          );
        })}
        <hr className="relative w-[120%] h-[1rem] right-6 pt-[15%]" />
      </div>

      <div className='fixed bottom-2 w-[90%] pr-2 medium-phone:w-[86%] tablet:w-[53%] small-laptop:w-[35%] medium-laptop:w-[25%] medium-laptop:bottom-5'>
        <Checkout findRestaurants={findRestaurant()} subtotal={foodsTotalPrice()} foodsActualQuantity={foodsActualQuantity} postcode={postcode} login={login}/>
        
      </div>

      <ShoppingCartRestaurantModal
        isOpen={isOpen}
        onClose={onClose}
        selectedFood={selectedFood}
        restaurants={restaurants}
        findRestaurants={findRestaurant}
        postcode={postcode}
        login={login}
        subtotal={foodsTotalPrice()}
      />
    </>
  );
};

export default ShoppingCartRestaurant;
