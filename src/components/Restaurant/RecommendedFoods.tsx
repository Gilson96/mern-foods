import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'
import { Meal } from "../../features/Recipe";
import { Link } from "react-router-dom";
import { Divider } from "@chakra-ui/react";

type RecommendedFoodsProps = {
    poster_image: string;
    name: string;
    price: string;
    recommendedFoods: () => Meal[]
}

const RecommendedFoods = ({ recommendedFoods, poster_image, name, price }: RecommendedFoodsProps) => {
    console.log(recommendedFoods.filter(food => food !== undefined))
    return (
        <>

            {recommendedFoods.filter((food: Meal) => food !== undefined).map((food: Meal) => (
                <>
                    <section className='h-[10rem] w-full flex justify-between items-center pb-[15%]'>
                        <div>
                            <p className='font-semibold'>{food.name}</p>
                            <p>£{price}</p>
                        </div>

                        <img
                            style={{
                                height: 6 + 'rem',
                                width: 8 + 'rem'
                            }}
                            src={food.poster_image}
                            className='rounded'
                        />
                    </section>
                    <Divider />
                </>
            ))}
        </>
    )
}

export default RecommendedFoods