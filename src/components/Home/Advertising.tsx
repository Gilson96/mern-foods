import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import useScreenSize from "../../features/useScreenSize";
import { Card, CardBody, Stack, Heading, Text } from "@chakra-ui/react";
// import required modules
import { Navigation } from "swiper/modules";

const Advertising = () => {
  const screenSize = useScreenSize();

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={
        // medium-phone
        (screenSize.width >= 375 && screenSize.width < 425 ? 4.4 : 0) ||
        // large-phone
        (screenSize.width >= 425 && screenSize.width < 768 ? 4.6 : 0) ||
        (screenSize.width >= 768 && screenSize.width < 1024 ? 5 : 0) ||
        (screenSize.width >= 1024 ? 3 : 0)
      }
    >
      <SwiperSlide className="pl-[5%]">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="h-[10rem] flex flex-col justify-center items-center"
        >
          <Stack>
            <CardBody>
              <Heading size="md">Advertise here</Heading>

              <Text py="2">Advertise here</Text>
            </CardBody>
          </Stack>
        </Card>
      </SwiperSlide>
      <SwiperSlide className="px-[3%]">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="h-[10rem] flex flex-col justify-center items-center"
          align='center'
        >
          <Stack>
            <CardBody>
              <Heading size="md">Advertise here</Heading>

              <Text py="2">Advertise here</Text>
            </CardBody>
          </Stack>
        </Card>
      </SwiperSlide>
      <SwiperSlide className="px-[3%]">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="h-[10rem] flex flex-col justify-center items-center"
          align='center'
        >
          <Stack>
            <CardBody>
              <Heading size="md">Advertise here</Heading>

              <Text py="2">Advertise here</Text>
            </CardBody>
          </Stack>
        </Card>
      </SwiperSlide>
      <SwiperSlide className="pr-[5%]">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="h-[10rem] flex flex-col justify-center items-center"
          align='center'
        >
          <Stack>
            <CardBody>
              <Heading size="md">Advertise here</Heading>
              <Text py="2">Advertise here</Text>
            </CardBody>
          </Stack>
        </Card>
      </SwiperSlide>
    </Swiper>
  );
};

export default Advertising;
