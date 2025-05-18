import {
  Accordion as AccordionChackra,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
  Avatar,
} from "@chakra-ui/react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { Meal } from "../../features/Recipe";
import { removeFromCart, addToCart } from "../../features/cartSlice";
import useScreenSize from "../../features/useScreenSize";

type AccordionProps = {
  foodsActualQuantity: (food_id: string) => number | undefined;
  restaurant: Meal;
  selectedFoods: Meal[];
};

// Custom accordion
const Accordion = ({
  foodsActualQuantity,
  restaurant,
  selectedFoods,
}: AccordionProps) => {
  const dispatch = useDispatch();
  const screenSize = useScreenSize();

  // subtotal of each food in the checkout
  const subTotal = (food: Meal) => {
    return Number(
      Number.parseFloat(food.price) * foodsActualQuantity(food._id)!
    ).toFixed(2);
  };

  return (
    <AccordionChackra allowToggle>
      <AccordionItem>
        {/* Accordion Header */}
        <h2>
          <AccordionButton _expanded={{ bg: "white" }}>
            <Avatar
              src={restaurant.logo_image}
              size={screenSize.width < 768 ? "sm" : "lg"}
            />
            <Box as="span" flex="1" textAlign="center">
              <p className="small-laptop:font-medium font-semibold">
                {" "}
                {restaurant.name}{" "}
              </p>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>

        {/*Accordion Body  */}
        <AccordionPanel pb={4}>
          <div className="w-full">
            {/* gets restaurant related to foods in basket */}
            {selectedFoods.map((food: Meal, index) => (
              <div
                key={index}
                className="w-full h-full py-[2%] medium-phone:px-[3%]"
              >
                <hr className="h-full w-[120%] relative -top-[4px] right-[7%]" />
                <div className="flex items-center gap-2 justify-between w-full my-[3%]">
                  <Avatar
                    src={food.poster_image}
                    position={"relative"}
                    size={screenSize.width < 768 ? "sm" : "lg"}
                  />
                  <div className="flex pl-[3%] w-full justify-between items-center">
                    <div>
                      <p className="max-small-laptop:w-full text-sm truncate font-semibold">
                        {food.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {"£" + subTotal(food)}
                      </p>
                    </div>
                    <div className="flex max-small-laptop:flex-col max-small-laptop:items-end gap-1">
                      <div className="max-small-laptop:h-[5rem] flex items-center gap-2 justify-center r">
                        {/* decrease food quantity */}
                        <MinusCircleIcon
                          className={'h-5 w-5 cursor-pointer'}
                          onClick={() => dispatch(removeFromCart(food))}
                        />
                        {/* food quantity */}
                        <p className="text-sm font-semibold">
                          {foodsActualQuantity(food._id)}
                        </p>
                        {/* increase food quantity*/}
                        <p className="cursor-pointer">
                          <PlusCircleIcon
                            className="h-5 w-5 cursor-pointe"
                            onClick={() => dispatch(addToCart(food))}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </AccordionChackra>
  );
};

export default Accordion;
