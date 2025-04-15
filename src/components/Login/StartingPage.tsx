import { useState } from "react";
import NavigatorMenu from "../Navigator/NavigatorMenu";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

type StartingPageProps = {
  state: string;
};

const StartingPage = () => {
  const [searchPostcode, setSearchPostcode] = useState<string>("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSearchPostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPostcode(e.target.value);
  };

  // which login is, 'guest' or 'user'
  // state coming from <Link/>
  const { state }: StartingPageProps = useLocation();

  // regex for uk postcode
  const validPostcode = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/g;

  // testing regex
  const postcodeTest = searchPostcode.match(validPostcode);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postcodeTest) {
      navigate("/home", { state: {postcode: searchPostcode, login: 'guest'} });
    } else {
      toast({
        status: "error",
        title: "Error",
        description: "Error, probably wrong uk postcode",
        isClosable: true,
      });
    }
  };

  return (
    <div className="">
      <nav className="h-full flex justify-between items-center p-[3%] gap-2 medium-laptop:h-[3rem] large-laptop:h-[1rem]">
        <div className="flex items-center gap-3 cursor-pointer">
          <NavigatorMenu login={state} />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[2.5rem] w-[5rem] bg-white p-[2%] border rounded-full shadow flex justify-center items-center hover:bg-neutral-200 cursor-pointer">
            <Link to={"/"} className="text-black font-semibold">
              Log in
            </Link>
          </div>
          <div className="h-[2.5rem] w-[5rem] bg-black p-[2%] border rounded-full shadow flex justify-center items-center text-white font-semibold hover:bg-neutral-700">
            <Link to={"/signup"}>Sign up</Link>
          </div>
        </div>
      </nav>
      <div className="h-[30rem] small-laptop:h-[527px] w-full bg-neutral-400 py-[3%] px-[4%] flex flex-col justify-center items-start gap-1 medium-phone:px-[6%] large-phone:h-[34rem] large-phone:px-[8%] tablet:h-[30rem] tablet:pb-[20%] tablet:px-[15%] medium-laptop:pt-[10%] large-laptop:h-[42rem]">
        <p className="text-2xl font-bold tablet:text-5xl medium-laptop:text-6xl large-laptop:text-6xl">Order delivery near you</p>
        <MapPinIcon className="h-5 w-5 relative top-9 left-3 tablet:h-7 tablet:w-7 tablet:top-13 small-laptop:top-13.5 medium-laptop:h-8 medium-laptop:w-8 medium-laptop:absolute  medium-laptop:left-[14rem] medium-laptop:top-[18.8rem] large-laptop:top-[23.5rem] large-laptop:left-[15rem]"/>
        <form className="w-full tablet:flex tablet:items-end tablet:gap-3" onSubmit={handleSubmit}>
          <div className="h-[3rem] w-full flex justify-start items-center bg-white pl-[15%] rounded-lg tablet:pl-[10%] small-laptop:w-[60%] medium-laptop:h-[4rem] medium-laptop:text-xl large-laptop:pl-[8%]">
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Enter delivery address"
              onChange={handleSearchPostcode}
              value={searchPostcode}
              minLength={5}
              maxLength={8}
            />
          </div>
          <div className="h-[3rem] w-full bg-black p-[2%] border rounded-lg shadow flex justify-center items-center mt-[2%] text-white font-semibold tablet:w-[40%] small-laptop:w-[30%] medium-laptop:h-[4rem] medium-laptop:w-[20%] hover:bg-neutral-800 cursor-pointer">
            <button type="submit" className="w-full">
              Find Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartingPage;
