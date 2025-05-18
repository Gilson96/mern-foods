import {
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Meal } from "../../features/Recipe";
import Checkout from "../Checkout/Checkout";
import ShoppingCartRestaurantModalBody from "./ShoppingCartRestaurantModalBody";

type ShoppingCartRestaurantModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedFood: Meal[] | undefined;
  restaurants: Meal[];
  findRestaurants: () => Meal[];
  postcode: string;
  login: string;
  subtotal: number;
  foodsActualQuantity: (food_id: string) => number | undefined
};

const ShoppingCartRestaurantModal = ({
  isOpen,
  onClose,
  selectedFood,
  restaurants,
  findRestaurants,
  postcode,
  login,
  subtotal,
  foodsActualQuantity
}: ShoppingCartRestaurantModalProps) => {
  
  // the total price of the selected food
  const foodsTotalPrice = () =>
    selectedFood?.reduce(
      (total: number, item: Meal) =>
        (total +=
          Number.parseFloat(item.price) * foodsActualQuantity(item._id)!),
      0
    );

  const sendRestaurantsToCheckout = findRestaurants();

  return (
    <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="h-full w-full items-center">
          <XCircleIcon className="h-8 w-8" onClick={onClose} />
        </ModalHeader>

        <ModalBody>
          <ShoppingCartRestaurantModalBody
            foodsActualQuantity={foodsActualQuantity}
            restaurants={restaurants}
            selectedFood={selectedFood}
          />
        </ModalBody>
        <Divider />
        <ModalFooter placeContent={"center"}>
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center py-[2%] text-lg">
              <p className="font-bold">Subtotal</p>
              <p>{"£" + foodsTotalPrice()?.toFixed(2)}</p>
            </div>
            <Checkout
              findRestaurants={sendRestaurantsToCheckout}
              postcode={postcode}
              login={login}
              foodsActualQuantity={foodsActualQuantity}
              subtotal={subtotal}
            />
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShoppingCartRestaurantModal;
