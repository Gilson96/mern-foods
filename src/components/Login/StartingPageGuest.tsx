import { MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { PiHamburger } from "react-icons/pi";
import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";

type StartingPageGuestProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSearchPostcode: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchPostcode: string
};

const StartingPageGuest = ({ handleSubmit, handleSearchPostcode, searchPostcode }: StartingPageGuestProps) => {
  return (
    <>
      <nav className="h-[3rem] w-full flex justify-between items-center p-[3%] gap-2 shadow ">
        <div className="">
          <p className="flex items-center text-2xl">
            <PiHamburger className="w-[100%] h-[100%]" />
            <span>Mern-</span>
            <span className="font-bold">Foods</span>
          </p>
        </div>
        <div className="h-[2.5rem] w-[6rem] bg-white p-[1%] border rounded-full shadow flex justify-center items-center hover:bg-neutral-200 cursor-pointer">
          <Link to={"/"} className="text-black font-semibold">
            Log in
          </Link>
        </div>
      </nav>
      <div className="h-[90%] small-laptop:w-[40%] small-phone:w-[80%] place-content-center place-self-center flex flex-col gap-3">
        <p className="small-laptop:text-4xl tablet:text-3xl text-2xl">
          Order delivery near you
        </p>
        <form
          onSubmit={handleSubmit}
          className="tablet:flex-row w-full flex flex-col gap-2 "
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MapPinIcon className="w-5 h-5" />
            </InputLeftElement>
            <Input
              type="text"
              focusBorderColor="#d4d4d4"
              bg={"white"}
              w={"full"}
              shadow={"base"}
              placeholder="Delivery address"
              onChange={handleSearchPostcode}
              value={searchPostcode}
              minLength={5}
              maxLength={8}
            />
          </InputGroup>
          <Button
            shadow={"base"}
            type="submit"
            bg={"black"}
            color={"white"}
            _hover={{ bg: "#262626" }}
          >
            Find Food
          </Button>
        </form>
      </div>
    </>
  );
};

export default StartingPageGuest;
