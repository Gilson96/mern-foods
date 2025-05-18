import { useDisclosure, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Meal, useGetRestaurantsQuery } from "../../features/Recipe";
import { useState } from "react";
import ShoppingCartRestaurantModal from "./ShoppingCartRestaurantModal";
import Checkout from "../Checkout/Checkout";
import {
  ShoppingCartRestaurantLargeScreen,
  ShoppingCartRestaurantSmallScreen,
} from "./ShoppingCartRestaurantScreens";

type ShoppingCartRestaurantProps = {
  screenSize?: string;
  postcode: string;
  login: string;
};

const ShoppingCartRestaurant = ({
  screenSize,
  login,
  postcode,
}: ShoppingCartRestaurantProps) => {
  const [ , setSelectedFood] = useState<Meal[]>();

  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();

  // All restaurants
  const { data: restaurants, isLoading, isFetching } = useGetRestaurantsQuery();

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

  if (!restaurants || isLoading || isFetching)
    return (
      <div className="w-full h-full flex justify-center items-center">
        {" "}
        <Spinner />{" "}
      </div>
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
          ...restaurants.find((res) => res._id === restaurants_id)!,
          quantity: 0,
        });
      }
      // check if inside restaurant array
      // has duplicate restaurant id
      // if false, add a new one
      // if true, increment quantity
      if (!restaurant.some((res) => res._id === restaurants_id)) {
        restaurant.push({
          ...restaurants.find((res) => res._id === restaurants_id)!,
          quantity: 1,
        });
      } else {
        const increment = restaurant?.find((res) => res._id === restaurants_id);
        increment!.quantity++;
      }
    }
    return restaurant;
  };

  
  return (
    <>
      <div className="flex flex-col items-start w-full  pb-[5%] tablet:gap-0">
        {findRestaurant().map((foods, index) => {
          // gets selected food
          const selectedFoods = foodsInTheBasket.filter(
            (food) => food.restaurant === foods._id
          );

          console.log(selectedFoods)
          return (
            <>
             
              {screenSize === "small" ? (
                <>
                  <ShoppingCartRestaurantModal
                    isOpen={isOpen}
                    onClose={onClose}
                    selectedFood={selectedFoods}
                    restaurants={restaurants}
                    findRestaurants={findRestaurant}
                    foodsActualQuantity= {foodsActualQuantity}
                    postcode={postcode}
                    login={login}
                    subtotal={foodsTotalPrice()}
                  />
                  <ShoppingCartRestaurantSmallScreen
                    foods={foods}
                    index={index}
                    onOpen={onOpen}
                    selectedFoods={selectedFoods}
                    setSelectedFood={setSelectedFood}
                    foodsActualQuantity={foodsActualQuantity}
                  />
                </>
              ) : (
                <ShoppingCartRestaurantLargeScreen
                  foods={foods}
                  foodsActualQuantity={foodsActualQuantity}
                  selectedFoods={selectedFoods}
                  onOpen={() => undefined}
                  index={index}
                  setSelectedFood={() => {}}
                />
              )}
            </>
          );
        })}
      </div>
      <div className="max-tablet:mt-[20%]"></div>
      <div className="fixed bottom-2 w-[90%] pr-2 medium-phone:w-[86%] tablet:w-[53%] small-laptop:w-[35%] medium-laptop:w-[25%] medium-laptop:bottom-5">
        <Checkout
          findRestaurants={findRestaurant()}
          subtotal={foodsTotalPrice()}
          foodsActualQuantity={foodsActualQuantity}
          postcode={postcode}
          login={login}
        />
      </div>
    </>
  );
};

export default ShoppingCartRestaurant;
