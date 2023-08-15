/**
 * This is a React component that renders an event creation form if the user is an organizer, and a
 * login form if the user is not an organizer.
 * @returns The component `EventCreate` is being returned.
 */
import EventCreation from "@/components/EventCreation";
import Layout from "@/components/Layout";
import { useUser } from "@/lib/authContext";
import React from "react";
import { getRoleFromLocalCookie } from "@/lib/auth";
import PersonalNavBar from "@/components/personal/navbar";
import { Box } from "@mui/material";
import LoginForm from "@/components/organizer/loginform";
import Landing from "@/components/organizer/landing";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const EventCreate = () => {
  const { user, loading } = useUser();
  const jwt = Cookies.get("jwt");
  const [userRole, setUserRole] = useState(null);
  console.log(jwt);
  useEffect(() => {
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
            console.log(response);
            setUserRole(response.data.role.type);
          })
          .catch((error) => console.error(error));
    };
    fetchUserRole();
  }, []);
  return (
    <>
      {userRole === "organizer" ? (
        <Box className="bg-gradient-to-b from-[#1b1b1b] via-gray-900 to-violet-900 h-full pt-4">
          <PersonalNavBar />
          <EventCreation user={user} jwt={jwt} />
        </Box>
      ) : (
        <Landing component={<LoginForm />} />
      )}
    </>
  );
};

export default EventCreate;
