/**
 * This is a functional component that renders a responsive navbar with various buttons and links,
 * including a login form and a drawer menu.
 * @returns The Navbar component is being returned.
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  createTheme,
  ThemeProvider,
  Box,
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
  FormGroup,
  Typography,
  InputAdornment,
  MenuItem,
  ListItemIcon,
  Divider,
  Menu,
} from "@mui/material";
import {
  Close,
  Visibility,
  VisibilityOff,
  Person,
  ExitToApp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { fetcher } from "../lib/api";
import { setToken, signIn, unsetToken } from "../lib/auth";
import { useUser } from "../lib/authContext";
import Image from "next/image";
import Register from "./Register";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { calcLength } from "framer-motion";

// Define the custom theme with 'Space Grotesk' as the default font family

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleLoginDrawer = () => {
    setLoginDrawerOpen(!loginDrawerOpen);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    unsetToken();
    handleClose();
  };

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const { user, loading } = useUser();
  console.log(user);
  const [errors, setErrors] = useState({
    identifier: false,
    password: false,
  });

  // Add authError state
  const [authError, setAuthError] = useState(false);
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [registerDrawerOpen, setRegisterDrawerOpen] = useState(false);
  //const [username, setusername] = useState("")
  const router = useRouter();
  const toggleRegisterDrawer = () => {
    setRegisterDrawerOpen(!registerDrawerOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      identifier: false,
      password: false,
    });
    setAuthError(false);

    if (!data.identifier || !data.password) {
      setErrors({
        identifier: !data.identifier,
        password: !data.password,
      });
      return;
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/`,
        { identifier: data.identifier, password: data.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        Cookies.set("jwt", res.data.jwt);
        setAuthError(false);
        toggleLoginDrawer();
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error.message);
      });
  };

  const logout = () => {
    unsetToken();
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginForm = (
    <FormGroup>
      <h1 className="font-monument font-ultrabold uppercase text-lg lg:text-3xl ">
        Me connecter
      </h1>
      <FormControl margin="normal" fullWidth error={errors.identifier}>
        <InputLabel htmlFor="username">Nom d&apos;utilisateur</InputLabel>
        <Input
          id="username"
          name="identifier"
          autoComplete="username"
          value={data.identifier}
          onChange={handleChange}
          required
        />
        {errors.identifier && (
          <FormHelperText>Nom d&apos;utilisateur est requis</FormHelperText>
        )}
      </FormControl>
      <FormControl margin="normal" fullWidth error={errors.password}>
        <InputLabel htmlFor="password">Mot de passe</InputLabel>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={data.password}
          onChange={handleChange}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && (
          <FormHelperText>Mot de passe est requis</FormHelperText>
        )}
      </FormControl>
      {error && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          mt: 3,
          mb: 2,
          borderColor: "#000",
          color: "#252525",
          "&:hover": {
            background: "#252525",
            color: "#f2f2f2",
          },
        }}
      >
        Se connecter
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        Pas encore de compte Soukticket ? &nbsp;
        <Button
          sx={{
            borderColor: "#d9d9d9",
            border: 1,
            color: "#2d2d2d",
          }}
          onClick={() => {
            toggleRegisterDrawer();
          }}
        >
          S&apos;inscrire
        </Button>
      </Box>
      <Drawer
        open={registerDrawerOpen}
        onClose={toggleRegisterDrawer}
        anchor="right"
        variant="temporary"
      >
        <Box
          sx={{
            width: { xs: 300, md: 350, lg: "40vw" },
            padding: 3,
            color: "#252525",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Register />
        </Box>
      </Drawer>
    </FormGroup>
  );
  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        color: "#f2f2f2",

        paddingX: { lg: 30, md: 15 },
      }}
    >
      <Drawer
        open={loginDrawerOpen}
        onClose={toggleLoginDrawer}
        anchor="right"
        variant="temporary"
      >
        <Box
          sx={{
            width: { xs: 300, md: 350, lg: "40vw" },
            padding: 3,
            color: "#252525",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {loginForm}
        </Box>
      </Drawer>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Button edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Link href="/" passHref>
            <Image src="/logodark.png" alt="logo" width={100} height={32} />
          </Link>
        </Button>

        {/* Anchor tags */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <Link href="/" passHref>
            <Button color="inherit" sx={{ mr: 2 }}>
              Accueil
            </Button>
          </Link>
          <Link href="/events" passHref>
            <Button color="inherit" sx={{ mr: 2 }}>
              Explorer les évènements
            </Button>
          </Link>
        </Box>

        {/* CTA button */}
        <Box
          className="lg:flex items-center justify-center hidden gap-4"
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              borderColor: "#f2f2f2",
              color: "#f2f2f2",

              "&:hover": {
                backgroundColor: "#f2f2f2 !important",
                color: "#2d2d2d",
              },
            }}
          >
            <Link href="/organizer">Espace Pro</Link>
          </Button>
          {!loading && !loading && user ? (
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
                onClick={handleClick}
              >
                <Person /> &nbsp; {user}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link href="/personal">
                    <Person /> &nbsp; Profile
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
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
              onClick={toggleLoginDrawer}
              sx={{
                backgroundColor: "#fff !important",
                borderColor: "#ff4e50ff",
                color: "#2d2d2d",

                "&:hover": {
                  backgroundColor: "#f2f2f2 !important",
                },
              }}
            >
              connexion
            </Button>
          )}
        </Box>

        {/* Drawer */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer}
          anchor="right"
          variant="temporary"
        >
          <List
            sx={{
              backgroundColor: "#f1f1f1ff",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
              gap: 5,
            }}
          >
            {/* Close button */}
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={toggleDrawer}
              sx={{ alignSelf: "flex-end", marginRight: 1, marginTop: 1 }}
            >
              <Close />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingX: 2,
                gap: 1,
              }}
            >
              <Button
                fullwidth
                color="inherit"
                variant="outlined"
                sx={{
                  borderColor: "#2d2d2d",
                  color: "#2d2d2d",
                  "&:hover": {
                    backgroundColor: "#7f7f7f !important",
                    color: "#2d2d2d",
                  },
                }}
              >
                <Link href="/organizer">Espace Pro</Link>
              </Button>
              {/* CTA button */}
              {!loading && user ? (
                <Box>
                  <Button
                    fullWidth
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
                    onClick={handleClick}
                  >
                    <Person /> &nbsp; {user}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link href="/personal">
                        <Person /> &nbsp; Profile
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        color: "#ff4e50",
                      }}
                    >
                      <ExitToApp /> &nbsp; Se déconnecter
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Button
                  color="inherit"
                  variant="contained"
                  onClick={() => {
                    toggleDrawer();
                    toggleLoginDrawer();
                  }}
                  sx={{
                    backgroundColor: "#fff !important",
                    borderColor: "#ff4e50ff",
                    color: "#2d2d2d",

                    "&:hover": {
                      backgroundColor: "#f2f2f2 !important",
                    },
                  }}
                >
                  connexion
                </Button>
              )}
            </Box>
            {/* Anchor tags */}
            <div>
              <Link href="/" passHref>
                <ListItem
                  button
                  component="a"
                  sx={{
                    color: "#2d2d2dff",
                    fontWeight: "bold",
                  }}
                >
                  <ListItemText primary="Accueil" />
                </ListItem>
              </Link>
              <Link href="/events" passHref>
                <ListItem
                  button
                  component="a"
                  sx={{
                    color: "#2d2d2dff",
                    fontWeight: "bold",
                  }}
                >
                  <ListItemText primary="Explorer les évènements" />
                </ListItem>
              </Link>
            </div>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
