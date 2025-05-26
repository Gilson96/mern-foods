import { Avatar, Button, Divider, useToast } from "@chakra-ui/react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import { useLoginMutation } from "../../features/auth";
import { setCredentials } from "../../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    let { email, password } = userData;
    email = String(email);
    password = String(password);

    try {
      const userLogin = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userLogin, email }));
      email = "";
      password = "";
      navigate("/startingPage", {
        state: { postcode: "M1 1AN", login: "user" },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        status: "error",
        title: "Error",
        description: "Oh no, there was an error",
        isClosable: true,
      });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-black gap-2">
      <div className="flex flex-col items-center">
        <Avatar size="md" bgColor={"black"} />
        <p className="text-2xl">
          <span>Mern</span>
          <span className="font-bold">-Foods</span>
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="h-[20rem] w-[80%] flex flex-col bg-white rounded-xl p-[5%] gap-3 shadow-2xl large-phone:w-[60%] tablet:w-[40%] tablet:p-[2%] small-laptop:w-[30%] small-laptop:px-[2%] small-laptop:py-[1%] medium-laptop:w-[20%] large-laptop:w-[20%] large-laptop:px-[2%] large-laptop:py-[0.5%]"
      >
        <div className="flex flex-col">
          <div>
            <UserIcon className="h-5 w-5 relative top-[32px] left-2 text-neutral-400" />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="h-[2.9rem] w-full rounded focus:outline-none"
              style={{
                padding: 2 + "%" + 15 + "%",
                border: `${1}px solid #e5e5e5`,
              }}
            />
          </div>
          <div>
            <LockClosedIcon className="h-5 w-5 relative top-[32px] left-2 text-neutral-400" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              minLength={6}
              className="h-[2.9rem] w-full rounded focus:outline-none"
              style={{
                padding: 2 + "%" + 15 + "%",
                border: `${1}px solid #e5e5e5`,
              }}
            />
          </div>
        </div>
        <Button
          type="submit"
          bg={"black"}
          color={"white"}
          _hover={{ bg: "#262626" }}
          isLoading={isLoading ? true : false}
        >
          Login
        </Button>
        <div className="flex items-center">
          <Divider />
          <p className="px-[5%]">or</p>
          <Divider />
        </div>
        <Link to="/startingPage" state={{ login: "guest" }}>
          <Button w={"full"} type="submit" colorScheme="blackAlpha">
            Continue as a guest
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
