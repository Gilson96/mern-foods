import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useGetRestaurantsQuery } from "../../features/Recipe";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useScreenSize from "../../features/useScreenSize";
import { Meal } from "../../features/Recipe";
import TabelPanel from "./TabelPanel";

type NavigationSearchProps = {
  postcode: string;
  login: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function NavigationSearch({
  postcode,
  login,
  setActiveCategory,
}: NavigationSearchProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: restaurants, isLoading, isFetching } = useGetRestaurantsQuery();
  const screenSize = useScreenSize();

  if (!restaurants || isLoading || isFetching)
    return (
      <div className="h-[3rem] w-full flex items-center p-[3%] gap-3 rounded-3xl bg-neutral-200 tablet:h-[2.5rem] cursor-pointer animate-pulse">
        <MagnifyingGlassIcon className="h-5 w-5 ml-2" />
        <p className="text-neutral-600 font-semibold"><Spinner/></p>
      </div>
    );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // push objects coming from backend
  // to an array and destruct
  const restaurantsInArray: Meal[] = [];
  restaurantsInArray.push(...restaurants);

  const searchRestaurant = restaurantsInArray.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      <div
        className="h-[3rem] w-full flex items-center p-[3%] gap-3 rounded-3xl bg-neutral-200 tablet:h-[2.5rem] cursor-pointer"
        onClick={onOpen}
      >
        <MagnifyingGlassIcon className="h-5 w-5 ml-2" />
        <p className="text-neutral-600 font-semibold">Search a restaurant</p>
      </div>
      <Modal
        size={screenSize.width < 1024 ? "full" : "lg"}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent className="h-full w-full flex flex-col">
          <ModalHeader className="h-[3rem] w-[90%] place-self-center flex justify-between items-center bg-neutral-200 rounded-full my-[5%]">
            <ArrowLeftIcon
              onClick={onClose}
              className="h-5 w-5 cursor-pointer"
            />
            <input
              type="text"
              className="w-[87%] cursor-pointer"
              placeholder="Search a restaurant"
              onChange={handleSearchInput}
              value={inputValue}
            />
          </ModalHeader>
          <ModalBody className="w-full">
            <TabelPanel
              login={login}
              postcode={postcode}
              onClose={onClose}
              restaurantsInArray={restaurantsInArray}
              searchRestaurant={searchRestaurant}
              setActiveCategory={setActiveCategory}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
