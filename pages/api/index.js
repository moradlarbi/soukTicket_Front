/**
 * This is a helper function to make GET requests to a Strapi API.
 * @param [path] - The path parameter is a string that represents the endpoint or resource that we want
 * to fetch from the Strapi API. It is appended to the base URL of the API to form the complete URL for
 * the request.
 * @returns The `getStrapiURL` function is returning nothing (an empty value). The `fetchAPI` function
 * is returning the JSON data from the API endpoint specified by the `path` parameter.
 */
import { fetcher } from "@/lib/api";

export function getStrapiURL(path = "") {
    return;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
    const requestUrl = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api"}${path}`);
    //const response = await fetch(requestUrl);
    const data = await requestUrl.json();
    return data;
}