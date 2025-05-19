import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../features/cartSlice";
import { persistor } from "../../store";
import { Meal } from "../../features/Recipe";
import { usePostToOrdersMutation } from "../../features/auth";

type StripeCheckoutFormProps = {
  onClose: () => void;
  login: string;
  postcode: string;
  foodsInTheBasket: Meal[];
  findRestaurants: Meal[];
  totalPrice: number;
};

const StripeCheckoutForm = ({
  onClose,
  login,
  postcode,
  foodsInTheBasket,
  totalPrice,
  findRestaurants,
}: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addToOrders, { isLoading }] = usePostToOrdersMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      console.log(result.error.message);
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{result.error.message}</AlertTitle>
      </Alert>;
    } else {
      for (let index = 0; index < findRestaurants.length; index++) {
        const newFoods = foodsInTheBasket.filter(
          (res) => res.restaurant === findRestaurants[index]._id
        );
        await addToOrders({
          _id: "682354e8b581ce293595eebe",
          body: {
            restaurantId: findRestaurants[index]._id,
            foods: newFoods,
            totalPrice: totalPrice,
            timeStamp: result.paymentIntent.created,
          },
        }).unwrap();
      }
      dispatch(emptyCart());
      persistor.purge();
      navigate("/home", {
        state: {
          result,
          login,
          postcode,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" />
      <Button
        mt={"3%"}
        colorScheme="blue"
        disabled={!stripe}
        type="submit"
        isLoading={isLoading && true}
        onClick={onClose}
      >
        Pay Now
      </Button>
    </form>
  );
};

export default StripeCheckoutForm;
