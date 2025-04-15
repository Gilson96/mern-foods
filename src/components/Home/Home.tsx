import NavigationSearch from "../Navigator/NavigationSearch";
import { useGetRestaurantsQuery } from "../../features/Recipe";
import { useState } from "react";
import Categories from "./Categories";
import FeaturedRestaurant from "./FeaturedRestaurant";
import RestaurantList from "./RestaurantList";
import NavigatorBar from "../Navigator/NavigatorBar";
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

  if (!restaurants) return <Spinner />;
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
      <NavigatorBar
        setActiveCategory={setActiveCategory}
        login={state.login}
        postcode={state.postcode}
      />
      <div className="w-full h-full flex justify-end items-center pb-[2%] pl-[3%] tablet:hidden">
        <p className="h-[2rem] bg-neutral-300 text-black flex justify-center items-center p-4 rounded-full gap-2 text-sm">
          Deliver to{" "}
          <span className="text-base font-medium">{state.postcode}</span>
        </p>
      </div>
      <div className="tablet:hidden">
        <NavigationSearch />
      </div>

      {/* categories list */}
      <section className={`${activeCategory && "hidden"} w-full`}>
        <div className="flex items-center justify-between">
          <Categories setActiveCategory={setActiveCategory} />
          <p className="h-[4rem] bg-white text-black flex flex-col justify-center items-center p-4 rounded-xl gap-2 text-sm tablet:w-[20%] max-tablet:hidden small-laptop:relative small-laptop:top-[1rem] small-laptop:h-[5rem] max-medium-laptop:hidden"></p>
            <p className="h-[4rem] bg-neutral-300 text-black flex flex-col justify-center items-center p-4 rounded-xl gap-2 text-sm tablet:w-[20%] max-tablet:hidden small-laptop:relative small-laptop:top-[1rem] small-laptop:h-[5rem]">
              <span>Deliver to</span>
              <span className="text-base font-medium">{state.postcode}</span>
            </p>
        </div>
        <hr className="w-[96%] relative left-[2rem]" />
      </section>

      {activeCategory === "" ? (
        <div className="small-laptop:pl-[3%]">
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
        <div className="mt-[5%] px-[3%] large-phone:px-[1%] tablet:px-[6%] small-laptop:p-0 small-laptop:pl-[4%] medium-laptop:p-0 medium-laptop:pl-[3%]">
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
                body={undefined}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
