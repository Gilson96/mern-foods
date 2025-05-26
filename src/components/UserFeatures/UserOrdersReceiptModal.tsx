import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Divider,
  Square,
} from "@chakra-ui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { FaCcStripe } from "react-icons/fa6";
import { Meal } from "../../features/Recipe";

type UserOrdersReceiptModalProps = {
  restaurant?: Meal;
  totalPrice: number;
  userFoods?: Meal[];
};

const UserOrdersReceiptModal = ({
  restaurant,
  totalPrice,
  userFoods,
}: UserOrdersReceiptModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div onClick={onOpen} className="flex items-center gap-1">
        <p className="underline-offset-2 underline cursor-pointer hover:text-neutral-500">
          View Receipt
        </p>
        <ChevronRightIcon className="h-4 w-4" />
      </div>

      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#e5e5e5"} className="small-laptop:bg-neutral-300">
          <ModalHeader w={"full"} bg={"white"}>
            <div className="w-full flex justify-between items-center">
              <p>
                <span className="font-normal">Mern-</span>
                <span className="font-bold">Foods</span>
              </p>
              <p onClick={onClose}>
                <XCircleIcon className="h-7 w-7 cursor-pointer" />
              </p>
            </div>
          </ModalHeader>
          <ModalBody className="small-laptop:w-[50%] small-laptop:place-self-center bg-white">
            <div className="flex flex-col gap-2">
              <p className="text-2xl pb-[5%]">Thank you for your order</p>
              <p className="text-2xl font-medium pt-[3%] pb-[5%]">
                {restaurant?.name}
              </p>
              <div className="flex justify-between items-center font-bold text-lg">
                <p className="">Total</p>
                <p>{"£ " + Number(totalPrice).toFixed(2)}</p>
              </div>
              <Divider />
              {userFoods?.map((food, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center my-[4%]"
                >
                  <div className="flex items-center gap-2">
                    <Square
                      size="7"
                      bg="#737373"
                      color="white"
                      py={"2%"}
                      px={"4%"}
                    >
                      {food.quantity}
                    </Square>
                    <p>{food.name}</p>
                  </div>
                  <p>{"£ " + Number(food.price).toFixed(2)}</p>
                </div>
              ))}
              <Divider />
              <div className="pb-[5%]">
                <p className="font-bold text-lg">Payement</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <i>
                      <FaCcStripe className="h-10 w-10" />
                    </i>
                    <p>Card Payment</p>
                  </div>
                  <p className="font-bold">
                    {"£ " + Number(totalPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserOrdersReceiptModal;
