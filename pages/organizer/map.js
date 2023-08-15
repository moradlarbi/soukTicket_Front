/**
 * This is a React component that uses the Google Maps API and the use-places-autocomplete library to
 * allow users to search for and select a location on a map.
 * @returns The `Places` component is being returned, which contains the `Map` component and the
 * `PlacesAutocomplete` component.
 */
import { useState, useMemo, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";

export default function Places({ selected, setSelected, setgeolocation }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });
    if (!isLoaded) return <div>Loading...</div>;
    return <Map selected={selected} setSelected={setSelected} setgeolocation={setgeolocation} />;
}

export function Map({ selected, setSelected, setgeolocation }) {
    const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
    let [temp, settemp] = useState({})
    const getGeocodeData = useCallback(async () => {
        if (selected) {
            try {
                const results = await getGeocode({ address: selected });

                const { lat, lng } = await getLatLng(results[0]);
                settemp({ lat, lng })
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    }, [selected, settemp])
    useEffect(() => {
        getGeocodeData();
    }, [selected]);

    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete selected={selected} setSelected={setSelected} setgeolocation={setgeolocation} />
            </div>

            <GoogleMap
                mapContainerStyle={{

                    width: "70%",
                    height: "300px",
                    padding: "10px",
                }}
                zoom={10}
                // center={selected ? selected : center}
                options={{

                    disableDefaultUI: true,
                    zoomControl: true,

                }}
            >
                {selected && <Marker position={selected} />}
            </GoogleMap>
        </>
    );
}

const PlacesAutocomplete = ({ selected, setSelected, setgeolocation }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });

    const handleSelect = async (address) => {
        setValue(address, false);
        setgeolocation(address)
        clearSuggestions();
        if (address) {
            try {
                const results = await getGeocode({ address });
                const { lat, lng } = await getLatLng(results[0]);
                setSelected({ lat, lng });
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    };

    return (
        <Autocomplete
            sx={{ width: "43%" }}
            className="pb-8"
            freeSolo
            disableClearable
            options={data.map((place) => place.description)}
            onInputChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={value}
            //getOptionLabel={(option) => console.log(option)}
            value={value}
            onChange={(event, newValue) => {
                handleSelect(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search an address"
                    variant="outlined"
                    disabled={!ready}
                    className="combobox-input"
                />
            )}
        />
    );
};