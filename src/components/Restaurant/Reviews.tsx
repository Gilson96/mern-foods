import { StarIcon } from "@heroicons/react/24/outline";
import { Meal, useGetRestaurantReviewsQuery } from "../../features/Recipe";
import { Card, CardBody } from "@chakra-ui/react";
type ReviewsProps = {
  _id: string;
};

const Reviews = ({ _id }: ReviewsProps) => {
  const { data: reviews, isLoading } = useGetRestaurantReviewsQuery(_id!);

  if (!reviews) return <p></p>;
  if (isLoading) return <p>...</p>;

  console.log(reviews);
  return (
    <>
      <div className="px-[3%]">
        <p className="py-[2%] text-xl font-bold">Reviews</p>
        <div className="flex gap-2">
          {reviews.ratings_and_reviews.map((review: Meal) => (
            <Card>
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;

// date
// :
// "2025-01-30"
// description
// :
// "Authentic Neapolitan pizza! The Margherita is my favorite."
// name
// :
// "Oliver Harris"
// rating
// :
// "9.3"
// restaurant
// :
// "67a7754f1477075e9fd11e1c"
// _id
// :
// "67a7ae0bb1eb321d
