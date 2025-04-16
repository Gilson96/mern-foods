import ShoppingCart from "../ShoppingCart/ShoppingCart";
import NavigationSearch from "./NavigationSearch";
import NavigatorMenu from "./NavigatorMenu";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Avatar,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";

type NavigatorBarProps = {
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  login: string;
  postcode: string;
};

const NavigatorBar = ({
  setActiveCategory,
  login,
  postcode,
}: NavigatorBarProps) => {
  // foods that are in the basket
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);

  return (
    <>
      <nav className="h-[3rem] w-full flex justify-between items-center small-laptop:h-[1px] small-laptop:pr-[2.5%]">
        <div className="flex items-center gap-3">
          <NavigatorMenu login={login} />
          <Link
            to="/home"
            className="flex items-center"
            state={{ postcode: postcode, login: login }}
            onClick={() => setActiveCategory("")}
          >
            <p className="text-lg font-semibold tablet:text-xl">Mern-</p>
            <span className="font-black tablet:text-xl tablet:pl-0.5">
              food
            </span>
          </Link>
        </div>

        <div className="max-small-laptop:hidden small-laptop:bg-neutral-200 small-laptop:h-[2.5rem] small-laptop:flex small-laptop:justify-center small-laptop:items-center small-laptop:rounded-full small-laptop:p-[1%] small-laptop:gap-2">
          <span>Deliver to</span>
          <span className="text-base font-medium">{postcode}</span>
        </div>

        <div className="max-tablet:hidden w-[50%]">
          <NavigationSearch setActiveCategory={setActiveCategory} postcode={postcode} login={login} />
        </div>

        <div></div>
        <div></div>

        <div className="flex gap-2 items-center cursor-pointer">
          <Center w="35px" h="35px" color="black" rounded={"full"}>
            <ShoppingCart
              checkoutStyles=""
              checkoutTitle=""
              checkoutIconStyles="h-5 w-5 small-laptop:h-6 small-laptop:w-6"
              postcode={postcode}
              login={login}
            ></ShoppingCart>
            <p className="text-black font-bold">
              {foodsInTheBasket.length <= 0 ? "" : foodsInTheBasket.length}
            </p>
            </Center>
            <Menu>
              <MenuButton>
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList minWidth={0} width={"90px"}>
                <MenuItem>Sign up</MenuItem>
                <Divider />
                <MenuItem>Login</MenuItem>
              </MenuList>
            </Menu>
        </div>
      </nav>
    </>
  );
};

export default NavigatorBar;
