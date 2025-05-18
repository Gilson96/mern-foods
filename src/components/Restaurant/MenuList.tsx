import { Meal } from "../../features/Recipe";
import useScreenSize from "../../features/useScreenSize";
import Food from "./Food";
import { useDisclosure } from "@chakra-ui/react";
import { Card, CardBody, Stack, Heading, Text, Image } from "@chakra-ui/react";

type MenuList = {
  name: string;
  price: string;
  poster_image: string;
  description: string;
  food: Meal;
  _id: string;
  quantity: number;
};

export const MenuList = ({
  name,
  price,
  poster_image,
  description,
  food,
  _id,
  quantity,
}: MenuList) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const screenSize = useScreenSize();

  return (
    <>
      {screenSize.width < 1024 ? (
        // small screen
        <section
          onClick={onOpen}
          className="h-[10rem] w-full flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-lg">{name}</p>
            <p>£{price}</p>
          </div>

          <img
            style={{
              height: screenSize.width >= 768 ? 8 + "rem" : 6 + 'rem',
              width: screenSize.width >= 768 ? 12 + "rem" : 8 + 'rem',
            }}
            src={poster_image}
            className="rounded"
          />

          <Food
            isOpen={isOpen}
            onClose={onClose}
            poster_image={poster_image}
            name={name}
            price={price}
            description={description}
            food={food}
            _id={_id}
            quantity={quantity}
          />
        </section>
      ) : (
        // big screen
        <section className="px-[6%] mt-[2%] pb-[3%]">
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            onClick={onOpen}
            cursor={"pointer"}
            display={"flex"}
            justifyContent={"space-between"}
            minH={'11rem'}
          >
            <Stack>
              <CardBody>
                <Heading size="md">{name}</Heading>
                <div className="flex flex-col">
                  <Text pt={'2%'} color={"text"}>
                    {description}
                  </Text>
                  <Text color={"#737373"} fontWeight={'bold'}>
                    £{price}
                  </Text>
                </div>
              </CardBody>
            </Stack>
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={poster_image}
              alt="Caffe Latte"
            />
            <Food
              isOpen={isOpen}
              onClose={onClose}
              poster_image={poster_image}
              name={name}
              price={price}
              description={description}
              food={food}
              _id={_id}
              quantity={quantity}
            />
          </Card>
        </section>
      )}
    </>
  );
};
