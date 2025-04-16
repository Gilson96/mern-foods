import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Divider,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useGetRestaurantsQuery } from "../../features/Recipe";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import useScreenSize from "../../features/useScreenSize";
import CategoriesInModal from "../Home/CategoriesInModal";

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
            <ArrowLeftIcon onClick={onClose} className="h-5 w-5 cursor-pointer" />
            <input
              type="text"
              className="w-[87%] cursor-pointer"
              placeholder="Search a restaurant"
              onChange={handleSearchInput}
              value={inputValue}
            />
          </ModalHeader>
          <ModalBody className="w-full">
            <Tabs>
              <TabList>
                <Tab>Categories</Tab>
                <Tab>Restaurants</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0}>
                  <div className="flex flex-wrap tablet:gap-3 small-laptop:gap-5">
                  <CategoriesInModal onClose={onClose} setActiveCategory={setActiveCategory}/>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="w-full">
                    {searchRestaurant.length === 0 ? (
                      <p>
                        {restaurantsInArray.map((restaurant) => (
                          <Restaurant
                            name={restaurant.name}
                            logo_image={restaurant.logo_image}
                            _id={restaurant._id}
                            onClose={onClose}
                            postcode={postcode}
                            login={login}
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
                            postcode={postcode}
                            login={login}
                          />
                        ))}
                      </p>
                    )}
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
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
  onClose: () => void;
  postcode: string;
  login: string;
};

export const Restaurant = ({
  name,
  logo_image,
  _id,
  onClose,
  postcode,
  login,
}: RestaurantProps) => {
  const screenSize = useScreenSize();
  return (
    <Link
      to={`/restaurant/${_id}`}
      className="h-full w-full flex-col"
      state={{ postcode: postcode, login: login }}
      onClick={onClose}
    >
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
