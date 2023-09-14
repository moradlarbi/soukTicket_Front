import Layout from "@/components/Layout";
import { fetcher } from "@/lib/api";
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { set } from "date-fns";
import { number } from "yup";
const Tickets = ({ single, jwt, eventId }) => {
  const router = useRouter();
  const handleRefresh = () => {
    router.reload()
  }
  console.log(single)
  let tickets = {}
  single?.tickets?.data.map((ticket) => {
    if (ticket.attributes?.state==="in sale"){
      if (tickets.hasOwnProperty(ticket.attributes.name)) {
        tickets[ticket.attributes.name] = {...tickets[ticket.attributes.name], quantity: tickets[ticket.attributes.name].quantity + 1  }
  
      } else {
        tickets[ticket.attributes.name] = { quantity: 1, price: ticket.attributes.price, event: Number(eventId) }
      }
    }
    
  });
  const [ticketQuantities, setTicketQuantities] = React.useState(Object.keys(tickets).length > 0
  ? new Array(Object.keys(tickets).length).fill(0)
  : []);
  useEffect(() => {
    console.log(ticketQuantities)
  }, [ticketQuantities])
  const handleAchat = () => async () => {
    console.log(tickets)
    console.log(ticketQuantities)
    let realTickets = Object.keys(tickets).map((name, index) => ({
      name: name,
      price: tickets[name].price,
      event: tickets[name].event,
      numberOfTickets: ticketQuantities[index],
    }));
    console.log(realTickets)
    await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/acheter-ticket`, {
          realTickets,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt,
          },
        }).then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Votre ticket a été acheté avec succès',
              showConfirmButton: false,
              timer: 1500
          })
          }
        }).catch((error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: "L'achat a échoué",
            showConfirmButton: false,
        })
        });
        //handleRefresh()
  }
  return (
    <Box sx={{
      width: "90vw",
      mt: 8
    }}>
      <Typography variant="h5" className="text-white font-extrabold tracking-widest capitalize pt-8 pb-4"> billets </Typography>
      {Object.keys(tickets).map((key, index) => {
        let numberOfTickets = ticketQuantities[index]
        const { quantity, price, name } = tickets[key];
        return (
          <>
            <Box sx={{
              display: "flex",
              alignItems: 'start'
            }}
              gap={4}>

              <Card className="bg-white rounded-md flex flex-col p-4 2xl:w-[700px] xl:w-[500px] w-[700px] my-8">

                <CardContent className="flex  justify-between flex-col" >
                  <Typography className="text-xl capitalize font-bold">{key}</Typography>
                  {/* <Typography className=" capitalize ">{description}</Typography> */}
                </CardContent>
                <CardActions className="flex justify-between px-4">
                  <Stack >

                    <Typography className="font-bold">
                      {price.toLocaleString(undefined, { useGrouping: true, style: "currency", currency: "DZA" })}
                    </Typography>

                  </Stack>

                  {quantity !== 0 ?

                    <Stack flexDirection="row" sx={{alignItems:"center"}} >

                      <IconButton
                        variant="outlined"
                        className="border-ctaprimary rounded-full hover:bg-redfaint   px-4 hover:border-ctaprimary text-dark"
                        onClick={() => {
                          setTicketQuantities((prev) => {
                            const newQuantities = [...prev];
                            newQuantities[index] = numberOfTickets - 1;
                            return newQuantities;
                          })
                        }}
                        disabled={quantity === 0 || ticketQuantities[index] === 0} // Disable the IconButton if the ticket quantity is 0
                      >
                        -
                      </IconButton>
                        <Typography className=" align-middle">{numberOfTickets}</Typography>
                      <IconButton
                        variant="outlined"
                        className="border-ctaprimary hover:bg-redfaint rounded-full px-4 hover:border-ctaprimary text-dark"
                        onClick={() => {
                          setTicketQuantities((prev) => {
                            const newQuantities = [...prev];
                            newQuantities[index] = numberOfTickets + 1;
                            return newQuantities;
                          })
                        }}
                        disabled={quantity === 0 || ticketQuantities[index] === quantity} // Disable the button if the ticket quantity is 0
                      >
                        +
                      </IconButton>
                      

                    </Stack>
                    : <Typography>les tickets sont epuises</Typography>}
                </CardActions>
              </Card>
            </Box>
          </>
        );
      })}
      <Button variant="outlined" className="hover:bg-ctaprimaryhover border-ctaprimaryhover/80 text-white hover:border-ctaprimary bg-ctaprimaryhover/80" onClick={handleAchat()}>
        acheter
        </Button> 
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
                single?.tickets && <Tickets single={single} jwt={jwt} eventId={eventId} />
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
