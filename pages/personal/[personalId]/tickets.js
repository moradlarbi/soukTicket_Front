import Sidebar from '@/components/personal/sidebar';
import { Box, Button, Stack, TextField, Typography, createTheme, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from 'uuid';

export const TicketTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderColor: "#fff",
        color: "#fff",
        "&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
        },
    },
    "& .MuiInputLabel-root": {
        color: "#fff",
    },
}));
const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editTicketId, setEditTicketId] = useState(null);
    const router = useRouter();
    const { personalId } = router.query;
    const jwt = Cookies.get("jwt");
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const fetchAllTickets = async () => {
        if (jwt && personalId !== undefined) {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${personalId}?populate[0]=tickets`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
                setTickets(response.data.data?.attributes?.tickets?.data);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchAllTickets();
    }, [personalId]);
    console.log(tickets);

    const addTicket = () => {
        const newTicket = {
            attributes: {


                name: "",
                quantity: 0,
                price: 0,
                horaires: "",
                description: "",
            }
        };
        setEdit(true);
        setTickets([...tickets, newTicket]);
    };

    const saveTickets = () => {
        axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/tickets`,
            {
                data: {
                    tickets: tickets?.map((ticket) => ({
                        name: ticket.name,
                        quantity: ticket.quantity,
                        price: ticket.price,

                    })),
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )
            .then(() => {
                fetchAllTickets();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteTicket = (ticketId) => {
        setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
        axios
            .put(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${personalId}`,
                { data: { tickets: tickets.filter((ticket) => ticket.id !== ticketId) } },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            .then(() => {
                fetchAllTickets();
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const editTicket = (ticketId) => {
        setEdit(true);
        setEditTicketId(ticketId);
    };

    const handleNameChange = (event, name, ticketId) => {
        const updatedTickets = tickets.map((ticket) => {
            if (ticket.id === ticketId) {
                return {
                    ...ticket,
                    [name]: event.target.value,
                };
            }
            return ticket;
        });

        setTickets(updatedTickets);
    };

    return (
        <Box className="bg-slate-700 min-h-screen h-full pt-4 flex">
            <Sidebar />
            <Box
                className='flex flex-col xl:mx-24 lg:mx-16 md:mx-16  justify-start  items-stretch mt-24'
                component="main"
                sx={{ flexGrow: 1, paddingX: { lg: 18, md: 0 }, paddingY: 6 }}
            >
                <Box className='flex items-start gap-2 mx-4 md:mx-0 justify-between'>
                    <Typography className='font-monument lg:text-2xl md:text-xl text-lg text-white pb-12 pl-8'>
                        Tickets
                    </Typography>
                    <Button
                        variant='outlined'
                        color="inherit"
                        className={`text-white hover:bg-ctaprimary hover:text-black ${isSmallScreen ? 'text-sm' : ''}`}
                        sx={isSmallScreen ? { py: 1, px: 2 } : {}}
                        onClick={addTicket}
                    >
                        Ajouter un ticket
                    </Button>
                </Box>
                <Box gap={5} display="flex" flexDirection="column" >
                    {tickets?.map((ticket) => {
                        const isNewTicket = editTicketId === ticket.id;
                        const { id, attributes } = ticket;
                        const { name, quantity, price } = attributes
                        return (
                            <Stack
                                key={ticket.id}
                                className='text-white md:flex-row md:justify-between justify-center min-w-full w-auto self-center items-center rounded-2xl border-slate-400 border-l-[12px] p-8 border-2'
                            >
                                <Stack className='space-y-4'>
                                    <Typography className='text-xl tracking-widest font-bold uppercase'>
                                        Titre
                                    </Typography>
                                    {edit && editTicketId === ticket.id ? (
                                        <TicketTextField
                                            name='name'
                                            className='text-white'
                                            onChange={(e) => handleNameChange(e, "name", id)}
                                            value={name}
                                        />
                                    ) : (
                                        <Typography className='tracking-widest font-bold text-jetlighter'>
                                            {name}
                                        </Typography>
                                    )}
                                </Stack>
                                <Stack className='space-y-4'>
                                    <Typography className='text-xl tracking-widest font-bold uppercase'>
                                        Quantité
                                    </Typography>
                                    {edit && editTicketId === id ? (
                                        <TicketTextField
                                            name='quantity'
                                            onChange={(e) => handleNameChange(e, "quantity", id)}
                                            value={quantity}
                                        />
                                    ) : (
                                        <Typography className='tracking-widest font-bold text-jetlighter'>
                                            {quantity}
                                        </Typography>
                                    )}
                                </Stack>
                                <Stack className='space-y-4'>
                                    <Typography className='text-xl tracking-widest font-bold uppercase'>
                                        Prix
                                    </Typography>
                                    {edit && editTicketId === id ? (
                                        <TicketTextField
                                            name='price'
                                            value={price}
                                            onChange={(e) => handleNameChange(e, "price", id)}
                                        />
                                    ) : (
                                        <Typography className='tracking-widest font-bold text-jetlighter'>
                                            {price} DZA
                                        </Typography>
                                    )}
                                </Stack>
                                <Stack flexDirection="row" gap={2}>
                                    <Button
                                        onClick={() => deleteTicket(id)}
                                        className='text-white bg-ctaprimary hover:bg-ctaprimaryhover'
                                    >
                                        Supprimer
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            isNewTicket ? saveTickets() : editTicket(id);
                                        }}
                                        className='text-gray-600 hover:text-white bg-mikado hover:bg-mikadofaint'
                                    >
                                        {isNewTicket ? "Enregistrer" : "Modifier"}
                                    </Button>
                                </Stack>
                            </Stack>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default Tickets;
