/**
 * The Organizer function is a React component that renders a landing page for an event management
 * platform, with various sections showcasing the platform's features and a call-to-action button for
 * creating events.
 * @returns The component Organizer is being returned.
 */
import Layout from "@/components/Layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  SvgIcon,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import organizer from "../../public/assets/organizer3.svg";
import organizer2 from "../../public/assets/organizer2.png";
import loop from "../../public/assets/loop.png";
import organizer3 from "../../public/assets/organizer.jpg";
import hiking from "../../public/assets/hiking.jpg";
import Ra from "../../public/assets/ra.svg";
import Sparkle from "../../public/assets/sparkle.svg";
import NorthStar from "../../public/assets/northStar.svg";
import Image from "next/image";
import Wave from "@/components/Wave";
import Link from "next/link";
import { useScroll } from "@/hooks/useScroll";
import { motion } from "framer-motion";
import { photoAnim, reveal } from "@/utils";
import { useUser } from "@/lib/authContext";
import { getRoleFromLocalCookie } from "@/lib/auth";
export const cardsData = [
  {
    title: "Festivals",
    description: "Newcomers or established brands go from zero to sold out.",
    image: <Image alt="festivals" src={Ra} height={100} />,
  },
  {
    title: "Events",
    description:
      "Get a better understanding of your audience to make them come back.",
    image: <Image alt="events" src={Sparkle} height={100} />,
  },
  {
    title: "Collectives",
    description: "Build a strong brand from scratch and grow your community.",
    image: <Image alt="collectives pic" src={NorthStar} height={100} />,
  },
];
const Organizer = () => {
  const [element, controls] = useScroll();
  const { user } = useUser();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await getRoleFromLocalCookie();
        setUserRole(role.type);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchUserRole();
  }, []);
  return (
    <Layout user={user}>
      <Box className="bg-gradient-to-r from-[#1B1B1B] to-[#252525]  relative w-full overflow-x-hidden pt-24" >
        <Box className="z-10 bg-organizerBg flex blur-3xl absolute w-full">
          <Stack className="flex justify-between lg:flex-row flex-col self-center w-full">
            {/* <Image
              src={organizer2}
              alt="organizer"
              className="w-full sm:w-auto sm:max-h-screen"
            /> */}
            <Image
              src={organizer}
              alt="organizer2"
              className="self-start w-full sm:w-auto sm:max-h-screen sm:static md:absolute lg:static "
            />
          </Stack>
        </Box>

        <div className="z-20 absolute top-1/3 transform -translate-x-1/2 -translate-y-1/2 lg:block hidden">
          <Wave />
        </div>

        <Box className="z-40 flex flex-col-reverse lg:flex-row justify-center h-screen lg:justify-between lg:px-24 relative lg:w-[80%] lg:ml-52 items-center">
          <Stack
            display="flex"
            justifyContent="center"
            className="space-y-7 md:mx-24 my-24 mx-12 items-center"
          >
            <Typography
              variant="h2"
              className="text-[#f2f2f2] md:text-4xl text-3xl font-monument font-bold uppercase"
            >
              Sell YOUR EVENT better, faster, stronger.
            </Typography>

            <Button
              className="self-start mt-12 bg-black text-[#f2f2f2] hover:bg-[#f2f2f2] hover:text-black px-8 py-2 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              variant="contained"
            >
              <Link href={user ? "/personal/create" : "personal/login"}>
                Create Event
              </Link>
            </Button>
          </Stack>
          <motion.div variants={photoAnim} initial="hidden" animate="show">
            <Image
              src={hiking}
              alt="hiker on top of a"
              className="h-[700px] overflow-hidden w-[800px] object-cover lg:object-contain"
            />
          </motion.div>
        </Box>

        <Box className=" bg-organizerBg flex blur-3xl absolute w-full">
          <Stack className="flex justify-between lg:flex-row flex-col self-center w-full">
            <Image
              alt="to each his own alt"
              src={organizer}
              className="self-start w-full sm:w-auto sm:max-h-screen sm:static md:absolute lg:static "
            />
          </Stack>
        </Box>
        <motion.div
          variants={reveal}
          animate={controls}
          initial="hidden"
          ref={element}
          className="flex flex-col justify-center items-center relative lg:pb-36 "
        >
          <Image
            alt="to each his own alt"
            className="hidden lg:block invert absolute lg:inset-52"
            src={loop}
            width={100}
            height={100}
          />

          <Image
            alt="to each his own alt"
            src={organizer3}
            className="w-full h-[100px] object-cover"
          />

          <Stack paddingTop={30} className="justify-center px-4 lg:px-8 w-full">
            <Typography
              variant="h1"
              className="text-[#f2f2f2] lg:text-5xl md:text-4xl  text-3xl self-center text-center font-monument font-bold uppercase lg:w-1/2"
            >
              TAILORED FOR EVENT PRODUCERS OF ALL SIZES
            </Typography>

            <Typography variant="body1" className="text-jetlighter text-center">
              From small collectives to giant festivals, thousands of organizers
              are collaborating with Shotgun to manage their experience.
            </Typography>

            <Stack
              paddingTop={8}
              gap={8}
              className="lg:flex-row flex-col "
              justifyContent="center"
              alignItems="center"
            >
              {cardsData.map((card, index) => (
                <Card
                  className="bg-transparent text-[#f2f2f2] border-2 border-[#f2f2f2]"
                  key={index}
                  sx={{
                    width: 400,
                    height: 350,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <CardMedia
                    className="self-center invert pt-8"
                    component="div"
                    alt={card.title}
                  >
                    {card.image}
                  </CardMedia>

                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h5" className="font-monument">
                      {card.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="text-jetlighter px-12"
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <Button
              className="self-center mt-12 bg-ctaprimary text-[#f2f2f2]  px-8 py-2 rounded-lg hover:bg-[#f2f2f2] hover:text-black shadow-lg "
              variant="contained"
            >
              <Link
                href={
                  userRole === "organizer"
                    ? "/organizer/create"
                    : "/signup" ?? "/login"
                }
              >
                Create Event
              </Link>
            </Button>
          </Stack>
        </motion.div>
      </Box>
    </Layout>
  );
};

export default Organizer;
