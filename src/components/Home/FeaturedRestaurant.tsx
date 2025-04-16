import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Meal } from "../../features/Recipe";
import RestaurantList from "./RestaurantList";
import useScreenSize from "../../features/useScreenSize";

type FeaturedRestaurantListProps = {
  title: string;
  subTitle: string;
  featuredRestaurant: Meal[];
  postcode: string
  login: string
};

const FeaturedRestaurant = ({
  title,
  subTitle,
  featuredRestaurant,
  postcode,
  login
}: FeaturedRestaurantListProps) => {
  const screenSize = useScreenSize();

  const handleScreenSize = () => {
    if (screenSize.width < 375) return 1.7;
    if (screenSize.width >= 375 && screenSize.width < 425) return 1.7;
    if (screenSize.width >= 425 && screenSize.width < 768) return 2.1;
    if (screenSize.width >= 768 && screenSize.width < 1024) return 3.5;
    if (screenSize.width >= 1024 && screenSize.width < 1440) return 4;
    if (screenSize.width >= 1440 && screenSize.width < 2560) return 5;
  };

  return (
    <main className="my-[5%] small-laptop:my-[1%]">
      <div className="h-full w-full flex justify-between items-center">
        <div>
          {/* Title */}
          <p className="font-bold text-xl">{title}</p>
          <p className="w-[80%] text-sm text-neutral-500 large-phone:w-full">
            {subTitle}
          </p>
        </div>
      </div>

      <div className="mt-[2%] large-phone:mt-[4%] small-laptop:mt-[2%]">
        <Swiper slidesPerView={handleScreenSize()}>
          {featuredRestaurant.map((restaurant: Meal, index) => (
            <SwiperSlide>
              <RestaurantList
                key={index}
                name={restaurant.name}
                deliveryFee={restaurant.deliveryFee}
                poster_image={restaurant.poster_image}
                arrival={restaurant.arrival}
                rating={restaurant.rating}
                _id={restaurant._id}
                isCategoryActive={false}
                postcode={postcode}
                login={login}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};

export default FeaturedRestaurant;