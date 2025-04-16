import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Meal, useGetCategoriesQuery } from "../../features/Recipe";
import useScreenSize from "../../features/useScreenSize";

type CategoryListProps = {
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const Categories = ({ setActiveCategory }: CategoryListProps) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const screenSize = useScreenSize();

  if (!categories) return <p></p>;
  if (isLoading) return <p>...</p>;

  return (
    <>
      <Swiper
        slidesPerView={
          // small-phone
          (screenSize.width >= 320 && screenSize.width < 375 ? 3.7 : 0) ||
          // medium-phone
          (screenSize.width >= 375 && screenSize.width < 425 ? 4.4 : 0) ||
          // large-phone
          (screenSize.width >= 425 && screenSize.width < 768 ? 4.6 : 0) ||
          (screenSize.width >= 768 && screenSize.width < 1024 ? 4.9: 0)
        }
      >
        {categories.map((category: Meal) => {
          return (
            <SwiperSlide
              style={{
                height: 100 + "%",
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
              }}
            >
              <div
                className="flex flex-col justify-center items-center cursor-pointer tablet:pl-[25%] small-laptop:pt-[20%]"
                onClick={() => setActiveCategory(category._id)}
              >
                <div className="h-[5rem] w-[5rem] flex justify-center items-center">
                  <img
                    src={category.poster_image}
                    className="h-full w-full"
                    alt="None"
                  />
                </div>
                <p className="font-semibold relative bottom-[1rem] large-phone:pt-[2%] tablet:text-xl">
                  {category.name}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Categories;
