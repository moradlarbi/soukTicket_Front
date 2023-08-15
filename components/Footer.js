/**
 * The function exports a footer component with links to various pages, social media icons, and contact
 * information.
 * @returns A React functional component named "Footer" is being returned.
 */
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const aboutLinks = [
  { href: "/about", text: "why us?" },
  { href: "/events", text: "evenments" },
];
const citiesLinks = [
  { href: "https://en.wikipedia.org/wiki/Algiers", text: "Alger" },
  { href: "https://en.wikipedia.org/wiki/Oran", text: "Oran" },
  {
    href: "https://en.wikipedia.org/wiki/Sidi_Bel_Abb%C3%A8s",
    text: "Sidi Bel Abbès",
  },
];

const organizersLinks = [
  { href: "https://www.sierraclub.org/", text: "Sierra Club" },
  { href: "https://www.outdoors.org/", text: "Appalachian Mountain Club" },
  { href: "https://www.rei.com/adventures", text: "REI Co-op Adventures" },
  { href: "https://www.outwardbound.org/", text: "Outward Bound" },
  {
    href: "https://www.meetup.com/topics/hiking/",
    text: "Hiking Meetup Groups",
  },
  { href: "https://www.hikingproject.com/", text: "Hiking Project" },
  { href: "https://americanhiking.org/", text: "American Hiking Society" },
];

const socials = [
  {
    icon: <InstagramIcon sx={{ width: 40, height: 40 }} />,
    href: "https://www.instagram.com/soukticket/",
  },
  {
    icon: <FacebookIcon sx={{ width: 40, height: 40 }} />,
    href: "https://www.facebook.com/soukticket/",
  },
  {
    icon: <LinkedInIcon sx={{ width: 40, height: 40 }} />,
    href: "https://www.linkedin.com/soukticket/",
  },
];

const NavLinkGroup = ({ title, links }) => {
  return (
    <Box>
      <Link href="/" passHref>
        <Typography
          className="uppercase font-semibold md:text-lg text-sm"
          variant="subtitle1"
          sx={{ mr: 2 }}
        >
          {title}
        </Typography>
      </Link>
      <Stack>
        {links.map((link) => (
          <Link href={link.href} passHref key={link.href}>
            <Typography
              className="font-medium md:text-base text-xs capitalize hover:text-slate-800 text-slate-500"
              variant="subtitle1"
              sx={{ mr: 2 }}
            >
              {link.text}
            </Typography>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        paddingX: { lg: 30, md: 15 },
        paddingY: 4,
      }}
    >
      <Image
        src="/logo.png"
        alt="logo"
        width={100}
        height={32}
        className="lg:ml-14 m-auto"
      />
      <Box
        sx={{
          display: "flex",
          my: 4,
          gap: { md: 0, xs: 4 },
          flexWrap: { md: "nowrap", xs: "wrap" },
          flexDirection: { xs: "column", md: "row" },
          justifyItems: "center",
          justifyContent: { md: "space-around" },
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <div className="flex gap-3">
          <NavLinkGroup title="À PROPOS" links={aboutLinks} />
          <NavLinkGroup title="VILLES" links={citiesLinks} />
        </div>
        <Stack alignItems={{ md: "flex-end", xs: "center" }}>
          <Typography
            className="uppercase font-semibold md:text-lg text-sm"
            sx={{ mb: 2 }}
          >
            SUR LES RÉSEAUX
          </Typography>
          <Stack flexDirection="row" justifyContent="center">
            {socials.map((social) => (
              <Link
                className="hover:scale-105 scale-95"
                href={social.href}
                passHref
                key={social.href}
              >
                {social.icon}{" "}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Box>

      <Stack alignSelf="center" textAlign="center">
        <Typography variant="body2" className="font-bold" sx={{ mb: 2 }}>
          Contactez-nous : support@soukticket.com
        </Typography>

        <Typography variant="caption" className="font-medium">
          © Soukticket {currentYear}. Tous droits réservés.
        </Typography>
      </Stack>
    </Box>
  );
}
