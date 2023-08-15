/**
 * This is a React component that renders a personalized navigation bar with menu options and user
 * authentication functionality.
 * @returns The component PersonalNavBar is being returned.
 */

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Image from "next/image";
//import { useUser } from '@/lib/authContext';
import { unsetToken } from "@/lib/auth";
import { ExitToApp, Person } from "@mui/icons-material";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";

const pages = [
  //   { name: "Tickets", link: "/tickets" },
  // { name: 'Pricing', link: '/pricing' },
  // { name: 'Blog', link: '/blog' }
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function PersonalNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setuser] = React.useState();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    unsetToken();
  };
  const router = useRouter();
  const jwt = Cookies.get("jwt");
  const fetchUser = React.useCallback(async () => {
    if (jwt) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setuser(response.data.username);
      } catch (error) {
        console.error(error);
      }
    }
  }, [jwt]);

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        color: "#f2f2f2",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Button
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 8,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link href="/" passHref>
              <Image src="/logodark.png" alt="logo" width={100} height={32} />
            </Link>
          </Button> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ name, link }) => (
                <Link href={link} textAlign="center">
                  <MenuItem key={name}>{name}</MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Link href="/" passHref className="flex grow">
            <Image
              src="/logodark.png"
              alt="logo"
              className="w-auto"
              width={100}
              height={36}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, link }) => (
              <Link
                href={{
                  pathname: router.pathname + link,
                  query: {
                    personalId: router.query.personalId,
                  },
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <MenuItem key={name}>
                  <Typography variant="button" textAlign="center">
                    {name}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>

          {user ? (
            <div>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: "#fff !important",
                  borderColor: "#ff4e50ff",
                  color: "#2d2d2d",
                  "&:hover": {
                    backgroundColor: "#f2f2f2 !important",
                  },
                }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpenUserMenu}
              >
                <Person /> &nbsp; {user}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => router.push("/personal")}>
                  <Person /> &nbsp; Profile
                </MenuItem>
                <MenuItem
                  onClick={logout}
                  sx={{
                    color: "#ff4e50",
                  }}
                >
                  <ExitToApp /> &nbsp; Se déconnecter
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              color="inherit"
              variant="contained"
              sx={{
                backgroundColor: "#fff !important",
                borderColor: "#ff4e50ff",
                color: "#2d2d2d",

                "&:hover": {
                  backgroundColor: "#f2f2f2 !important",
                },
              }}
            >
              <Link href="/personal/login">connexion</Link>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default PersonalNavBar;
