import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { useGetRestaurantsQuery } from "../../features/Recipe";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import useScreenSize from "../../features/useScreenSize";

export default function NavigationSearch() {
  const [inputValue, setInputValue] = useState<string>("hello");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: restaurants, isLoading } = useGetRestaurantsQuery();
  const screenSize = useScreenSize();
  if (!restaurants) return <p></p>;
  if (isLoading) return <p>...</p>;

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // push objects coming from backend
  // to an array and destruct
  const restaurantsInArray = [];
  restaurantsInArray.push(...restaurants);

  const searchRestaurant = restaurantsInArray.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      <div
        className="h-[3rem] w-full flex items-center p-[3%] gap-3 rounded-3xl bg-neutral-200"
        onClick={onOpen}
      >
        <MagnifyingGlassIcon className="h-5 w-5 ml-2" />
        <p className="text-neutral-600 font-semibold">Search Uber Eats</p>
      </div>
      <Modal
        size={screenSize.width < 1024 ? "full" : "lg"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="h-full w-full flex flex-col">
          <ModalHeader className="h-[3rem] w-[90%] place-self-center flex justify-between items-center bg-neutral-200 rounded-full my-[5%] ">
            <ArrowLeftIcon onClick={onClose} className="h-5 w-5" />
            <input
              type="text"
              className="w-[87%]"
              placeholder="Search a restaurant"
              onChange={handleSearchInput}
              value={inputValue}
            />
          </ModalHeader>
          <ModalBody className="w-full overflow-y-auto">
            <p className="text-base font-bold pb-[2%] small-laptop:text-xl">
              Restaurants
            </p>
            <div className="w-full">
              {searchRestaurant.length === 0 ? (
                <p>
                  {restaurantsInArray.map((restaurant) => (
                    <Restaurant
                      name={restaurant.name}
                      logo_image={restaurant.logo_image}
                      _id={restaurant._id}
                      onClose={onClose}
                    />
                  ))}
                </p>
              ) : (
                <p>
                  {searchRestaurant.map((restaurant) => (
                    <Restaurant
                      name={restaurant.name}
                      logo_image={restaurant.logo_image}
                      _id={restaurant._id}
                      onClose={onClose}
                    />
                  ))}
                </p>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

type RestaurantProps = {
  name: string;
  logo_image: string;
  _id: string;
  onClose: () => void
};

export const Restaurant = ({ name, logo_image, _id, onClose }: RestaurantProps) => {
  const screenSize = useScreenSize();
  return (
    <Link to={`/restaurant/${_id}`} className="h-full w-full flex-col" onClick={onClose}>
      <ul className="flex flex-col justify-center ">
        <li className="flex items-center gap-2 my-[2%] small-laptop:my-[5%] small-laptop:gap-5">
          <Avatar
            src={logo_image}
            size={screenSize.width < 1024 ? "md" : "xl"}
          />
          <p className="font-semibold small-laptop:text-xl">{name}</p>
        </li>
        <Divider />
      </ul>
    </Link>
  );
};
