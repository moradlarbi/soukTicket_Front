/**
 * This is a Next.js page component that displays details of a personal event and allows the user to
 * publish or unpublish it.
 * @returns The code exports a React component called PersonalId, which displays information about a
 * specific event. It also includes functions to handle publishing and unpublishing the event. The
 * component receives event data as a prop and fetches the user's role from a cookie. The code also
 * includes two Next.js functions, getStaticProps and getStaticPaths, which are used for static site
 * generation and dynamic routing. get
 */
import { fetcher } from "@/lib/api";
import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import PersonalNavBar from "@/components/personal/navbar";
import Sidebar from "@/components/personal/sidebar";
import { getRoleFromLocalCookie } from "@/lib/auth";

const PersonalId = ({ event }) => {
  const [isPublished, setIsPublished] = React.useState(false); // initialize to true if event is not published
  const [userRole, setUserRole] = React.useState(null);
  const {
    eventName,
    startDate,
    endDate,
    location,
    eventDesc,
    eventBanner,
    publishedAt,
  } = event.data?.attributes || {};
  const router = useRouter();
  console.log(event);
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await getRoleFromLocalCookie();
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        // Handle the error case
      }
    };
    fetchUserRole();
  }, []);
  const handlePublish = async () => {
    if (publishedAt === null)
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${event.data.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: { ...event, publishedAt: isPublished ? null : new Date() },
            }),
          }
        );
        router.push("/events");
      } catch (err) {
        console.error(err);
      }
    router.push(event.data.id + "/edit");
  };
  return (
    <Box className="bg-slate-700 min-h-screen h-full pt-4 flex">
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingX: { lg: 18, md: 0 }, paddingY: 6 }}
      >
        {userRole && (
          <Card
            elevation={0}
            className="mx-4 my-8 md:mx-2 md:my-4 lg:mx-8 lg:my-6 bg-transparent text-white"
          >
            <Typography className="font-monument font-bold uppercase tracking-wider text-2xl py-6">
              {" "}
              {eventName}{" "}
            </Typography>

            <CardMedia
              sx={{
                width: "100%",
                height: 450,
              }}
              className="h-1/2 md:h-24 lg:h-32 object-cover"
              image={eventBanner ? eventBanner?.data?.attributes.url : ""}
              title={eventName}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Location:</Typography>
                  <Typography variant="body1" className="text-white">
                    {location}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Date:</Typography>
                  <Typography variant="body1" className="text-white">
                    {new Date(startDate).toLocaleDateString()} -{" "}
                    {new Date(endDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                {eventDesc && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Description:</Typography>
                    <Typography variant="body1" className="text-white">
                      {eventDesc}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="text"
                className="bg-slate-600 hover:bg-slate-500 text-white  px-6"
                onClick={handlePublish}
              >
                {publishedAt !== null ? "modifier" : "publier"}
              </Button>
            </CardActions>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default PersonalId;
export async function getStaticProps({ params }) {
  const qs = require("qs");
  const query = qs.stringify({
    populate: "*",
    publicationState: "preview",
    filters: {
      publishedAt: { $null: true },
    },
    encodeValuesOnly: true, // encode only values consistently
  });
  // use the same name as in getStaticPaths

  const event = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${params.personalId}?${query}`
  );

  return { props: { event } };
}

export async function getStaticPaths() {
  const { data: events } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/events?populate=*`
  );

  const paths = events.map((event) => ({
    params: { personalId: String(event.id) },
  }));

  return { paths, fallback: "blocking" }; // use 'blocking' for dynamic routes
}
