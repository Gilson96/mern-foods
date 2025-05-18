import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import StartingPageUser from "./StartingPageUser";
import StartingPageGuest from "./StartingPageGuest";

type StartingPageProps = {
  state: { login: string, postcode: string };
};

const StartingPage = () => {
  const [searchPostcode, setSearchPostcode] = useState<string>("");
  const navigate = useNavigate();
  const toast = useToast();

  // which login is, 'guest' or 'user'
  // state coming from <Link/>
  const { state }: StartingPageProps = useLocation();

  // Regex for searching uk valid postcodes
  const handleSearchPostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPostcode(e.target.value);
  };

  // regex for uk postcode
  const validPostcode = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/g;

  // testing regex
  const postcodeTest = searchPostcode.match(validPostcode);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postcodeTest) {
      navigate("/home", {
        state: { postcode: searchPostcode, login: state.login },
      });
    } else {
      toast({
        status: "error",
        title: "Error",
        description: "Error, probably wrong uk postcode",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (state.login === "user") {
      // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
      const timeoutId = setTimeout(() => {
        navigate("/home", {
          state: { login: state.login, postcode: state.postcode },
        });
      }, 3000);
      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  });

  return (
    <div className="h-screen">
      {state.login === "user" ? (
        <StartingPageUser />
      ) : (
        <StartingPageGuest
          handleSearchPostcode={handleSearchPostcode}
          handleSubmit={handleSubmit}
          searchPostcode={searchPostcode}
        />
      )}
    </div>
  );
};

export default StartingPage;
