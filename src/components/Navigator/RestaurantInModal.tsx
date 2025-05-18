import useScreenSize from "../../features/useScreenSize";
import { Divider, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type RestaurantProps = {
  name: string;
  logo_image: string;
  _id: string;
  onClose: () => void;
  postcode: string;
  login: string;
};

const RestaurantInModal = ({
  name,
  logo_image,
  _id,
  onClose,
  postcode,
  login,
}: RestaurantProps) => {

  const screenSize = useScreenSize();

  return (
    <Link
      to={`/restaurant/${_id}`}
      className="h-full w-full flex-col"
      state={{ postcode: postcode, login: login }}
      onClick={onClose}
    >
      <ul className="flex flex-col justify-center">
        <li className="flex h-[5rem]  items-center gap-2 my-[2%] small-laptop:my-[5%] small-laptop:gap-5">
          <Avatar
            src={logo_image}
            size={screenSize.width < 768 ? "md" : "xl"}
          />
          <p className=" small-laptop:text-xl">{name}</p>
        </li>
        <Divider/>
      </ul>
    </Link>
  );
};

export default RestaurantInModal;
