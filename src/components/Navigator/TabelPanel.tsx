import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel as TabPanelChackra,
} from "@chakra-ui/react";
import CategoriesInModal from "./CategoriesInModal";
import { Meal } from "../../features/Recipe";
import RestaurantInModal from "./RestaurantInModal";
import { memo } from "react";

type TabelPanelProps = {
  onClose: () => void;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  searchRestaurant: Meal[];
  restaurantsInArray: Meal[];
  postcode: string;
  login: string;
};

const TabelPanel = memo(
  ({
    onClose,
    setActiveCategory,
    searchRestaurant,
    restaurantsInArray,
    postcode,
    login,
  }: TabelPanelProps) => {
    return (
      <Tabs>
        <TabList>
          <Tab>Categories</Tab>
          <Tab>Restaurants</Tab>
        </TabList>

        <TabPanels>
          <TabPanelChackra p={0}>
            <div className="w-full">
              <CategoriesInModal
                onClose={onClose}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </TabPanelChackra>
          <TabPanelChackra>
            <div className="w-full">
              {searchRestaurant.length === 0 ? (
                <p>
                  {restaurantsInArray.map((restaurant) => (
                    <RestaurantInModal
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
                    <RestaurantInModal
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
          </TabPanelChackra>
        </TabPanels>
      </Tabs>
    );
  }
);

export default TabelPanel;
