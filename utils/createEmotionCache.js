/**
 * This function creates an Emotion cache with a key of 'css' and a prepend option set to true.
 * @returns A function that creates an Emotion cache with a key of 'css' and the option to prepend MUI
 * styles to the top of the `<head>` for easy overriding.
 */
import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
    return createCache({ key: 'css', prepend: true });
}