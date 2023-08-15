import Layout from "@/components/Layout";
import { fetcher } from "@/lib/api";
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
const Tickets = ({ tickets, eventId }) => {
  const [ticketQuantities, setTicketQuantities] = React.useState({});
  const [designatedTicketId, setDesignatedTicketId] = React.useState();
  const token = Cookies.get('jwt')
  const handlePurchaseTicket = (ticketId, action) => {
    setDesignatedTicketId(ticketId);
    setTicketQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      const ticketIndex = tickets.findIndex((ticket) => ticket.id === ticketId);
      if (ticketIndex !== -1 && tickets[ticketIndex].attributes.quantity > 0) {
        if (action === 'decrease' && (prevQuantities[ticketId] || 0) > 0) {
          updatedQuantities[ticketId] = (prevQuantities[ticketId] || 0) - 1;
        } else if (action === 'increase' && tickets[ticketIndex].attributes.quantity > 0) {
   updatedQuantities[ticketId] = (prevQuantities[ticketId] || 0) + 1;
        }
      }

      return updatedQuantities;
    });
  };
  console.log(ticketQuantities[designatedTicketId]);
  const updateTickets = async (ticketId) => {


    await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/transactions`, {
      data: {
        ticket: designatedTicketId,
        quantite: ticketQuantities[designatedTicketId]
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then((response) => {
      if (response.status === 200) {
        console.log('Ticket quantities updated:', response);
      }
    }).catch((error) => {
      console.error('Error updating ticket quantities:', error);
    });

  };
  return (
    <Box sx={{
      width: "90vw",
      mt: 8
    }}>
      <Typography variant="h5" className="text-white font-extrabold tracking-widest capitalize pt-8 pb-4"> billets </Typography>
      {tickets?.map((ticket) => {
        const { id, attributes } = ticket;
        const { name, description, price, quantity } = attributes;
        const purchasedQuantity = ticketQuantities[id] || 0;
        return (
          <>
            <Box sx={{
              display: "flex",
              alignItems: 'start'
            }}
              gap={4}>

              <Card className="bg-white rounded-md flex flex-col p-4 2xl:w-[700px] xl:w-[500px] w-[700px] my-8">

                <CardContent className="flex  justify-between flex-col" >
                  <Typography className="text-xl capitalize font-bold">{name}</Typography>
                  <Typography className=" capitalize ">{description}</Typography>
                </CardContent>
                <CardActions className="flex justify-between px-4">
                  <Stack >

                    <Typography className="font-bold">
                      {price.toLocaleString(undefined, { useGrouping: true, style: "currency", currency: "DZA" })}
                    </Typography>

                  </Stack>

                  {quantity !== 0 ?

                    <Stack flexDirection="row " >

                      <IconButton
                        variant="outlined"
                        className="border-ctaprimary rounded-full hover:bg-redfaint   px-4 hover:border-ctaprimary text-dark"
                        onClick={() => {
                          handlePurchaseTicket(id, "decrease")
                        }}
                        disabled={quantity === 0} // Disable the IconButton if the ticket quantity is 0
                      >
                        -
                      </IconButton>

                      <IconButton
                        variant="outlined"
                        className="border-ctaprimary hover:bg-redfaint rounded-full px-4 hover:border-ctaprimary text-dark"
                        onClick={() => {
                          handlePurchaseTicket(id, "increase")
                        }}
                        disabled={quantity === 0} // Disable the button if the ticket quantity is 0
                      >
                        +
                      </IconButton>

                    </Stack>
                    : <Typography>les tickets sont epuises</Typography>}
                </CardActions>
              </Card>
              {designatedTicketId === id && purchasedQuantity !== 0 &&
                <Card className="bg-white rounded-md 2xl:w-[400px] flex flex-col items-stretch  xl:w-[500px] w-[700px] ">

                  <CardContent>

                    <Typography className="font-bold text-2xl"> x {purchasedQuantity} </Typography>
                    <Typography className="font-bold capitalize"> articles selectionnes</Typography>
                    <Typography className="font-bold capitalize bg-gray-300 p-4 mt-8 -mx-4"> {name}</Typography>
                    <Stack flexDirection="row" justifyContent="space-between" pt={9}>
                      <Typography>total</Typography>
                      <Typography className="font-bold">
                        {(price * purchasedQuantity).toLocaleString(undefined, { useGrouping: true, style: "currency", currency: "DZA" })}
                      </Typography>
                    </Stack>
                  </CardContent>
                  <CardActions className="flex flex-col">

                    <Button className="bg-ctaprimary text-white hover:bg-ctaprimaryhover hover:text-gray-200 self-stretch" onClick={() => updateTickets()}>accheter</Button>
                  </CardActions>
                </Card>
              }
            </Box>
          </>
        );
      })}
    </Box>
  );
};

const Event = () => {
  //const single = event?.data?.attributes;
  const [single, setsingle] = useState()
    const [open, setopen] = React.useState(false)
  const jwt = Cookies.get("jwt")
  const router = useRouter();
  const { eventId } = router.query;
  const fetchEvent = async () => {

    await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${eventId}?populate=*`
      , {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then(res => {
        setsingle(res.data.data.attributes)
      }).catch(err => console.log(err))
  }
  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId])
  if (!single) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>

      <Box
        className="lg:h-full bg-slate-800 pt-20 pb-20 text-justify md:text-left"
        sx={{
          paddingX: { md: 20 },
        }}
      >
        <Box className="eventImage relative">
          <Box
            sx={{ paddingX: { md: 13 } }}
            className="relative z-10 flex flex-col-reverse lg:flex-row gap-6  lg:items-start items-center justify-between w-full "
          >
            <Stack
              display="flex"
              gap={2}
              className="lg:w-4/12 lg:pl-4 px-2 pt-12"
            >
              <Typography className="font-bold md:text-4xl uppercase tracking-wide leading-loose font-foggy text-white text-5xl">
                {single?.eventName}
              </Typography>
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gap={2}
                className="font-extrabold text-white capitalize"
              >
                <CalendarTodayOutlinedIcon sx={{ fontSize: 32 }} />
                {new Date(single?.startDate).toLocaleDateString("en-fr", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </Typography>
              <Divider className="bg-jetdark ml-12 w-1/2" />
              <Typography
                variant="body1"
                display="flex"
                gap={2}
                alignItems="center"
                className="font-extrabold text-white capitalize"
              >
                <HomeOutlinedIcon sx={{ fontSize: 34 }} />
                {single?.location}
              </Typography>

              <Stack className="py-3">
                <Typography variant="h5" className="text-white font-bold">
                  Organisé par
                </Typography>
                <Typography
                  variant="body1"
                  display="flex"
                  alignItems="center"
                  className="font-extrabold text-jetlighter capitalize"
                >
                  {single?.user?.data?.attributes.username}
                </Typography>
              </Stack>

              <Button variant="outlined" className="hover:bg-ctaprimaryhover border-ctaprimary text-white hover:border-ctaprimary" onClick={() => setopen(!open)}>acheter un ticket</Button>
              {open &&
                single?.tickets && <Tickets tickets={single?.tickets.data} eventId={eventId} />
              }
              <Stack>
                <Typography variant="h5" className="text-white font-bold">
                  Description
                </Typography>
                <Typography
                  variant="body1"
                  display="flex"
                  alignItems="center"
                  className="font-extrabold text-jetlighter capitalize"
                >
                  {single?.eventDesc}
                </Typography>
              </Stack>
            </Stack>

            <img
              src={single?.eventBanner?.data?.attributes.url}
              className="w-full md:w-full lg:w-5/12 max-h-[480px] object-cover"
            />
          </Box>
          <Box className="blur-3xl inset-0 absolute">
            <img
              src={single?.eventBanner?.data?.attributes.url}
              className="w-full h-[480px] lg:aspect-w-9 object-fill"
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Event;
