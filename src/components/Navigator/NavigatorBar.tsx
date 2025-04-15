import ShoppingCart from "../ShoppingCart/ShoppingCart";
import NavigationSearch from "./NavigationSearch";
import NavigatorMenu from "./NavigatorMenu";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Avatar } from "@chakra-ui/react";

type NavigatorBarProps = {
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  login: string;
};

const NavigatorBar = ({ setActiveCategory, login }: NavigatorBarProps) => {
  // foods that are in the basket
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);

  console.log(login)

  return (
    <>
      <nav className="h-[3rem] w-full flex justify-between items-center small-laptop:h-[1px]">
        <div className="flex items-center gap-3">
          <NavigatorMenu login={login} />
          <Link
            to="/home"
            className="flex items-center"
            onClick={() => setActiveCategory("")}
          >
            <p className="text-lg font-semibold tablet:text-xl">Mern-</p>
            <span className="font-black tablet:text-xl tablet:pl-0.5">
              food
            </span>
          </Link>
        </div>

        <div className="max-small-laptop:hidden w-[70%]">
          <NavigationSearch />
        </div>   

          <ShoppingCart
            checkoutStyles={`${login === 'guest' && 'hidden'}`}
            checkoutTitle=""
            checkoutIconStyles="h-6 w-6 small-laptop:h-8 small-laptop:w-8"
          >
            <div
              className={`h-[5px] w-[5px] absolute p-[12px] bg-orange-400 rounded-full shadow-xl flex justify-center items-center right-[30px] top-[16px] ${foodsInTheBasket.length <= 0 && 'hidden'}`}
            >
              <p className="text-white font-bold">
                {foodsInTheBasket.length <= 0 ? "" : foodsInTheBasket.length}
              </p>
            </div>
          </ShoppingCart>

          {login === 'guest' ? 
            <div className="flex gap-2 items-center cursor-pointer">
              <Link to={'/'}>
              <Avatar size={'sm'}/>
              </Link>
              <Link to={'/signup'} >
                <p className="h-[2rem] w-full bg-black text-white flex justify-center items-center p-4 rounded-full text-sm">Sign Up</p>
              </Link>
            </div>
          : ''}
        
      </nav>
    </>
  );
};

export default NavigatorBar;
