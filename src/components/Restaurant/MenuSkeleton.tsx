import { Skeleton, SkeletonText } from "@chakra-ui/react";

const MenuSkeleton = () => {
  return (
    <>
      <div className="small-laptop:p-6 small-laptop:shadow small-laptop:bg-white flex justify-between items-center w-full">
        <div className=" tablet:w-[50%] flex flex-col w-[90%]">
          <SkeletonText
            mt="4"
            noOfLines={1}
            spacing="4"
            skeletonHeight="2"
            width={"70%"}
          />
          <SkeletonText
            mt="4"
            noOfLines={1}
            spacing="4"
            skeletonHeight="2"
            width={"50%"}
          />
        </div>
        <div className="tablet:w-[30%] w-full">
          <Skeleton height="8rem" />
        </div>
      </div>
      <div className="small-laptop:p-6 small-laptop:shadow small-laptop:bg-white flex justify-between items-center w-full">
        <div className="tablet:w-[50%] flex flex-col w-[90%]">
          <SkeletonText
            mt="4"
            noOfLines={1}
            spacing="4"
            skeletonHeight="2"
            width={"70%"}
          />
          <SkeletonText
            mt="4"
            noOfLines={1}
            spacing="4"
            skeletonHeight="2"
            width={"50%"}
          />
        </div>
        <div className="tablet:w-[30%] w-full">
          <Skeleton height="8rem" />
        </div>
      </div>
      <div className="small-laptop:p-6 small-laptop:shadow small-laptop:bg-white flex justify-between items-center w-full">
        <div className="tablet:w-[50%] flex flex-col w-[90%]">
          <SkeletonText
            mt="4"
            noOfLines={1}
            spacing="4"
            skeletonHeight="2"
            width={"70%"}
          />
          <SkeletonText
            mt="4"
            noOfLines={1}
            spacing="4"
            skeletonHeight="2"
            width={"50%"}
          />
        </div>
        <div className="tablet:w-[30%] w-full">
          <Skeleton height="8rem" />
        </div>
      </div>
    </>
  );
};

export default MenuSkeleton;
