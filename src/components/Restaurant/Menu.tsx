import { Divider } from "@chakra-ui/react";
import { Meal, useGetRestaurantFoodsQuery } from "../../features/Recipe";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { MenuList } from "./MenuList";
import useScreenSize from "../../features/useScreenSize";
import MenuSkeleton from "./MenuSkeleton";

type MenuProps = {
  _id: string | undefined;
  postcode: string;
  login: string;
};

const Menu = ({ _id, postcode, login }: MenuProps) => {
  const {
    data: restaurantFoods,
    isLoading,
    isFetching,
  } = useGetRestaurantFoodsQuery(_id!);

  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);

  const screenSize = useScreenSize();

  return (
    <section className="h-full w-full small-laptop:pl-[4%]">
      <p className="text-xl font-bold pt-[5%] small-phone:px-[3%]">Menu</p>

      {!restaurantFoods || isLoading || isFetching ? (
        <div className=" small-laptop:grid small-laptop:grid-cols-2 small-laptop:w-full flex flex-col p-[3%] gap-5">
          <MenuSkeleton />
        </div>
      ) : (
        <div className="max-small-laptop:p-[3%] small-laptop:grid small-laptop:grid-cols-2 small-laptop:w-full">
          {restaurantFoods.foods.map((food: Meal, index) => (
            <>
              <MenuList
                key={index}
                name={food.name}
                price={parseFloat(food.price!).toFixed(2)}
                poster_image={food.poster_image}
                description={food.description}
                food={food}
                _id={food._id}
                quantity={food.quantity}
              />
              <div className="small-laptop:hidden">
                <Divider />
              </div>
            </>
          ))}
        </div>
      )}

      {/* Only show checkout */}
      {/* If has something inside */}
      {foodsInTheBasket.length <= 0 ? (
        ""
      ) : (
        <>
          <div className="w-full flex flex-col justify-center items-center fixed bottom-[1rem] cursor-pointer">
            <div className={`w-[50%] h-auto`}>
              <ShoppingCart
                checkoutStyles="h-auto w-[100%] flex justify-center gap-[3%] p-[6%] items-center border rounded-full bg-black shadow-2xl text-white text-lg   tablet:w-[40%] tablet:place-self-center tablet:p-[3%] small-laptop:w-[30%] small-laptop:p-[2%] small-laptop:place-self-center"
                checkoutTitle="Checkout"
                checkoutIconStyles="h-[1.5rem] w-[1.5rem]"
                screenSize={screenSize.width < 768 ? "small" : "large"}
                postcode={postcode}
                login={login}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Menu;
