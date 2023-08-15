/**
 * The function uses the react-intersection-observer and framer-motion libraries to create a custom
 * hook that animates an element when it comes into view during scrolling.
 * @param [delay=0.5] - The delay parameter is a number that determines the delay time (in seconds)
 * before the animation starts when the element comes into view. It is multiplied by 500 to convert it
 * into milliseconds before being used in the setTimeout function.
 * @returns An array containing two elements: the first element is a reference to an HTML element
 * (ref), and the second element is an animation control object (controls).
 */
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import React, { useEffect } from "react"
export const useScroll = (delay = 0.5) => {
    const controls = useAnimation();
    const { ref: element, inView: view } = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (view) {
            const timer = setTimeout(() => {
                controls.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1 },
                });
            }, delay * 500);
            return () => clearTimeout(timer);
        } else {
            controls.start({ opacity: 0 });
        }
    }, [controls, view, delay]);

    return [element, controls];
};