import { Meal, useGetCategoriesQuery } from "../../features/Recipe";

type CategoryListProps = {
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
};

const CategoriesInModal = ({
  setActiveCategory,
  onClose,
}: CategoryListProps) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  if (!categories) return <p></p>;
  if (isLoading) return <p>...</p>;

  console.log(categories);
  return (
    <>
      {categories.map((category: Meal) => (
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            setActiveCategory(category._id);
            onClose();
          }}
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
      ))}
    </>
  );
};

export default CategoriesInModal;
