import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { logOut } from "../../features/authSlice";
import { emptyCart } from "../../features/cartSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { persistor } from "../../store";
import { useLogoutMutation } from "../../features/auth";
import { memo } from "react";

type NavigatorLogInLogOutProps = {
  login: string;
  postcode: string;
};

const NavigatorLogInLogOut = memo(({ login }: NavigatorLogInLogOutProps) => {
  const toast = useToast();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      dispatch(emptyCart());
      persistor.purge();
      navigate("/");
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
    <Menu>
      <MenuButton>
        <Avatar size={"sm"} />
      </MenuButton>
      <MenuList
        minWidth={0}
        className="small-laptop:relative small-laptop:right-[60%]"
      >
        {login === "guest" ? (
          <>
            {" "}
            <MenuItem>
              <p onClick={handleLogout}>Log in</p>
            </MenuItem>{" "}
          </>
        ) : (
          <MenuItem>
            <p onClick={handleLogout}>Log Out</p>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
});

export default NavigatorLogInLogOut;
