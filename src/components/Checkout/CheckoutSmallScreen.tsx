import {
  ModalBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import CheckoutModelFooter from "./CheckoutModelFooter";
import Accordion from "./Accordion";
import { Meal } from "../../features/Recipe";

type CheckoutSmallScreenProps = {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
  findRestaurants: Meal[];
  foodsActualQuantity: (food_id: string) => number | undefined;
  foodsInTheBasket: Meal[];
  subTotal: number;
  totalPrice: number;
  login: string;
  postcode: string;
};

const CheckoutSmallScreen = ({
  onClose,
  isOpen,
  findRestaurants,
  foodsActualQuantity,
  foodsInTheBasket,
  subTotal,
  totalPrice,
  login,
  postcode
}: CheckoutSmallScreenProps) => {

  return (
    <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="h-full w-full flex justify-between items-center">
          <XCircleIcon className="h-8 w-8" onClick={onClose} />
          <h1>Checkout</h1>
          <div></div>
        </ModalHeader>

        <ModalBody>
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
        </ModalBody>

        <CheckoutModelFooter
          subTotal={subTotal}
          onClose={onClose}
          totalPrice={totalPrice}
          login={login}
          postcode={postcode}
          foodsInTheBasket={foodsInTheBasket}
          findRestaurants={findRestaurants}
        />
      </ModalContent>
    </Modal>
  );
};

export default CheckoutSmallScreen;
