/**
 * This is a React component that displays a list of events, with the ability to filter between
 * published and unpublished events, and a button to create a new event.
 * @returns The component `Published` is being returned.
 */
import { Box, Button, CardActions, Stack } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import PersonalNavBar from "@/components/personal/navbar";
import { getRoleFromLocalCookie } from "@/lib/auth";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#e43e45ff",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),

    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

const EventCard = ({ setrefresh, event }) => {
  const router = useRouter();
  const jwt = Cookies.get("jwt");
  return (
    <Card
      elevation={0}
      className=" relative bg-transparent cursor-pointer flex flex-col items-start w-fit max-h-fit"
      key={event.id}
    >
      {event.eventBanner?.url && (
        <CardMedia
          component="img"
          sx={{
            width: 250,
            height: 300,
          }}
          alt={event.eventName}
          image={event.eventBanner?.url}
        />
      )}
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          className="font-extrabold text-lightGray capitalize"
        >
          {event.eventName}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className="font-extrabold text-lightGray capitalize"
        >
          {event.location}
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          className="absolute py-2 text-center m-4 bg-slate-700 w-16 h-20  inset-0 z-10 font-extrabold text-lightGray capitalize"
        >
          {new Date(event.startDate).toLocaleDateString("en-fr", {
            day: "numeric",
            month: "short",
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/personal/${event.id}`}>
          <Button
            variant="text"
            className="bg-ctaprimary hover:bg-mikado text-platinum hover:text-dark capitalize px-6"
          >
            {event.publishedAt === null ? "Publier" : "Modifier"}
          </Button>
        </Link>
        <Button onClick={() => {
          axios.delete(`${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${event.id}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }).then(res => {
            setrefresh()
          })
        }}>
          supprimer
        </Button>
      </CardActions>
    </Card>
  );
};
function LabTabs({ one, two }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="xl:px-28 lg:px-36  px-6">
      <TabContext value={value}>
        <Box>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Publiés" value="1" />

            <StyledTab label="Non Publiés" value="2" />
            <Createbutton className="self-start" />
          </StyledTabs>
          <Box>
            <TabPanel value="1">{two}</TabPanel>
            <TabPanel value="2">{one}</TabPanel>
          </Box>
        </Box>
      </TabContext>
    </Box>
  );
}
const Createbutton = ({ ...props }) => {
  return (
    <Link href="/personal/create">
      <Button
        variant="inherit"
        sx={{
          border: "solid 1px white",
          borderRadius: "5px",
          color: "white",
          "&:hover": {
            bgcolor: "white",
            color: "black",
          },
        }}
        {...props}
      >
        Crée un événement
      </Button>
    </Link>
  );
};
const Published = () => {
  const [userRole, setUserRole] = useState();
  const [allevents, setallevents] = useState(null);
  const [user, setUser] = useState(null);
  const [refresh, setrefresh] = useState(false)
  const jwt = Cookies.get("jwt");
  const fetchUserRole = async () => {
    if (jwt)
      await axios
        .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate=*`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        })
        .then((response) => {

          setUserRole(response.data.role.type);
        })
        .catch((error) => console.error(error));
  };
  const fetchAllEvents = async () => {
    if (jwt) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate[events][populate]=*`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((data) => {
          setallevents(data.data.events);

        })
        .catch((error) => console.log(error));
    }

  }
  useEffect(() => {
    fetchAllEvents();
    fetchUserRole();
  }, [jwt, setrefresh]);

  return (
    <Box className="bg-gradient-to-b from-[#1b1b1b] via-gray-900 to-violet-900 min-h-screen pt-4">
      {userRole !== "organizer" ? (
        <Box className="flex flex-col items-center justify-center h-screen gap-4  text-white">
          <Typography>
            Si vous êtes un organisateur, vous pouvez vous connecter ou bien
            créer un compte.
          </Typography>
          <Stack className="space-x-8 flex flex-row items-center">
            <Link href="personal/login">
              <Button
                variant="text"
                className="bg-ctaprimary hover:bg-mikado text-platinum hover:text-dark"
              >
                Se Connecter
              </Button>
            </Link>
            <Link href="personal/signup">
              <Button
                variant="text"
                className="hover:bg-mikado outline outline-2 outline-mikado text-platinum hover:text-black"
              >
                S&apos;inscrire
              </Button>
            </Link>
          </Stack>
        </Box>
      ) : (
        <>
          <PersonalNavBar user={user} />
          {allevents?.length === 0 ? (
            <LabTabs />
          ) : (
            <Box
              component="main"
              sx={{ flexGrow: 1, paddingX: { lg: 18, md: 0 }, paddingY: 6 }}
            >
              <LabTabs
                one={
                  <Box className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 md:gap-4 overflow-hidden">
                    {allevents
                      ?.filter((e) => e.publishedAt === null)
                      .map((event) => (
                        <EventCard setrefresh={() => fetchAllEvents()} event={event} key={event.id} />
                      ))}
                  </Box>
                }
                two={
                  <Box className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 md:gap-4 overflow-hidden">
                    {allevents
                      ?.filter((e) => e.publishedAt !== null)
                      .map((event) => (
                        <EventCard setrefresh={() => fetchAllEvents()} event={event} key={event.id} />
                      ))}
                  </Box>
                }
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Published;
