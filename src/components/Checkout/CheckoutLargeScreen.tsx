import {
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
  Avatar,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Meal } from "../../features/Recipe";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { removeFromCart, addToCart } from "../../features/cartSlice";

type CheckoutLargeScreenProps = {
  findRestaurants: Meal[];
  isOpen: boolean;
  onClose: () => void;
};

const CheckoutLargeScreen = ({
  findRestaurants,
  isOpen,
  onClose,
}: CheckoutLargeScreenProps) => {
  // foods in the store
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);

  return (
    <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
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
        <ModalBody className="bg-neutral-200">
          <div className="w-full h-full flex justify-between items-center ">
            <div className="w-[50%] h-[30rem] flex flex-col justify-between bg-white shadow-xl rounded-xl p-[2%]">
              <p className="text-2xl place-self-center font-semibold">
                Checkout
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-2xl font-bold">Delivery details</p>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-center">
                    <ShoppingBagIcon className="h-7 w-7" />
                    <p className="font-medium">L5 3AD</p>
                  </div>
                  <Divider />
                  <div className="flex gap-1 items-center">
                    <UserIcon className="h-7 w-7" />
                    <p className="font-medium">Gilson de Almeida</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold">Delivery options</p>
                <Select placeholder="Select payment" width={"50%"}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </div>
              <div className="h-[3rem] w-full bg-black text-white flex justify-center items-center rounded-lg mt-[5%]">
                Place Order
              </div>
            </div>

            <div className="w-[30%] h-[30rem] flex flex-col bg-white shadow-xl rounded-xl overflow-auto">
              <div className="flex items-center px-[3%] py-[4%] gap-2 place-self-center">
                <ShoppingCartIcon className="h-7 w-7" />
                <p className="font-bold text-lg">Cart Summary</p>
              </div>
              {findRestaurants?.map((restaurant) => {
                // gets selected food
                const selectedFoods = foodsInTheBasket.filter(
                  (food) => food.restaurant === restaurant._id
                );

                return (
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton _expanded={{ bg: "white" }}>
                          <Avatar src={restaurant.logo_image} size={"lg"} />
                          <Box as="span" flex="1" textAlign="center">
                            <p className="font-medium"> {restaurant.name} </p>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <div className="w-full">
                          {selectedFoods.map((food, index) => (
                            <div key={index} className="w-full h-full py-[2%]">
                              <hr className="h-full w-[120%] relative -top-[4px] right-[7%]" />
                              <div className="flex items-center gap-2 justify-between w-full my-[3%]">
                                <Avatar
                                  src={food.poster_image}
                                  position={"relative"}
                                  size={"lg"}
                                />
                                <div className="flex pl-[3%] w-full justify-between items-end">
                                  <div>
                                    <p className="text-sm truncate font-semibold">
                                      {food.name}
                                    </p>
                                    <p className="text-sm text-neutral-500">
                                      {"£" +
                                        Number.parseFloat(food.price).toFixed(
                                          2
                                        )}
                                    </p>
                                  </div>
                                  <div className="flex gap-1">
                                    {/* <div className="h-[5rem] flex items-center gap-2 justify-center">
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
                                          onClick={() =>
                                            dispatch(removeFromCart(food))
                                          }
                                        />
                                      </p>
                                      <p className="text-xl">
                                        {foodsActualQuantity}
                                      </p>
                                      <p className="cursor-pointer">
                                        <PlusCircleIcon
                                          className="h-7 w-7"
                                          onClick={() =>
                                            dispatch(addToCart(food))
                                          }
                                        />
                                      </p>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CheckoutLargeScreen;
