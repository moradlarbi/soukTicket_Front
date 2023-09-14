import { useCallback, useState } from "react";

import {
  Box,
  ThemeProvider,
  Typography,
  createTheme
} from "@mui/material";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import QrReader from "react-qr-scanner";
import Swal from "sweetalert2";
import { set } from "date-fns";
// Define the custom theme with 'Space Grotesk' as the default font family
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: "#fff",
          // backgroundColor: "#52525b",
        },
      },
    },
  },

  palette: {
    mode: "dark",
    primary: {
      main: "#F9A826",
    },
  },
  typography: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
  },
});

const EventCheck = ({ user, jwt }) => {
  const [qrcodevisible, setqrcodevisible] = useState(true);

  const router = useRouter();
  
  const handleScan = async (data) => {
    if (data != null) {
      if (data.text !== null) {
        setqrcodevisible(false);
      }
      let qrcode = data?.text ?? ""
      await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/check/${qrcode}`, {
        data: {},
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt,
        },
      }).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Votre ticket a été validé avec succès',
            showConfirmButton: false,
            timer: 1500
        })
        }
      }).catch((error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: "La validation a échoué",
          showConfirmButton: false,
      })
      });
      
    }
  };

  const handleError = (err) => {
    console.error("error", err);
  };

  const previewStyle = {
    height: 500,
    width: 500,
  };


  return (
    <ThemeProvider theme={theme}>
      <Box>
      {qrcodevisible && (
          <QrReader
            delay={100}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default EventCheck;
