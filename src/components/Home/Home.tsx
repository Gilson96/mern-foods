import NavigationSearch from "../Navigator/NavigationSearch";
import { useGetRestaurantsQuery } from "../../features/Recipe";
import { useState } from "react";
import Categories from "./Categories";
import FeaturedRestaurant from "./FeaturedRestaurant";
import RestaurantList from "./RestaurantList";
import NavigatorBar from "../Navigator/NavigatorBar";
import Advertising from "./Advertising";
import { useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

type HomeProps = {
  state: { postcode: string; login: string };
};

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const { data: restaurants, isLoading } = useGetRestaurantsQuery();
  // which login is, 'guest' or 'user'
  // state coming from <Link/>
  const { state }: HomeProps = useLocation();


  if (!restaurants) return  <Spinner/>;
  if (isLoading) return <p>...</p>;

  // push objects coming from backend
  // to an array and destruct
  const restaurantsInArray = [];
  restaurantsInArray.push(...restaurants);

  // get the restaurants with higher rating
  const highestRatedRestaurant = restaurantsInArray.filter(
    (restaurant) => parseFloat(restaurant.rating) > 9.1
  );

  // get the restaurants with lowest delivery fee
  const lowCostFeeRestaurant = restaurantsInArray.filter(
    (restaurant) => parseFloat(restaurant.deliveryFee) < 2.1
  );

  // get the restaurants with the lowest arrival time
  const fastestRestaurant = restaurantsInArray.filter(
    (restaurant) => restaurant.arrival < 26
  );

  // get the restaurants by category
  const restaurantByCategory = restaurantsInArray.filter(
    (restaurant) => restaurant.category === activeCategory
  );

  return (
    <main className="h-full w-full flex flex-col p-[3%]">
      {/* Navigator */}
      <NavigatorBar setActiveCategory={setActiveCategory} login={state.login} />
      <div className="w-full h-full flex justify-end items-center pb-[2%] pl-[3%]">
        <p className="h-[2rem] bg-neutral-300 text-black flex justify-center items-center p-4 rounded-full gap-2 text-sm">Deliver to <span className="text-base font-medium">{state.postcode}</span></p>
      </div>
      <div className="large-phone:px-[8%] tablet:px-[5%] small-laptop:hidden">
        <NavigationSearch />
      </div>

      {/* categories list */}
      <section className={`${activeCategory && "hidden"}`}>
        <Categories setActiveCategory={setActiveCategory} />
        <hr className="w-[100%] relative right-1" />
      </section>

      {/* Advertisement */}
      <div
        className={`max-small-laptop:hidden ${
          activeCategory && "hidden"
        } py-[2%] px-[3%]`}
      >
        <Advertising />
      </div>

      {activeCategory === "" ? (
        <div className="small-laptop:px-[3%]">
          {/* Highest rated Restaurant list */}
          <FeaturedRestaurant
            title="Highest rated"
            subTitle="Top Rated and quality restaurant"
            featuredRestaurant={highestRatedRestaurant}
          />
          <hr className="w-full" />
          {/* Lowest delivery fee Restaurant list */}
          <FeaturedRestaurant
            title="Low Cost Fee"
            subTitle="Restaurants with the lowest delivery fee"
            featuredRestaurant={lowCostFeeRestaurant}
          />
          <hr className="w-full" />
          {/* Lowest arrival time Restaurant list */}
          <FeaturedRestaurant
            title="In a Rush?"
            subTitle="Restaurant with the quickest arrival time"
            featuredRestaurant={fastestRestaurant}
          />
        </div>
      ) : (
        // Restaurants selected via categories
        <div className="mt-[5%] px-[3%] large-phone:px-[10%] tablet:px-[6%] small-laptop:px-[4.5%]">
          <p className="font-bold text-xl">
            {restaurantByCategory.length} results
          </p>
          <div className="tablet:grid tablet:grid-cols-2 small-laptop:grid small-laptop:grid-cols-4 large-laptop:grid-cols-4 small-laptop:mt-[1%] gap-5">
            {restaurantByCategory.map((restaurant) => (
              <RestaurantList
                name={restaurant.name}
                deliveryFee={restaurant.deliveryFee}
                arrival={restaurant.arrival}
                rating={restaurant.rating}
                poster_image={restaurant.poster_image}
                category={undefined}
                isCategoryActive={true}
                _id={restaurant._id}
                logo_image={restaurant.logo_image}
                address={undefined}
                foods={[]}
                description=""
                price=""
                quantity={0}
                restaurant=""
                ratings_and_reviews={undefined}
                date={undefined}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
