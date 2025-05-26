import { Meal, useGetCategoriesQuery } from "../../features/Recipe";
import { Divider, Circle } from "@chakra-ui/react";
import useScreenSize from "../../features/useScreenSize";
import { memo } from "react";

type CategoryListProps = {
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
};

const CategoriesInModal = memo(({
  setActiveCategory,
  onClose,
}: CategoryListProps) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const screenSize = useScreenSize();

  if (!categories) return <p></p>;
  if (isLoading) return <p>...</p>;

  return (
    <>
      {categories.map((category: Meal) => (
        <div
          className="h-full w-full flex flex-col p-[3%] cursor-pointer"
          onClick={() => {
            setActiveCategory(category._id);
            onClose();
          }}
        >
          <ul className="flex flex-col justify-center">
            <li className="flex h-[5rem] items-center gap-2 my-[2%] small-laptop:my-[5%] small-laptop:gap-5">
              <Circle size={screenSize.width > 768? '100px' : '60px'} bg='#e5e5e5'>
                <img
                  src={category.poster_image}
                  alt="None"
                />
              </Circle>
              <p className=" small-laptop:text-xl capitalize text-black">
                {category.name}
              </p>
            </li>
            <Divider />
          </ul>
        </div>
      ))}
    </>
  );
});

export default CategoriesInModal;
