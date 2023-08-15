/**
 * The function returns the previous value of a given variable using React's useRef and useEffect
 * hooks.
 * @param value - The value that we want to keep track of and get the previous value of. It can be of
 * any data type.
 * @returns The previous value of the input parameter `value` is being returned. This is achieved by
 * storing the current value of `value` in a `ref` object using the `useEffect` hook, and returning the
 * previous value of `value` from the `ref` object.
 */
import { useEffect, useRef } from "react";

export function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}