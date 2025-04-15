import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  useDisclosure,
  Avatar,
  Divider,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import {
  ArrowRightEndOnRectangleIcon,
  BookmarkIcon,
  HeartIcon,
  BuildingStorefrontIcon,
  XCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useGetUserQuery } from "../../features/auth";
import { Link } from "react-router-dom";

type NavigatorMenuProps = {
  login: string;
};

const NavigatorMenu = ({ login }: NavigatorMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: user, isLoading } = useGetUserQuery();

  // if (!user) return <p></p>;
  if (isLoading) return <Spinner />;

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer">
        <Bars3Icon className="h-7 w-7" />
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
                    <p>
                      {!user ? <Skeleton height="10" /> : user.users[0].name}
                    </p>
                    <div className="h-[1.5rem] w-full bg-neutral-200 text-black flex justify-center items-center text-sm rounded-full p-2">
                      {!user ? <Skeleton height="10" /> : user.users[0].address}
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
                <Link to="/signup">
                  <div className="h-[3rem] w-full bg-black text-white flex justify-center items-center rounded-lg">
                    Sign Up
                  </div>
                </Link>
                <Link to="/">
                  <div className="h-[3rem] w-full bg-neutral-400 text-white flex justify-center items-center rounded-lg">
                    Log in
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
                  <p className="font-bold">Orders</p>
                </li>
                <li className="flex items-center gap-2">
                  <HeartIcon className="h-7 w-7" />
                  <p className="font-bold">Favourites</p>
                </li>
              </div>
              <span className="my-[5%]">
                <Divider />
              </span>

              <li className="flex items-center gap-2">
                <BuildingStorefrontIcon className="h-7 w-7" />{" "}
                <p className="font-bold">Create a business account</p>
              </li>
              <li className="flex items-center gap-2">
                <PlusCircleIcon className="h-7 w-7" />
                <p className="font-bold">Add your restaurant</p>
              </li>
            </ul>

            <div>
              <Divider />
              <div className="h-[2.5rem] w-[8rem] flex justify-center items-center rounded-full bg-neutral-200 gap-2 mt-[2%]">
                <p className="font-bold">Sign Out</p>
                <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavigatorMenu;
