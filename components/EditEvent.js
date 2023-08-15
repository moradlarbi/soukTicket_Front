import { useCallback, useEffect, useState } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Step,
    StepLabel,
    Stepper,
    TextField,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
    AddPhotoAlternateOutlined,
    ImageOutlined,
    CheckCircle,
    RadioButtonUnchecked,
    FestivalOutlined,
    FactoryOutlined,
    Nightlife,
    Forest,
    MicExternalOn,
} from "@mui/icons-material";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
//import { useRouter } from "next/navigation";
import { useRouter, userRouter } from "next/router";
import Places, { Map, PlacesAutocomplete } from "@/pages/organizer/map";

import Head from "next/head";
import Mic from "./Icons/Concerts";
import Randonnee from "./Icons/Randonee";
import Art from "./Icons/Art";
import Atelier from "./Icons/Atelier";
import Concerts from "./Icons/Concerts";
import Conference from "./Icons/Conference";
import Dj from "./Icons/Dj";
import Film from "./Icons/Film";
import Food from "./Icons/Food";
import Health from "./Icons/Health";
import Humour from "./Icons/Humour";
import Podcast from "./Icons/Podcast";
import Social from "./Icons/Social";
import Soiree from "./Icons/Soiree";
import Sport from "./Icons/Sport";
import Theatre from "./Icons/Theatre";

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

