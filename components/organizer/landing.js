/**
 * The function exports a React component for the landing page of an event ticketing website, which
 * includes a background image, a registration or login form, and a description of the website's
 * services.
 * @returns The Landing component is being returned.
 */

import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import login from "../../public/assets/login.jpg";
import Image from "next/image";
import { useUser } from "@/lib/authContext";
const Landing = ({ component }) => {
  const { user } = useUser();

  return (
    <Box className="bg-slate-800  h-full w-full flex flex-col-reverse sm:flex-row justify-between gap-8 bg-transparent md:relative">
      <Box className="flex-1 absolute sm:static">
        <Image
          src={login}
          className="w-full h-screen object-cover"
          alt="login picture"
        />
      </Box>
      <Box className="w-full sm:w-auto flex flex-col-reverse sm:flex-row justify-between md:gap-8 bg-transparent h-full relative sm:absolute z-10">
        <Stack className="backdrop-blur-xl w-full flex-1 justify-center items-center">
          {component}
        </Stack>

        <Stack className="text-lightGray self-center flex-1 p-4 sm:px-8 py-8 bg-black backdrop-blur-md sm:bg-transparent sm:backdrop-blur-0">
          <Typography
            variant="h4"
            className="text-center font-monument font-bold pb-6 sm:pb-24"
          >
            Sell your event better, faster, stronger.
          </Typography>
          <Typography
            className="text-center lg:text-2xl text-sm font-bold px-4 space-y-8 "
            component="div"
            variant="body1"
          >
            <h1>
              Nous facilitons la vente de billets et le développement de vos
              communautés, afin que vous puissiez vous concentrer sur la
              création d&apos;évènements exceptionnels.
            </h1>
            <h1>
              Rejoignez-nous pour diffuser votre évènement auprès de notre
              communauté de plus de 1,5 million d&apos;utilisateurs enregistrés
              dans le monde entier, avec plus de 2 millions de visites par mois.
            </h1>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Landing;
