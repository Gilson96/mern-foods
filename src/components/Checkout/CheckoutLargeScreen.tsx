import {
  useToast,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import { Meal } from "../../features/Recipe";
import {
  PaymenyIntent,
  usePostPayementIntentMutation,
} from "../../features/auth";
import {
  CheckoutLargeScreenHeader,
  CheckoutLargeScreenSummary,
} from "./CheckoutLargeScreenHeader_and_Summary";
import { useState } from "react";

type CheckoutLargeScreenProps = {
  findRestaurants: Meal[];
  isOpen: boolean;
  onClose: () => void;
  foodsActualQuantity: (food_id: string) => number | undefined;
  login: string;
  postcode: string;
  totalPrice: number;
  foodsInTheBasket: Meal[];
  subTotal: number;
};

const CheckoutLargeScreen = ({
  findRestaurants,
  isOpen,
  onClose,
  foodsActualQuantity,
  login,
  postcode,
  totalPrice,
  foodsInTheBasket,
}: CheckoutLargeScreenProps) => {
   const [clientSecret, setClientSecret] = useState<PaymenyIntent>();
  const [payementIntent, { isLoading }] = usePostPayementIntentMutation();
  const toast = useToast();


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

 
  return (
    <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <CheckoutLargeScreenHeader onClose={onClose} />
        <ModalBody className="bg-neutral-200">
          <div className="w-full h-full flex justify-between items-center ">
            <div className="w-[50%] h-[30rem] flex flex-col justify-between bg-white shadow-xl rounded-xl p-[2%]">
              <p className="text-2xl place-self-center font-semibold">
                Checkout
              </p>

              <>
                <div className="flex flex-col gap-3">
                  <p className="text-2xl font-bold">Delivery details</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                      <ShoppingBagIcon className="h-7 w-7" />
                      <p className="font-medium">{postcode}</p>
                    </div>
                    <Divider />
                    <div className="flex gap-1 items-center">
                      <UserIcon className="h-7 w-7" />
                      <p className="font-medium capitalize">Tester</p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={handlePaymentIntent}
                  className={`h-[3rem] w-full bg-black text-white flex justify-center items-center rounded-lg place-self-center mt-[5%] cursor-pointer ${
                    isLoading && "animate-pulse bg-neutral-400"
                  }`}
                >
                  Place Order
                </div>
              </>
            </div>
            <CheckoutLargeScreenSummary
              findRestaurants={findRestaurants}
              foodsActualQuantity={foodsActualQuantity}
              foodsInTheBasket={foodsInTheBasket}
              clientSecret={clientSecret}
              login={login}
              onClose={onClose}
              postcode={postcode}
              totalPrice={totalPrice}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CheckoutLargeScreen;
