/**
 * This is a module that contains functions related to authentication and user data management in a
 * Next.js app using Strapi as a backend.
 * @param data - The data parameter is an object that contains user information and a JWT (JSON Web
 * Token) that is used for authentication. It is used in the setToken function to set cookies with the
 * user's information and JWT.
 * @returns This code exports several functions related to user authentication and token management,
 * including functions to set and unset tokens, get user data from cookies, and sign in and sign up
 * users. The functions return various values such as user data, tokens, and responses from API calls.
 */
import Router from "next/router";
import Cookies from "js-cookie";
import { fetcher } from "./api";
import axios from "axios";

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");

  Router.reload("/");
};

export const getRoleFromLocalCookie = async () => {
  const jwt = Cookies.get("jwt");
  if (jwt) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate=*`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      );
      return response.data.role.type;
    } catch (error) {
      console.error("Error in fetching user data:", error);
      return null;
    }
  } else {
    return null;
  }
};

export const signIn = async (identifier, password) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/`,
      { identifier, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in signIn:", error);
    throw new Error("An error occurred during sign-in.");
  }
};


export const signUp = async (
  nom,
  prenom,
  email,
  username,
  password,
  wilaya
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
      {
        username,
        email,
        password,
        nom,
        prenom,
        wilaya,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      // Registration successful, you can handle the response here
      return response.data;
    } else {
      // Handle registration failure or error
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Error in signUp:", error);
    throw error;
  }
};
