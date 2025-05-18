import { useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Meal } from "../../features/Recipe";
import useScreenSize from "../../features/useScreenSize";
import CheckoutLargeScreen from "./CheckoutLargeScreen";
import CheckoutSmallScreen from "./CheckoutSmallScreen";

type CheckoutProps = {
  findRestaurants: Meal[];
  subtotal: number;
  foodsActualQuantity: (food_id: string) => number | undefined;
  login: string;
  postcode: string;
};

// Checkout page in mobile view
const Checkout = ({
  findRestaurants,
  subtotal,
  foodsActualQuantity,
  login,
  postcode,
}: CheckoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const screenSize = useScreenSize();

  // foods in the store
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);

  // subtotal price
  const subTotal = foodsInTheBasket.reduce(
    (total: number, item: Meal) =>
      (total += Number.parseFloat(item.price) * item!.quantity),
    0
  );

  // total price with delivery fee
  const totalPrice = subTotal + 2.5;

  return (
    <>
      <div
        onClick={onOpen}
        className="h-[3rem] w-full bg-black text-white flex justify-center items-center rounded-lg place-self-center gap-2 cursor-pointer small-laptop:ml-[15%] medium-laptop:ml-[25%]"
      >
        <p> Go To Checkout</p>
        <p className="font-bold"> £{subtotal.toFixed(2)} </p>
      </div>

      {screenSize.width < 1024 ? (
        // checkout small screen
        <CheckoutSmallScreen
          findRestaurants={findRestaurants}
          foodsActualQuantity={foodsActualQuantity}
          foodsInTheBasket={foodsInTheBasket}
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          subTotal={subTotal}
          totalPrice={totalPrice}
          login={login}
          postcode={postcode}
        />
      ) : (
        // checkout large screen
        <CheckoutLargeScreen
          findRestaurants={findRestaurants}
          isOpen={isOpen}
          onClose={onClose}
          foodsActualQuantity={foodsActualQuantity}
          postcode={postcode}
          login={login}
          foodsInTheBasket={foodsInTheBasket}
          subTotal={subTotal}
         totalPrice={totalPrice} 
        />
      )}
    </>
  );
};

export default Checkout;
