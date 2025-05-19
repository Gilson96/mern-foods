import NavigatorBar from "../Navigator/NavigatorBar";
import { useGetUserQuery } from "../../features/auth";
import StartingPageUser from "../Login/StartingPageUser";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useGetRestaurantsQuery } from "../../features/Recipe";
import { Avatar, Divider } from "@chakra-ui/react";
import UserOrdersReceiptModal from "./UserOrdersReceiptModal";

type UserOrdersProps = {
  state: {
    postcode: string;
    login: string;
  };
};

const UserOrders = () => {
  const { state }: UserOrdersProps = useLocation();
  const { data: user, isLoading, isFetching, refetch } = useGetUserQuery();
  const { data: restaurants } = useGetRestaurantsQuery();
  const loading = isLoading || isFetching;

  useEffect(() => {
    refetch();
  }, [user]);

  if (!user && isLoading && isFetching) return <StartingPageUser />;

  const userOrders = user?.users[0].orders;

  const findRestaurant = () => {
    const restaurant = [];
    for (let index = 0; index < userOrders!.length; index++) {
      restaurant.push(
        restaurants?.find((res) => res._id === userOrders?.[index].restaurantId)
      );
    }
    return restaurant;
  };

  const orderDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const day = date.getDate();

    return day + " " + month + " " + year;
  };

  console.log(user);

  return (
    <div className="flex flex-col w-full h-full p-[3%]">
      <NavigatorBar
        login={state.login}
        postcode={state.postcode}
        setActiveCategory={() => ""}
      />
      <p className="small-laptop:py-[3rem] text-2xl font-semibold pb-[5%]">
        Past Orders
      </p>

      {findRestaurant().map((restaurant, index) => (
        <div className="tablet:text-base h-full w-full flex flex-col justify-center p-[2%] shadow bg-white items-center gap-3 text-sm">
          <div className="flex w-full justify-between items-center">
            <Avatar
              bg="black"
              src={
                loading
                  ? "https://bit.ly/broken-link"
                  : `${restaurant?.poster_image}`
              }
              size={"lg"}
              className={`${loading && 'animate-pulse'}`}
            />
            <div className="tablet:flex-row tablet:gap-3 flex flex-col justify-between">
              <p className={`${loading && 'h-[1.2rem] w-[9rem] bg-neutral-300 animate-pulse'}`}>{!loading && restaurant?.name}</p>
              <div className="flex gap-1 text-neutral-700">
                <p className={`${loading && 'h-[1.2rem] w-[9rem] bg-neutral-300 animate-pulse'}`}>{!loading && "£" + Number(userOrders?.[index]?.totalPrice).toFixed(2)}</p>
                <span className="text-neutral-500">&#183;</span>
                <p className={`${loading && 'h-[1.2rem] w-[9rem] bg-neutral-300 animate-pulse'}`}>{!loading && orderDate()}</p>
              </div>
            </div>
            <UserOrdersReceiptModal
              restaurant={restaurant!}
              totalPrice={Number(userOrders?.[index]?.totalPrice.toFixed(2))}
              userFoods={userOrders?.[index].foods}
            />
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
