import { PiHamburger } from "react-icons/pi";
import { Progress } from "@chakra-ui/react";

const StartingPageUser = () => {
  return (
    <div className="h-screen w-screen flex flex-col  items-center gap-2 place-self-center place-content-center">
      <div className="flex gap-1 ">
        <PiHamburger className="w-[100%] h-[100%]" />
        <p className="flex small-laptop:text-4xl tablet:text-3xl text-2xl ">
          <span>Mern-</span>
          <span className="font-bold">Foods</span>
        </p>
      </div>
      <Progress
        className="tablet:w-[12%] w-[20%] rounded"
        colorScheme="green"
        size="xs"
        value={20}
        isIndeterminate
      />
    </div>
  );
};

export default StartingPageUser;
