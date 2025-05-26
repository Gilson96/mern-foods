import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import {
  BookmarkIcon,
  HeartIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useGetUserQuery } from "../../features/auth";
import { Link } from "react-router-dom";
import { memo } from "react";

type NavigatorMenuProps = {
  login: string;
  postcode: string;
};

const NavigatorMenu = memo(({ login, postcode }: NavigatorMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: user, isLoading } = useGetUserQuery();

  return (
    <>
      {!user || isLoading ? (
        <Bars3Icon className={`h-7 w-7 animate-pulse`} />
      ) : (
        <>
          <div onClick={onOpen} className="cursor-pointer">
            <Bars3Icon className={`h-7 w-7`} />
          </div>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader className="h-full w-full flex items-center justify-between">
                {login !== "guest" ? (
                  <>
                    <div className={`flex items-center gap-2`}>
                      <Avatar />
                      <div className="flex items-end gap-2">
                        <p>{user!.users[0].name}</p>
                        <div className="h-[1.5rem] w-full bg-neutral-200 text-black flex justify-center items-center text-sm rounded-full p-2">
                          {user!.users[0].address}
                        </div>
                      </div>
                    </div>
                    <XCircleIcon
                      onClick={onClose}
                      className="h-7 w-7 place-self-center cursor-pointer"
                    />
                  </>
                ) : (
                  <div className="flex flex-col w-full gap-2">
                    <XCircleIcon
                      onClick={onClose}
                      className="h-7 w-7 place-self-end cursor-pointer"
                    />
                    <Link to="/">
                      <div className="h-[3rem] w-full bg-black text-white flex justify-center items-center rounded-lg">
                        Login in
                      </div>
                    </Link>
                  </div>
                )}
              </DrawerHeader>

              <DrawerBody className="flex flex-col justify-between">
                <ul className="flex flex-col gap-2">
                  <div className={`${login === "guest" && "hidden"}`}>
                    <li className="flex items-center gap-2">
                      <BookmarkIcon className="h-7 w-7" />
                      <Link
                        to={"/userOrders"}
                        state={{ login: login, postcode: postcode }}
                      >
                        {" "}
                        <p className="font-semibold cursor-pointer hover:underline hover:decoration-black">
                          Orders
                        </p>
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <HeartIcon className="h-7 w-7" />
                      <Link
                        to={"/userFavourites"}
                        state={{ login: login, postcode: postcode }}
                      >
                        {" "}
                        <p className="font-semibold cursor-pointer hover:underline hover:decoration-black">
                          Favourites
                        </p>
                      </Link>
                    </li>
                  </div>
                </ul>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
});

export default NavigatorMenu;
