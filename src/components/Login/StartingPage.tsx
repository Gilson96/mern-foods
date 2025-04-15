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
      <nav className="h-full flex justify-between items-center p-[3%] gap-2">
        <div className="flex items-center gap-3">
          <NavigatorMenu login={state} />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[2.5rem] w-[5rem] bg-white p-[2%] border rounded-full shadow flex justify-center items-center">
            <Link to={"/"} className="text-black font-semibold">
              Log in
            </Link>
          </div>
          <div className="h-[2.5rem] w-[5rem] bg-black p-[2%] border rounded-full shadow flex justify-center items-center text-white font-semibold">
            <Link to={"/signup"}>Sign up</Link>
          </div>
        </div>
      </nav>
      <div className="h-[30rem] small-laptop:h-[527px] w-full bg-neutral-400 py-[3%] px-[4%] flex flex-col justify-center items-start gap-1 medium-phone:px-[6%] large-phone:h-[34rem] large-phone:px-[8%]">
        <p className="text-3xl font-bold">Order delivery near you</p>
        <MapPinIcon className="h-5 w-5 relative top-9 left-3" />
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="h-[3rem] w-full flex justify-start items-center bg-white pl-[15%] rounded-lg">
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
          <div className="h-[3rem] w-full bg-black p-[2%] border rounded-lg shadow flex justify-center items-center mt-[2%] text-white font-semibold">
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
