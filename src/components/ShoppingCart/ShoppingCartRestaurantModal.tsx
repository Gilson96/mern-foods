import {
    Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner, Avatar
} from '@chakra-ui/react'
import { MinusCircleIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { addToCart, removeFromCart } from '../../features/cartSlice'
import { Meal } from '../../features/Recipe'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import Checkout from '../Checkout/Checkout'

type ShoppingCartRestaurantModalProps = {
    isOpen: boolean
    onClose: () => void
    selectedFood: Meal[] | undefined
    restaurants: Meal
    findRestaurants: () => Meal[]
}

const ShoppingCartRestaurantModal = ({ isOpen, onClose, selectedFood, restaurants, findRestaurants }: ShoppingCartRestaurantModalProps) => {
    
    const dispatch = useDispatch()

    // foods in the store
    const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart)

    // the actual quantity of the selected
    const foodsActualQuantity = (food_id: string) => foodsInTheBasket.find(foods => foods._id === food_id)?.quantity

    // the total price of the selected food
    const foodsTotalPrice = () => selectedFood?.reduce((total: number, item: Meal) => total += Number.parseFloat(item.price) * foodsActualQuantity(item._id)!, 0)

    const sendRestaurantsToCheckout = findRestaurants()

    return (
        <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className='h-full w-full items-center'>
                    <XCircleIcon className='h-8 w-8' onClick={onClose} />
                </ModalHeader>

                <ModalBody>
                    {selectedFood === undefined ?
                        <Spinner />
                        :
                        <>
                            <p className='text-2xl font-bold pb-[10%]'>{restaurants.find(res => res._id === selectedFood[0].restaurant).name}</p>

                            {selectedFood.map((food, index) => (

                                <div key={index} className='py-[2%]'>

                                    <div className='flex items-center gap-2 justify-between w-full my-[3%]'>
                                        <Avatar src={food.poster_image}></Avatar>

                                        <div className='flex flex-col pl-[3%] w-[50%]'>
                                            <p className='text-sm truncate font-semibold'>{food.name}</p>
                                            <p className='text-sm text-neutral-500 font-semibold'>{'£' + (Number.parseFloat(food.price)).toFixed(2)}</p>
                                        </div>

                                        <p className='flex items-center gap-1'>
                                            <MinusCircleIcon className='h-5 w-5' onClick={() => dispatch(removeFromCart(food))} />
                                            <span>{foodsActualQuantity(food._id)}</span>
                                            <PlusCircleIcon className='h-5 w-5' onClick={() => dispatch(addToCart(food))} />
                                        </p>

                                    </div>
                                    <Divider width={'130%'} position={'relative'} right={'2rem'} />
                                </div>
                            ))}
                        </>
                    }
                </ModalBody>
                <Divider />
                <ModalFooter placeContent={'center'}>
                    <div className='flex flex-col w-full gap-2'>
                        <div className='flex justify-between items-center py-[2%] text-lg'>
                            <p className='font-bold'>Total</p>
                            <p>{'£' + foodsTotalPrice()?.toFixed(2)}</p>
                        </div>
                        <Checkout findRestaurants={sendRestaurantsToCheckout} />
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ShoppingCartRestaurantModal