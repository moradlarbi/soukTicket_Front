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
import { useRouter } from "next/router";
import EditEvent from "@/components/EditEvent";

const EditEvents = () => {
    const { user, loading } = useUser();
    const jwt = Cookies.get("jwt");
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();
    const [event, setEvent] = useState(null);

    const fetchEvent = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${router.query.personalId}`
        ).then(res => setEvent(res.data.data.attributes)).catch(err => console.log(err))

    }
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
                        setUserRole(response.data.role.type);
                    })
                    .catch((error) => console.error(error));
        };
        fetchUserRole();
        //fetchEvent()
    }, []);
    return (
        <>
            {userRole === "organizer" ?
                <Box className="bg-slate-700 h-full pt-4" >

                    <PersonalNavBar />
                    <EditEvent user={user} jwt={jwt} />

                </Box>
                :
                <Landing component={<LoginForm />} />


            }


        </>
    );
};

export default EditEvents
