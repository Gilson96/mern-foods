import { Spinner, Avatar, Divider } from "@chakra-ui/react"
import { Meal } from "../../features/Recipe"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { useDispatch} from "react-redux";
import { addToCart, removeFromCart } from "../../features/cartSlice";

type ShoppingCartRestaurantModalBody ={
    selectedFood: Meal[] | undefined
    restaurants: Meal[]
    foodsActualQuantity: (food_id: string) => number | undefined
}

const ShoppingCartRestaurantModalBody = ({selectedFood, restaurants, foodsActualQuantity}: ShoppingCartRestaurantModalBody) => {
    const dispatch = useDispatch();
  return (
    <div>
        {selectedFood === undefined ? (
            <Spinner />
          ) : (
            <>
              <p className="text-2xl font-bold pb-[10%]">
                {
                  restaurants!.find(
                    (res) => res._id === selectedFood[0].restaurant
                  )!.name
                }
              </p>

              {selectedFood.map((food, index) => (
                <div key={index} className="py-[2%]">
                  <div className="flex items-center gap-2 justify-between w-full my-[3%]">
                    <Avatar src={food.poster_image}></Avatar>

                    <div className="flex flex-col pl-[3%] w-[50%]">
                      <p className="text-sm truncate font-semibold">
                        {food.name}
                      </p>
                      <p className="text-sm text-neutral-500 font-semibold">
                        {"£" + Number.parseFloat(food.price).toFixed(2)}
                      </p>
                    </div>

                    <p className="flex items-center gap-1">
                      <MinusCircleIcon
                        className="h-5 w-5"
                        onClick={() => dispatch(removeFromCart(food))}
                      />
                      <span>{foodsActualQuantity(food._id)}</span>
                      <PlusCircleIcon
                        className="h-5 w-5"
                        onClick={() => dispatch(addToCart(food))}
                      />
                    </p>
                  </div>
                  <Divider
                    width={"130%"}
                    position={"relative"}
                    right={"2rem"}
                  />
                </div>
              ))}
            </>
          )}
    </div>
  )
}

export default ShoppingCartRestaurantModalBody