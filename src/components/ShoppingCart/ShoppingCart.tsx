import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ShoppingCartRestaurant from "./ShoppingCartRestaurant";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { ReactNode } from "react";

type ShoppingCartProps = {
  checkoutIconStyles: string | undefined;
  checkoutStyles: string | undefined;
  checkoutTitle: string | undefined;
  screenSize?: string
  children?: ReactNode
  postcode: string
  login: string
};

const ShoppingCart = ({
  checkoutStyles,
  checkoutTitle,
  checkoutIconStyles,
  screenSize,
  children,
  login,
  postcode
}: ShoppingCartProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <i onClick={onOpen} className={`${checkoutStyles}`}>
        {children}
        <ShoppingCartIcon className={checkoutIconStyles} />
        <p>{checkoutTitle}</p>
      </i>
      <Drawer
        placement={screenSize === "small" ? "bottom" : "right"}
        onClose={onClose}
        isOpen={isOpen}
        size={screenSize === "small" ? "xs" : "sm"}
      >
        <DrawerOverlay className="bg-black" />
        <DrawerContent className="bg-black rounded-t-2xl">
          <DrawerHeader className="flex justify-between items-center">
            <div></div>
            <p className="small-laptop:pl-[10%]">Cart</p>
            <XCircleIcon className="h-8 w-8 cursor-pointer" onClick={onClose} />
          </DrawerHeader>
          <DrawerBody className="">
            <ShoppingCartRestaurant screenSize={screenSize} login={login} postcode={postcode} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCart;
