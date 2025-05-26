import { StarIcon } from "@heroicons/react/24/solid";
import { Meal, useGetRestaurantReviewsQuery } from "../../features/Recipe";
import { Card, CardBody } from "@chakra-ui/react";

type ReviewsProps = {
  _id: string;
};

const Reviews = ({ _id }: ReviewsProps) => {
  const {
    data: reviews,
    isLoading,
    isFetching,
  } = useGetRestaurantReviewsQuery(_id!);

  const loading = !reviews || isLoading || isFetching;

  return (
    <>
      <div className="small-laptop:pl-[7%] small-laptop:pr-[3%] tablet:px-[3%] max-tablet:pb-[5%] px-[5%]  ">
        <p className="py-[2%] text-xl font-bold">Reviews</p>
        <div className="tablet:flex-row  flex flex-col gap-2">
          {loading ? (
            <Card>
              <CardBody>
                <div
                  className={`${loading && "h-[1rem] w-[15rem] bg-neutral-300"} pb-[5%]`}
                ></div>
                <div
                  className={`${loading && "h-[1rem] w-[15rem] bg-neutral-300"} pb-[5%]`}
                ></div>
                <div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                       <p className= {`${loading && "h-[1rem] w-[3rem] bg-neutral-300"} font-semibold`}></p> 
                      <StarIcon className="h-4 w-4" />
                    </div>
                    <span className="text-neutral-500">&#183;</span>
                    <p className={`${loading && "h-[1rem] w-[3rem] bg-neutral-300"} text-neutral-600`}></p>
                    <span className={`${loading && "h-[1rem] w-[3rem] bg-neutral-300"} text-neutral-500`}>&#183;</span>
                     <p className={`${loading && "h-[1rem] w-[3rem] bg-neutral-300"} text-neutral-600`}></p> 
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : (
            reviews.ratings_and_reviews?.map((review: Meal, index) => (
              <Card key={index}>
                <CardBody>
                  <div className="pb-[5%]">"{review.description}"</div>
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        <p className="font-semibold">{review.rating}</p>
                        <StarIcon className="h-4 w-4" />
                      </div>
                      <span className="text-neutral-500">&#183;</span>
                      <p className="text-neutral-600">{review.name}</p>
                      <span className="text-neutral-500">&#183;</span>
                      <p className="text-neutral-600">{review.date}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
