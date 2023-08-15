/**
 * The Hero function returns a component that displays a hero section with a background image, a title,
 * a description, and two buttons.
 * @returns The Hero component is being returned, which contains JSX elements including Typography,
 * Button, ButtonGroup, Stack, and Image components.
 */
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { motion, useTransform } from "framer-motion";
import Link from "next/link";
import { useScroll } from "@/hooks/useScroll";

const Hero = () => {
  const MotionTypography = motion(Typography);
  const ImageMotion = motion(Image);
  const scrollResult = useScroll();
  const element = scrollResult && scrollResult[0];
  const controls = scrollResult && scrollResult[1];

  return (
    <motion.div className="bg-gradient-to-r from-[#1B1B1B] to-[#252525]  relative w-full py-32 flex flex-col-reverse px-4 md:px-0 md:flex-row items-center justify-center gap-4 md:gap-16 z-0 h-screen">
      <ImageMotion
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 10,
          bounce: 1,
          // delay: 0.3,
        }}
        src="/assets/bokeh.png"
        width={100}
        height={100}
        className="w-1/2 absolute -z-10 right-32"
      // ref={element}
      />
      <div className="w-full md:w-1/2">
        <MotionTypography
          variant="h1"
          className="font-foggy text-4xl md:text-7xl leading-relaxed tracking-wider font-ultrabold uppercase text-platinum "
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20,
            bounce: 1,
            delay: 0.3,
          }}
        >
          L&apos;expérience événementielle ultime.
        </MotionTypography>
        <Typography
          variant="body1"
          className="text-lightGray font-extrabold md:text-base"
        >
          Boostez la promotion de vos évènements avec notre plateforme
          performante et intuitive. Essayez-la dès maintenant et vendez vos
          évènements mieux, plus rapidement et plus efficacement que jamais.
        </Typography>
        <Stack className="mt-8 space-x-8 flex flex-row items-center md:items-start md:justify-start justify-center">
          <Link href="/events">
            <Button
              className="transition ease-in-out delay-50 text-platinum outline-2 bg-ctaprimary hover:bg-platinum duration-300 hover:border-platinum hover:text-ctaprimary"
              variant="contained"
            >
              explorer
            </Button>
          </Link>
          <Button
            variant="outlined"
            className="text-platinum outline-2 border-gray-400 hover:text-ctaprimary hover:border-ctaprimary "
          >
            sur nous
          </Button>
        </Stack>
      </div>
      <div className="w-3/4 md:w-auto">
        <Image
          width={700}
          height={623}
          className="w-80 md:w-auto"
          src="/assets/hero.png"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
