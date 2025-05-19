import { ModalHeader } from "@chakra-ui/react";
import { ShoppingCartIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Meal } from "../../features/Recipe";
import Accordion from "./Accordion";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { PaymenyIntent } from "../../features/auth";

const stripePromise = loadStripe(
  "pk_test_51RM9WqQc9p8NGwhTGXbjwQ5KMsekxrYc5yD1H0GK56gnIt36JQ7tVEcTh2meimwMIHPXTKkB9sRrGLtTBDCgNyNb00QhG8jYeZ"
);

type CheckoutLargeScreenHeaderProps = {
  onClose: () => void;
};

export const CheckoutLargeScreenHeader = ({
  onClose,
}: CheckoutLargeScreenHeaderProps) => {
  return (
    <ModalHeader className="h-full w-full flex flex-row-reverse gap-[18%] items-center justify-between">
      <XCircleIcon
        className="h-8 w-8 text-black cursor-pointer"
        onClick={onClose}
      />
      <h1 className="">
        <span className="text-2xl font-normal">Mern</span>
        <span className="text-2xl font-bold">-Foods</span>
      </h1>
      <div></div>
    </ModalHeader>
  );
};

type CheckoutLargeScreenSummmaryProps = {
  findRestaurants: Meal[];
  foodsInTheBasket: Meal[];
  foodsActualQuantity: (food_id: string) => number | undefined;
  clientSecret: PaymenyIntent | undefined;
  onClose: () => void;
  login: string;
  postcode: string;
  totalPrice: number;
};

export const CheckoutLargeScreenSummary = ({
  findRestaurants,
  foodsInTheBasket,
  foodsActualQuantity,
  onClose,
  clientSecret,
  login,
  postcode,
  totalPrice,
}: CheckoutLargeScreenSummmaryProps) => {
  return (
    <div
      className={`${
        clientSecret ? "h-[30rem] p-[2%] overflow-auto" : "h-[30rem]"
      } w-[30%] flex flex-col bg-white shadow-xl rounded-xl`}
    >
      {!clientSecret ? (
        <>
          <div className="flex items-center  px-[3%] py-[4%] gap-2 place-self-center">
            <ShoppingCartIcon className="h-7 w-7" />
            <p className="font-bold text-lg">Cart Summary</p>
          </div>

          {findRestaurants?.map((restaurant) => {
            // gets restaurant related to foods in basket
            const selectedFoods = foodsInTheBasket.filter(
              (food) => food.restaurant === restaurant._id
            );

            return (
              <Accordion
                foodsActualQuantity={foodsActualQuantity}
                restaurant={restaurant}
                selectedFoods={selectedFoods}
              />
            );
          })}
        </>
      ) : (
        <Elements stripe={stripePromise} options={clientSecret}>
          <StripeCheckoutForm
            onClose={onClose}
            login={login}
            postcode={postcode}
            foodsInTheBasket={foodsInTheBasket}
            findRestaurants={findRestaurants}
            totalPrice={totalPrice}
          />
        </Elements>
      )}
    </div>
  );
};
