/**
 * This is a Next.js app wrapper that sets up the theme, font, and emotion cache, and removes
 * server-side injected CSS.
 * @returns The `App` component is being returned, which wraps the `Component` and `pageProps` with
 * various providers and configurations such as `ThemeProvider`, `CacheProvider`, `AnimatePresence`,
 * and `Head`.
 */
import "@/styles/globals.css";
import "../styles/fonts.css";
import { ThemeProvider, createTheme } from "@mui/material";
import localFont from "@next/font/local";
import { AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { useEffect } from "react";
import Head from "next/head";
const customFont = localFont({
  src: "../public/fonts/SpaceGrotesk.ttf",
  display: "swap",

});
const theme = createTheme({
  typography: {
    fontFamily: customFont.style.fontFamily
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: customFont.style.fontFamily,


        },

      }
    }
  }
});
const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AnimatePresence mode="wait">

        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>

      </AnimatePresence>
    </CacheProvider>

  )


}
