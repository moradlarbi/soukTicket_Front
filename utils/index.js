/* This code is defining two animation objects using the Framer Motion library. The `reveal` object
defines an animation that scales and fades in an element, while the `photoAnim` object defines an
animation that scales and fades in a photo. These animations can be used to add visual effects to
elements on a webpage or in a web application. */

export const reveal = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: "easeOut",
            duration: 0.3,
        },
    },
};
export const photoAnim = {
    hidden: {
        scale: 1.5,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            ease: "easeOut",
            duration: 0.75,
        },
    },
};