/**
 * This is a React component for a registration form that handles user input and submission, and
 * displays error messages if necessary.
 * @returns The Register component is being returned.
 */
import { useState } from "react";
import { signUp } from "@/lib/auth";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "nom":
        setNom(value);
        break;
      case "prenom":
        setPrenom(value);
        break;
      case "passwordConfirmation":
        setPasswordConfirmation(value);
        break;
      default:
        break;
    }
  };

  const passwordsMatch = password === passwordConfirmation;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    if (!passwordsMatch) {
      setAuthError("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await signUp(nom, prenom, email, username, password, passwordConfirmation);
      if (response.error) {
        // Display the error message from the Strapi response
        if (response.error.message === "Email or Username are already taken") {
          setAuthError("Ce nom d'utilisateur/email existe déjà.");
        } else {
          setAuthError(
            "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
          );
        }
      } else {
        console.log("User registered successfully:", response);
        // Redirect or perform any other action on successful registration
        router.push("/events");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsSubmitting(false); // Reset the isSubmitting state
    }
  };

  return (
    <FormGroup>
      <h1 className="font-monument font-ultrabold uppercase text-lg lg:text-3xl ">
        S&apos;inscrire
      </h1>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <FormControl
          margin="normal"
          sx={{
            width: "50%",
          }}
        >
          <InputLabel htmlFor="nom">Nom</InputLabel>
          <Input
            id="nom"
            name="nom"
            autoComplete="family-name"
            value={nom}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl
          margin="normal"
          sx={{
            width: "50%",
          }}
        >
          <InputLabel htmlFor="prenom">Prénom</InputLabel>
          <Input
            id="prenom"
            name="prenom"
            autoComplete="given-name"
            value={prenom}
            onChange={handleChange}
            required
          />
        </FormControl>
      </Box>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="username">Nom d&apos;utilisateur</InputLabel>
        <Input
          id="username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="password">Mot de passe</InputLabel>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={password}
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
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="passwordConfirmation">
          Confirmer le mot de passe
        </InputLabel>
        <Input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={passwordConfirmation}
          onChange={handleChange}
          required
          error={!passwordsMatch}
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
      </FormControl>
      {authError && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography color="error">{authError}</Typography>
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
        disabled={isSubmitting}
      >
        S&apos;inscrire
      </Button>
    </FormGroup>
  );
};

export default Register;
