import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext({ user: null, loading: false });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const jwt = Cookies.get("jwt");
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
          console.log(response);
          const userData = response.data;
          setUser(userData.username);
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const value = { user, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
