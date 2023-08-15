/* This is a React component that defines a login form using the Formik library for form management and
Yup for form validation. It also uses Material-UI components for styling and layout. The component
defines a validation schema for the form fields, handles form submission, and redirects the user to
a new page upon successful authentication. */

import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import { useUser } from '@/lib/authContext'
import React from 'react'
import { SignUpTextField } from "./signup";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});
const LoginForm = () => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setStatus }) => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/`,
                    {
                        identifier: values.email,
                        password: values.password,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                Cookies.set("jwt", response.data.jwt);
                Cookies.set("id", response.data.user.id);
                router.push("/personal");
            } catch (error) {
                console.log(error);
                setStatus(error.response?.data?.error.message);
            }
        }

    });
    return (
        <div className="max-w-2xl  py-8 px-4 md:px-16 space-y-4  text-jetdark">
            <span>
                <Typography className="font-bold">
                    Bienvenue chez
                </Typography>
                <Typography variant="h4" className="font-monument"> soukticket</Typography>
            </span>
            <div className="space-y-6  " >
                <SignUpTextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <SignUpTextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                {formik.status && <div className="text-red-500">{formik.status}</div>}
                <Button
                    onClick={formik.handleSubmit}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="hover:bg-mikado bg-jetdark"
                    fullWidth>
                    Login
                </Button>
                <Typography className="text-center"> ou créer un compte <Link href="/personal/signup" className="text-zinc-900 hover:text-zinc-700 cursor-pointer"> s'inscrire </Link> </Typography>
            </div>
        </div>
    )
}

export default LoginForm

