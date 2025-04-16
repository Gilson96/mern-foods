import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Meal } from "../../features/Recipe";
import useScreenSize from "../../features/useScreenSize";
import CheckoutLargeScreen from "./CheckoutLargeScreen";
import { removeFromCart, addToCart } from "../../features/cartSlice";

type CheckoutProps = {
  findRestaurants: Meal[];
  subtotal: number;
  foodsActualQuantity: (food_id: string) => number | undefined;
  login:string
  postcode: string
};

const Checkout = ({
  findRestaurants,
  subtotal,
  foodsActualQuantity,
  login,
  postcode
}: CheckoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const screenSize = useScreenSize();
  const dispatch = useDispatch()

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
        <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="h-full w-full flex justify-between items-center">
              <XCircleIcon
                className="h-8 w-8 "
                onClick={onClose}
              />
              <h1>Checkout</h1>
              <div></div>
            </ModalHeader>
            <ModalBody>
              {findRestaurants?.map((restaurant) => {
                // gets selected food
                const selectedFoods = foodsInTheBasket.filter(
                  (food) => food.restaurant === restaurant._id
                );

                return (
                  <Accordion allowToggle>
                    <AccordionItem
                      width={"120%"}
                      position={"relative"}
                      right={"1.5rem"}
                    >
                      <h2>
                        <AccordionButton _expanded={{ bg: "white" }}>
                          <Avatar src={restaurant.logo_image} size={"sm"} />
                          <Box as="span" flex="1" textAlign="center">
                            <p className="font-semibold"> {restaurant.name} </p>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <div className="w-full">
                          {selectedFoods.map((food, index) => (
                            <div key={index} className="w-full h-full py-[2%] medium-phone:px-[3%]">
                              <hr className="h-full w-[120%] relative -top-[4px] right-[7%]" />
                              <div className="flex items-center gap-2 justify-between w-full my-[3%]">
                                <Avatar
                                  src={food.poster_image}
                                  position={"relative"}
                                  right={"3%"}
                                ></Avatar>

                                <div className="flex pl-[3%] w-full justify-between items-center">
                                  <div>
                                    <p className="text-sm font-semibold w-[100%]">
                                      {food.name}
                                    </p>
                                    <p className="text-sm text-neutral-500">
                                      {"£" + Number(Number.parseFloat(food.price)*foodsActualQuantity(food._id)!).toFixed(2) }
                                    </p>
                                  </div>
                                  <div className="flex gap-1">
                                    <div className="h-[5rem] flex items-center gap-2 justify-center">
                                      <p
                                        className={`${
                                          foodsActualQuantity(
                                            restaurant._id
                                          ) === 0
                                            ? "cursor-auto"
                                            : "cursor-pointer"
                                        }`}
                                      >
                                        <MinusCircleIcon
                                          className={`h-5 w-5  ${
                                            foodsActualQuantity(
                                              restaurant._id
                                            ) === 0
                                              ? "text-neutral-400"
                                              : "text-black"
                                          }`}
                                          onClick={() =>
                                            dispatch(removeFromCart(food))
                                          }
                                        />
                                      </p>
                                      <p className="text-sm font-semibold">
                                        {foodsActualQuantity(food._id)}
                                      </p>
                                      <p className="cursor-pointer">
                                        <PlusCircleIcon
                                          className="h-5 w-5"
                                          onClick={() =>
                                            dispatch(addToCart(food))
                                          }
                                        />
                                      </p>
                                    </div>
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
            </ModalBody>

            <ModalFooter>
              <div className="w-full flex flex-col">
                <p className="font-bold text-xl pb-[3%]">Payment</p>
                <Select placeholder="Choose payment" marginBottom={"10%"}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <Divider
                  width={"120%"}
                  position={"relative"}
                  right={"1.5rem"}
                  marginBottom={"2%"}
                />
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
                  onClick={onOpen}
                  className="h-[3rem] w-full bg-black text-white flex justify-center items-center rounded-lg place-self-center mt-[5%]"
                >
                  Place Order
                </div>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <CheckoutLargeScreen
          findRestaurants={findRestaurants}
          isOpen={isOpen}
          onClose={onClose}
          foodsActualQuantity={foodsActualQuantity}
          postcode={postcode}
          login={login}
        />
      )}
    </>
  );
};

export default Checkout;