const EditEvent = ({ user, jwt }) => {
    /* The above code is a React component that implements a multi-step form for creating an event. It
    uses the Formik library for form management and Yup for form validation. The form has three steps:
    "Event Details", "Event Content", and "Tags". The component also uses the useDropzone hook from
    the react-dropzone library to handle file uploads for the event banner. The form data is submitted
    to a Strapi backend API endpoint when the user completes all the steps and clicks the submit
    button. */
    const [bannerPreview, setBannerPreview] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [event, setevent] = useState({})
    const [selected, setSelected] = useState(null);
    const [geolocation, setgeolocation] = useState("");
    const router = useRouter()
    //const nextrouter = nextRouter();
    const validationSchema = Yup.object({
        eventName: Yup.string().required("Nom de l'évènement est requis"),
        eventType: Yup.string().required("Type d'évènement est requis"),
        startDate: Yup.date().required("Start date est requis"),
        endDate: Yup.date().required("End date est requis"),
        location: Yup.string().required("Location est requis"),
        eventDesc
            : Yup.string().required(
                "Description de l'évènement est requis"
            ),
        tags: Yup.array().of(Yup.string()),
    });
    const combinedValidationSchema = Yup.object().shape({
        eventName: Yup.string().required("Nom de l'évènement est requis"),
        eventType: Yup.mixed()
            .test(
                "valid-event-type",
                `Event type must be one of "Concert", "Humour", "DJ", "Soirée", "Théâtre", "Art", "Atelier", "Nourriture et Boissons", "Conférence", "Film", "Sport", "Podcast", "Bien-être", "Randonnée"`,
                (value) => {
                    if (!Array.isArray(value)) {
                        return false;
                    }
                    return value.some((eventType) =>
                        [
                            "art",
                            "atelier",
                            "concert",
                            "conference",
                            "dj",
                            "film",
                            "food",
                            "health",
                            "humour",
                            "podcast",
                            "randonee",
                            "social",
                            "soiree",
                            "sport",
                            "theatre",
                        ].includes(eventType)
                    );
                }
            )
            .required("Event type est requis"),
        endDate: Yup.date().required("End date est requis"),
        location: Yup.string().required("Location est requis"),
        eventDesc
            : Yup.string().required(
                "Description de l'évènement est requis"
            ),
        tags: Yup.array().of(Yup.string()),
    });

    const stepValidationSchemas = [
        Yup.object({
            eventName: Yup.string().required("Nom de l'évènement est requis"),
            eventType: Yup.mixed()
                .test(
                    "valid-event-type",
                    "Event type must be one of the following",
                    (value) => {
                        if (!Array.isArray(value)) {
                            return false;
                        }
                        return value.some((eventType) =>
                            [
                                "art",
                                "atelier",
                                "concert",
                                "conference",
                                "dj",
                                "film",
                                "food",
                                "health",
                                "humour",
                                "podcast",
                                "randonee",
                                "social",
                                "soiree",
                                "sport",
                                "theatre",
                            ].includes(eventType)
                        );
                    }
                )
                .required("Event type est requis"),
            startDate: Yup.date().required("Start date est requis"),
            endDate: Yup.date().required("End date est requis"),
            location: Yup.string().required("Location est requis"),
        }),
        Yup.object({
            eventDesc
                : Yup.string().required(
                    "Description de l'évènement est requis"
                ),
        }),
        Yup.object({
            tags: Yup.array().of(Yup.string()),
        }),
    ];

    const steps = ["Event Details", "Event Content", "Tags"];
    const handleNext = async () => {
        const currentStepSchema = stepValidationSchemas[activeStep];
        try {
            await currentStepSchema.validate(formik.values);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (err) {
            console.log("Validation error: ", err);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const formik = useFormik({
        initialValues: {
            eventName: event.eventName,
            eventName: event.eventName,
            eventType: Array.isArray(event.eventType) ? event.eventType : [event.eventType],
            startDate: event.startDate,
            endDate: event.endDate,
            location: event.location,
            eventDesc: event.eventDesc,
            legalDescription: event.legalDescription,
            eventBanner: event.eventBanner,
            tags: Array.isArray(event.tags) ? event.tags : [event.tags],
            legalDescriptionEnabled: event.legalDescriptionEnabled,
            eventBannerFile: null,
        },
        validationSchema: stepValidationSchemas[activeStep],
        onSubmit: async (values) => {
            // Format startDate and endDate
            const startDate = new Date(values.startDate);
            startDate.setHours(0, 0, 0, 0);
            const formattedStartDate = startDate.toISOString().split("T")[0];

            const endDate = new Date(values.endDate);
            endDate.setHours(0, 0, 0, 0);
            const formattedEndDate = endDate.toISOString().split("T")[0];
            // Create a FormData instance
            const formData = new FormData();

            // Create the data object
            const data = {
                eventName: values.eventName,
                eventType: Array.isArray(values.eventType)
                    ? values.eventType
                    : values.eventType ? [values.eventType] : [],
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                location: geolocation,
                eventDesc: values.eventDesc,
                legalDesc: values.legalDescription,
                tags: Array.isArray(values.tags) ? values.tags : values.tags ? [values.tags] : [],

                // publishedAt: null,
            };
            // Append the data object to formData
            formData.append("data", JSON.stringify(data));
            // Object.keys(data).forEach(e => {
            //   formData.append(e, data[e]);
            // })
            // Append the eventBanner file to formData
            formData.append("files.eventBanner", values.eventBannerFile);
            try {
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${router.query.personalId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if (response.status !== 200) {
                    throw new Error("Failed to submit the form data");
                }
                router.push("/personal");
            } catch (error) {
                console.error(error);
            }
        },

        validate: (values) => {
            let errors = {};

            // Use stepValidationSchemas for each step
            const schema = stepValidationSchemas[activeStep];
            try {
                schema.validateSync(values, { abortEarly: false });
            } catch (error) {
                console.log("Validation error:", error);
                error.inner?.forEach((err) => {
                    errors[err.path] = err.message;
                });
            }

            return errors;
        },
    });
    const getLocationData = useCallback(
        (coords) => {
            setgeolocation(coords);
            formik.setFieldValue("location", coords);
        },
        [formik, setgeolocation]
    );
    const onBannerDrop = useCallback((acceptedFiles, replace = false) => {
        formik.setFieldValue("eventBannerFile", acceptedFiles[0]);
        if (replace) {
            setBannerPreview(URL.createObjectURL(acceptedFiles[0]));
        } else {
            setBannerPreview(URL.createObjectURL(acceptedFiles[0]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        getRootProps: getBannerRootProps,
        getInputProps: getBannerInputProps,
    } = useDropzone({ onDrop: onBannerDrop, accept: "image/*", multiple: false });

    const handleReplaceImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            onBannerDrop([file], true);
        });
        input.click();
    };
    const fetchEvent = () => {
        axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${router.query.personalId}?populate=*`
        ).then(res => {
            formik.setValues(res.data.data.attributes);

        }).catch(err => console.log(err))

    }
    useEffect(() => {
        fetchEvent()
    }, [])
    console.log(formik?.values);
    /* The above code is a React component that renders a form for creating an event. It uses Material-UI
    components and Formik library for form handling. The form is divided into multiple steps using a
    Stepper component. The user can navigate between steps using the Back and Next buttons. The form
    includes fields for event name, type, start and end dates, location, description, legal
    description, tags, and banner image. The form data is validated using a combined validation schema
    before submitting the form. */
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="container h-screen min-h-[120vh] mx-auto mt-10 flex-col items-center justify-center md:w-[70%] ">
                    <h1 className="text-3xl mb-5 text-white font-monument">
                        MODIFICATION d'évènement
                    </h1>
                    <FormikProvider value={formik}>
                        <FormGroup
                            sx={{
                                gap: 3,
                            }}
                            color="main"
                        >
                            <Stepper activeStep={activeStep} orientation="horizontal">
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === 0 && (
                                <>
                                    <TextField
                                        inputProps={{
                                            style: {
                                                fontSize: "25px",

                                                // WebkitBoxShadow: "0 0 0 100px #52525b inset",
                                            },
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                fontSize: "25px",
                                            },
                                        }}
                                        name="eventName"
                                        placeholder="Nom de l'événement"
                                        {...formik.getFieldProps("eventName")}
                                        error={
                                            formik.touched.eventName &&
                                            Boolean(formik.errors.eventName)
                                        }
                                        helperText={
                                            formik.touched.eventName && formik.errors.eventName
                                        }
                                    />

                                    <FormControl
                                        component="paper"
                                        className=" px-6 py-7 rounded-lg"
                                    >
                                        <FormLabel
                                            sx={{ fontWeight: 600 }}
                                            component="legend"
                                            className=" text-white tracking-wider"
                                        >
                                            Type d&apos;évènement
                                        </FormLabel>
                                        <p className="text-xs text-gray-400 pb-4">
                                            Vous pouvez sélectionner plusieurs options
                                        </p>
                                        <Grid
                                            container
                                            spacing={3}
                                            sx={{ display: "flex", flexWrap: "wrap", color: "white" }}
                                        >
                                            {[
                                                { icon: <Art />, primary: "Art", value: "art" },
                                                {
                                                    icon: <Atelier />,
                                                    primary: "Atelier",
                                                    value: "atelier",
                                                },
                                                {
                                                    icon: <Concerts />,
                                                    primary: "Concert",
                                                    value: "concert",
                                                },
                                                {
                                                    icon: <Conference />,
                                                    primary: "Conférence",
                                                    value: "conference",
                                                },
                                                { icon: <Dj />, primary: "DJ", value: "dj" },
                                                { icon: <Film />, primary: "Film", value: "film" },
                                                {
                                                    icon: <Food />,
                                                    primary: "Nourriture et Boissons",
                                                    value: "food",
                                                },
                                                {
                                                    icon: <Health />,
                                                    primary: "Bien-être",
                                                    value: "health",
                                                },
                                                {
                                                    icon: <Humour />,
                                                    primary: "Humour",
                                                    value: "humour",
                                                },
                                                {
                                                    icon: <Podcast />,
                                                    primary: "Podcast",
                                                    value: "podcast",
                                                },
                                                {
                                                    icon: <Randonnee />,
                                                    primary: "Randonnée",
                                                    value: "randonee",
                                                },
                                                {
                                                    icon: <Social />,
                                                    primary: "Social",
                                                    value: "social",
                                                },
                                                {
                                                    icon: <Soiree />,
                                                    primary: "Soirée",
                                                    value: "soiree",
                                                },
                                                { icon: <Sport />, primary: "Sport", value: "sport" },
                                                {
                                                    icon: <Theatre />,
                                                    primary: "Théâtre",
                                                    value: "theatre",
                                                },
                                            ].map(({ icon, primary, value }) => (
                                                <Grid key={value} item sx={{ flex: "1 0 auto" }}>
                                                    <ListItem
                                                        sx={{
                                                            flexDirection: "column",
                                                            borderRadius: "5px",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            width: "100%",
                                                            border: "2px solid #7f7f7fff",
                                                            pt: 2,
                                                        }}
                                                        button
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            {icon}
                                                        </ListItemIcon>
                                                        <ListItemText primary={primary} />
                                                        <Checkbox
                                                            checked={Array.from(
                                                                formik.values.eventType || []
                                                            ).includes(value)}
                                                            onChange={formik.handleChange}
                                                            value={value}
                                                            name="eventType"
                                                            color="primary"
                                                            checkedIcon={
                                                                <CheckCircle sx={{ color: "primary.main" }} />
                                                            }
                                                            icon={<RadioButtonUnchecked />}
                                                            er
                                                        />
                                                    </ListItem>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        {formik.errors.eventType ? (
                                            <div className="text-red-500">
                                                {formik.errors.eventType}
                                            </div>
                                        ) : null}
                                    </FormControl>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "start",
                                            alignItems: "center",
                                        }}
                                    >
                                        <DatePicker
                                            label="Start Date"
                                            value={
                                                formik.values.startDate
                                                    ? new Date(formik.values.startDate)
                                                    : null
                                            }
                                            onChange={(value) => {
                                                formik.setFieldValue("startDate", value);
                                            }}
                                            minDate={new Date()}
                                            format="dd/MM/yyyy"
                                            renderInput={(props) => <TextField {...props} />}
                                        />
                                        <Box sx={{ mx: 2, color: "white" }}>to</Box>
                                        <DatePicker
                                            label="End Date"
                                            value={
                                                formik.values.endDate
                                                    ? new Date(formik.values.endDate)
                                                    : null
                                            }
                                            onChange={(value) => {
                                                formik.setFieldValue("endDate", value);
                                            }}
                                            minDate={
                                                formik.values.startDate
                                                    ? new Date(formik.values.startDate)
                                                    : null
                                            }
                                            format="dd/MM/yyyy"
                                            renderInput={(props) => <TextField {...props} />}
                                        />
                                    </Box>

                                    <FormControl fullWidth>
                                        <Places

                                            selected={formik.values.location}
                                            setSelected={setSelected}
                                            setgeolocation={getLocationData}
                                        />
                                    </FormControl>
                                </>
                            )}

                            {activeStep === 1 && (
                                <>
                                    <TextField
                                        id="eventDesc"
                                        name="eventDesc"
                                        label="Description de l'évènement"
                                        fullWidth
                                        multiline
                                        rows={6}
                                        value={formik.values.eventDesc}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.eventDesc &&
                                            Boolean(formik.errors.eventDesc)
                                        }
                                        helperText={
                                            formik.touched.eventDesc &&
                                            formik.errors.eventDesc
                                        }
                                        InputProps={{
                                            inputProps: {
                                                style: {
                                                    maxHeight: "200px",
                                                    overflowY: "auto",
                                                },
                                            },
                                        }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formik.values.legalDescriptionEnabled}
                                                onChange={formik.handleChange}
                                                name="legalDescriptionEnabled"
                                            />
                                        }
                                        className="text-white"
                                        label="Ajouter une description légale sur les billets"
                                    />
                                    {formik.values.legalDescriptionEnabled && (
                                        <TextField
                                            name="legalDescription"
                                            label="Legal Description"
                                            {...formik.getFieldProps("legalDescription")}
                                            multiline
                                        />
                                    )}

                                    <div className="flex-col gap-2 text-white">
                                        <label className="flex items-center gap-2" htmlFor="">
                                            <ImageOutlined /> Bannière
                                        </label>
                                        <p className="text-xs text-gray-400">
                                            La bannière sera utilisée à travers la plateforme
                                            Soukticket. Choisissez-en une qui corresponde bien à votre
                                            identité de marque.
                                        </p>
                                        {bannerPreview ? (
                                            <div
                                                onClick={handleReplaceImage}
                                                className="border border-gray-300 p-4 rounded mt-4 cursor-pointer hover:border-dashed hover:border-yellow-500 lg:h-[270px] lg:w-[480px] "
                                            >
                                                <Image
                                                    src={bannerPreview}
                                                    alt="Event banner preview"
                                                    className="object-cover w-full h-full"
                                                    width={250}
                                                    height={250}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                {...getBannerRootProps()}
                                                className="border border-gray-300 p-4 rounded mt-4 cursor-pointer hover:border-dashed hover:border-yellow-500 md:w-1/2"
                                            >
                                                <input {...getBannerInputProps()} />
                                                <Image src={formik.values.eventBanner.data.attributes.url} width={300}
                                                    height={400} />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            {activeStep === 2 && (
                                <>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="tags">Tags</InputLabel>
                                        <Select
                                            multiple
                                            value={Array.isArray(formik.values.tags) ? formik.values.tags : formik.values.tags ? [formik.values.tags] : []}
                                            onChange={(event) => {
                                                const selectedValues = Array.isArray(event.target.value)
                                                    ? event.target.value
                                                    : event.target.value ? [event.target.value] : [];
                                                formik.setFieldValue("tags", selectedValues);
                                            }}
                                        >
                                            {/* Add MenuItem components for each available tag */}
                                            <MenuItem value="tag1">Tag 1</MenuItem>
                                            <MenuItem value="tag2">Tag 2</MenuItem>
                                            <MenuItem value="tag3">Tag 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                            <div className="mt-4 flex gap-4">
                                <Button
                                    sx={{
                                        border: 1,
                                        borderColor: "#b5b5b5",
                                        color: "#b5b5b5",
                                        fontWeight: 500,
                                        "&:hover": {
                                            color: "#2d2d2d",
                                            fontWeight: 600,
                                            backgroundColor: "#d9d9d9",
                                        },
                                    }}
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    sx={{
                                        border: 1,
                                        borderColor: "#F9A826",
                                        color: "#f2f2f2",
                                        fontWeight: 500,
                                        "&:hover": {
                                            color: "#2d2d2d",
                                            fontWeight: 600,
                                            backgroundColor: "#F9A826",
                                        },
                                    }}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    // onClick={
                                    //   activeStep === steps.length - 1
                                    //     ? formik.submitForm
                                    //     : handleNext
                                    // }
                                    onClick={async () => {
                                        if (activeStep === steps.length - 1) {
                                            try {
                                                await combinedValidationSchema.validate(formik.values, {
                                                    abortEarly: false,
                                                });
                                                formik.submitForm();
                                            } catch (error) {
                                                console.error("Validation error:", error);
                                            }
                                        } else {
                                            handleNext();
                                        }
                                    }}
                                >
                                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                </Button>
                            </div>
                        </FormGroup>
                    </FormikProvider>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default EditEvent;
