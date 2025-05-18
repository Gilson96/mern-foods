import { ModalFooter, Divider, useToast } from "@chakra-ui/react";
import {
  PaymenyIntent,
  usePostPayementIntentMutation,
} from "../../features/auth";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { Meal } from "../../features/Recipe";

const stripePromise = loadStripe(
  "pk_test_51RM9WqQc9p8NGwhTGXbjwQ5KMsekxrYc5yD1H0GK56gnIt36JQ7tVEcTh2meimwMIHPXTKkB9sRrGLtTBDCgNyNb00QhG8jYeZ"
);

type CheckoutModelFooterProps = {
  subTotal: number;
  totalPrice: number;
  onClose: () => void;
  login: string;
  postcode: string;
  foodsInTheBasket: Meal[];
  findRestaurants: Meal[];
};

const CheckoutModelFooter = ({
  subTotal,
  totalPrice,
  onClose,
  login,
  postcode,
  foodsInTheBasket,
  findRestaurants,
}: CheckoutModelFooterProps) => {
  const [payementIntent, { isLoading }] = usePostPayementIntentMutation();
  const toast = useToast();
  const [clientSecret, setClientSecret] = useState<PaymenyIntent>();

  const castString = String(totalPrice);
  const newTotalPrice = parseInt(castString);

  const handlePaymentIntent = async () => {
    try {
      const intent = await payementIntent({
        totalPrice: newTotalPrice + 20,
      }).unwrap();

      setClientSecret(intent);

      return intent;
    } catch {
      toast({
        title: "An error occurred",
        description: "We couldn't save your post, try again!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const options = {
    ...clientSecret,
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <ModalFooter>
      <div className="w-full h-full flex flex-col">
        {!clientSecret ? (
          <>
            <Divider width={"100%"} marginBottom={"2%"} />
            <div className="flex justify-between items-center py-[2%] text-neutral-500 text-lg">
              <p className="">Subtotal</p>
              <p>{"£" + subTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center py-[2%] text-neutral-500 text-lg">
              <p>Delivery Fee</p>
              <p>£2.50</p>
            </div>
            <div className="flex justify-between items-center py-[1%] font-bold text-lg">
              <p>Total</p>
              <p>{"£" + totalPrice.toFixed(2)}</p>
            </div>
            <div
              onClick={handlePaymentIntent}
              className={`h-[3rem] w-full bg-black text-white flex justify-center items-center rounded-lg place-self-center mt-[5%] ${
                isLoading && "animate-pulse bg-neutral-400"
              }`}
            >
              Place Order
            </div>
          </>
        ) : (
          <Elements stripe={stripePromise} options={options}>
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
    </ModalFooter>
  );
};

export default CheckoutModelFooter;
