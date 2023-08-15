/**
 * This is a layout component that provides a navigation bar, footer, and motion animation for page
 * transitions, and also includes a user context provider.
 * @returns The `Layout` component is being returned, which includes the `Navbar`, `Footer`, and a
 * `motion.div` that wraps the `children` prop and applies animation using the `framer-motion` library.
 * The `UserProvider` component is also being used to provide authentication context to its children
 * components.
 */
import { useRouter } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { UserProvider } from "@/lib/authContext";
import { motion } from 'framer-motion';
const pageVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  enter: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: 50,

    transition: { duration: 0.5, ease: "easeInOut" }
  },
}
export default function Layout({ user, loading = false, children }) {
  const router = useRouter()

  return (
    <UserProvider value={{ user, loading }}>


      <Navbar />
      <motion.div key={router.asPath} initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }} variants={pageVariants}>

        <main className="flex-1">{children}</main>
      </motion.div>
      <Footer />

    </UserProvider >
  );
}
