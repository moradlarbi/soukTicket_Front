/**
 * The function exports a React component that renders a motion path SVG of a wave.
 * @returns A React component called "Wave" that renders an SVG element with a motion path.
 */
import React from "react";
import { motion } from "framer-motion";

const Wave = () => {
    return (
        <svg
            className="absolute bottom-12 -left-2 -z-1"
            width="75vw"
            height="363"
            viewBox="0 0 1440 363"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 1.3 }}
                d="M1440 27.4774C1352.73 19.8184 1122.41 49.0556 899.331 227.276C620.48 450.052 354.282 355.647 170.328 185.318C23.165 49.0556 -4.21721 8.32998 0.487081 5"
                stroke="#D96ED4"
                strokeOpacity="0.5"
                strokeWidth="10"
            />
        </svg>
    );
};

export default Wave;