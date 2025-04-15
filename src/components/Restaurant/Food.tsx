import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Divider,
} from "@chakra-ui/react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Meal } from "../../features/Recipe";
import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../features/cartSlice";
import useScreenSize from "../../features/useScreenSize";

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
  const dispatch = useDispatch();
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

  return (
    <Modal
      size={screenSize.width < 1024 ? "full" : "5xl"}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody padding={0}>
          {screenSize.width < 1024 ? (
            <>
              <div className="h-full w-full flex justify-between ">
                <img
                  style={{
                    height:
                      screenSize.width >= 768 && screenSize.width < 1024
                        ? 15 + "rem"
                        : 9 + "rem",
                    width: 100 + "%",
                  }}
                  src={poster_image}
                />
                <i className="bg-white h-10 w-10 absolute left-[16.7rem] text-neutral-600 cursor flex justify-center items-center rounded-full top-2 tablet:left-2">
                  <XMarkIcon className="text-black h-5 w-5" onClick={onClose} />
                </i>
              </div>

              <div className="h-full w-full p-[3%]">
                <div className="flex flex-col justify-start gap-1 mb-[5%] tablet:mb-[2%]">
                  <p className="text-2xl font-semibold">{name}</p>
                  <p className="text-neutral-500 text-xl font-bold">£{price}</p>
                </div>
                <p className="">{description}</p>
                <Divider className=" py-[2%] tablet:py-0" />

                <div className="h-[5rem] flex items-center gap-2 place-self-center">
                  <p className="text-xl">Quantity</p>
                  <button disabled={foodsActualQuantity === 0 ? true : false}>
                    <MinusCircleIcon
                      className={`h-7 w-7  ${
                        foodsActualQuantity === 0
                          ? "text-neutral-400"
                          : "text-black"
                      }`}
                      onClick={() => dispatch(removeFromCart(food))}
                    />
                  </button>
                  <p className="text-xl">{foodsActualQuantity}</p>
                  <PlusCircleIcon
                    className="h-7 w-7"
                    onClick={() => dispatch(addToCart(food))}
                  />
                </div>
                <div
                  onClick={onClose}
                  className={`fixed bottom-1 left-[2rem] h-[3rem] w-[80%] flex justify-center items-center ${
                    foodsTotalPrice() === 0
                      ? "text-neutral-500 bg-neutral-200"
                      : "bg-black shadow-2xl text-white"
                  } text-lg font-semibold place-self-center tablet:left-[5rem]`}
                >
                  <p> Add for £{foodsTotalPrice().toFixed(2)}</p>
                </div>
                <Divider className="py-[2%] tablet:hidden" />
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center">
              <img src={poster_image} className="w-[60%]" />
              <div className="w-[90%] pl-[2%]">
                <i className="bg-white h-10 w-10 absolute right-9 text-neutral-600 cursor flex justify-center items-center rounded-full top-2 shadow-xl cursor-pointer">
                  <XMarkIcon className="text-black h-5 w-5" onClick={onClose} />
                </i>
                <div>
                  <p className="text-xl font-bold">{name}</p>
                  <p className="text-neutral-500 font-bold text-xl">
                    £{Number(price).toFixed(2)}
                  </p>
                  <div className="mt-[5%]">
                    <p>{description}</p>
                  </div>
                </div>
                <Divider width={"90%"} paddingY={"1%"} />
                <div className="h-[5rem] flex items-center gap-2 justify-center">
                  <p className="text-xl">Quantity</p>
                  <p
                    className={`${
                      foodsActualQuantity === 0
                        ? "cursor-auto"
                        : "cursor-pointer"
                    }`}
                  >
                    <MinusCircleIcon
                      className={`h-7 w-7  ${
                        foodsActualQuantity === 0
                          ? "text-neutral-400"
                          : "text-black"
                      }`}
                      onClick={() => dispatch(removeFromCart(food))}
                    />
                  </p>
                  <p className="text-xl">{foodsActualQuantity}</p>
                  <p className="cursor-pointer">
                    <PlusCircleIcon
                      className="h-7 w-7"
                      onClick={() => dispatch(addToCart(food))}
                    />
                  </p>
                </div>
                <Divider width={"90%"} marginBottom={"3%"} />
                <div
                  onClick={onClose}
                  className={`h-[3rem] w-[90%] flex justify-center items-center relative top-[2rem] ${
                    foodsTotalPrice() === 0
                      ? "text-neutral-500 bg-neutral-200"
                      : "bg-black shadow-2xl text-white cursor-pointer"
                  } text-lg font-semibold`}
                >
                  <p> Add for £{foodsTotalPrice().toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Food;
