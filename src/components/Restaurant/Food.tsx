import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { Meal } from "../../features/Recipe";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import useScreenSize from "../../features/useScreenSize";
import FoodLargeScreen from "./FoodLargeScreen";
import FoodSmallScreen from "./FoodSmallScreen";

type FoodProps = {
  isOpen: boolean;
  onClose: () => void;
  poster_image: string;
  name: string;
  price: string;
  description: string;
  food: Meal;
  _id: string;
  quantity: number;
};

const Food = ({
  isOpen,
  onClose,
  poster_image,
  name,
  price,
  description,
  food,
  _id,
}: FoodProps) => {
  // foods that are in the basket
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);
  // the actual quantity of the selected
  const foodsActualQuantity =
    foodsInTheBasket.find((foods) => foods._id === _id) === undefined
      ? 0
      : foodsInTheBasket.find((foods) => foods._id === _id)?.quantity;
  // the total price of the selected food
  const foodsTotalPrice = () =>
    foodsInTheBasket.reduce(
      (total: number, item: Meal) =>
        (total += Number.parseFloat(item.price!) * item.quantity),
      0
    );

  const screenSize = useScreenSize();

  const handleScreenSize = () => {
    if (screenSize.width < 1023) return "full";
    if (screenSize.width >= 1024 && screenSize.width < 1280) return "4xl";
    if (screenSize.width > 1280) return "5xl";
  };

  return (
    <Modal
      size={handleScreenSize()}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody padding={0}>
          {screenSize.width >= 1024 ? (
            <FoodSmallScreen
              description={description}
              food={food}
              foodsActualQuantity={foodsActualQuantity}
              foodsTotalPrice={foodsTotalPrice}
              name={name}
              onClose={onClose}
              poster_image={poster_image}
              price={price}
            />
          ) : (
            <FoodLargeScreen
              description={description}
              food={food}
              foodsActualQuantity={foodsActualQuantity}
              foodsTotalPrice={foodsTotalPrice}
              name={name}
              onClose={onClose}
              poster_image={poster_image}
              price={price}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Food;
