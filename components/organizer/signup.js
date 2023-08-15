/**
 * The above function is a form component for user sign up, which includes input fields for name,
 * email, password, and location, as well as a checkbox for accepting terms and conditions, and a
 * submit button.
 * @returns The component `SignUpForm` is being returned.
 */
import { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { wilayas } from "../../utils/wilaya-dz";
import Link from "next/link";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/router";
import axios from "axios";
import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";

export const SignUpTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "#7f7f7fff",
    "&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
      borderColor: "#7f7f7fff", // Change the outline color on hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a0a0a0ff", // Change the outline color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: "#7f7f7fff",
  },
}));

function SignUpForm() {
  const router = useRouter();
  const validationSchema = Yup.object({
    nom: Yup.string().required("Required"),
    prenom: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    host: Yup.string(),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Required"),
    wilaya: Yup.string().required("Required"),
    acceptConditions: Yup.boolean().oneOf(
      [true],
      "Must Accept Terms and Conditions"
    ),
  });
  const formik = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      email: "",
      host: "",
      password: "",
      wilaya: "",
      acceptConditions: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        const { nom, prenom, email, host, password, wilaya, acceptConditions } =
          values;
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
            {
              nom,
              prenom,
              email,
              username: host,
              password,
              wilaya,
              acceptConditions,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(async (response) => {
            if (response.status === 200) {
              const id = response.data.user.id;
              const token = response.data.jwt;

              if (window.location.pathname === "/personal/signup") {
                await axios.put(
                  `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}`,
                  { role: 3 },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              }
              Cookies.set("jwt", token);
              router.push("/personal");
            }
          })
          .catch((error) => error.response.data);
      } catch (error) {
        setStatus(error.response.data.error.message);
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="max-w-2xl mx-auto py-8 px-4 md:px-16 text-jetdark">
        <Typography variant="h4" className="font-monument">
          Inscription
        </Typography>
        <FormikProvider value={formik}>
          <SignUpTextField
            label="Nom"
            variant="outlined"
            fullWidth
            margin="normal"
            name="nom"
            value={formik.values.nom}
            onChange={formik.handleChange}
            error={formik.errors.nom && Boolean(formik.errors.nom)}
          />
          {formik.errors.nom ? (
            <div className="text-red-500">{formik.errors.nom}</div>
          ) : null}
          <SignUpTextField
            label="Prenom"
            variant="outlined"
            fullWidth
            margin="normal"
            name="prenom"
            value={formik.values.prenom}
            onChange={formik.handleChange}
          />
          {formik.errors.prenom ? (
            <div className="text-red-500">{formik.errors.prenom}</div>
          ) : null}
          <SignUpTextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
          <SignUpTextField
            label="Host"
            variant="outlined"
            fullWidth
            margin="normal"
            name="host"
            value={formik.values.host}
            onChange={formik.handleChange}
          />
          <SignUpTextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}

          <FormControl sx={{ width: "50%", marginTop: 4, marginBottom: 2 }}>
            <InputLabel id="demo-simple-select-helper-label">Wilaya</InputLabel>
            <Select
              fullWidth
              value={formik.values.wilaya}
              name="wilaya"
              onChange={formik.handleChange}
              displayEmpty
              label="Wilaya"
              inputProps={{ "aria-label": "Without label" }}
            >
              {wilayas.map((wilaya) => (
                <MenuItem key={wilaya?.state_id} value={wilaya?.state_name}>
                  {wilaya.state_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.status ? (
            <div className="text-red-800 ">{formik.status}</div>
          ) : null}
          <FormControlLabel
            sx={{ marginBottom: 2 }}
            control={
              <Checkbox
                checked={formik.values.acceptConditions}
                onChange={formik.handleChange}
                name="acceptConditions"
                sx={{
                  color: "#b5b5b5ff",

                  "&.Mui-checked": {
                    color: "#7f7f7fff",
                  },
                }}
              />
            }
            label="Les conditions d' utilisation Soukticket"
          />

          <Button
            variant="contained"
            className="hover:bg-mikado bg-jetdark"
            type="submit"
            onClick={formik.handleSubmit}
            disabled={!formik.values.acceptConditions}
            fullWidth
          >
            S'inscrire
          </Button>
        </FormikProvider>
      </div>

      <Typography className="text-jetdark">
        Vous avez déjà un compte ?{" "}
        <Link
          href="/personal/login"
          className="text-zinc-900 hover:text-zinc-700 cursor-pointer"
        >
          {" "}
          Se connecter
        </Link>
      </Typography>
    </>
  );
}

export default SignUpForm;
