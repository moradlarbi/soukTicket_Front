import { useCallback, useState } from "react";
import { useFormik, FormikProvider, Field, FieldArray, ErrorMessage } from "formik";
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
  InputAdornment,
  InputLabel,
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
  Typography,
  createTheme
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  AddPhotoAlternateOutlined,
  ImageOutlined,
  CheckCircle,
  RadioButtonUnchecked,
  RemoveCircle,
  Add,
} from "@mui/icons-material";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Places from "@/pages/organizer/map";
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

const EventCreation = ({ user, jwt }) => {

  const [bannerPreview, setBannerPreview] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const [selected, setSelected] = useState(null);
  const [geolocation, setgeolocation] = useState("");

  const router = useRouter();

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
    eventDescription: Yup.string().required(
      "Description de l'évènement est requis"
    ),
    tags: Yup.array().of(Yup.string()),
    tickets: Yup.array().of(Yup.object({
      name: Yup.string().required("Ticket name is required"),
      price: Yup.number().required("Ticket price is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date().required("End date is required"),
      numberOfTickets: Yup.number().required("Number of tickets is required"),
    }))
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
      eventDescription: Yup.string().required(
        "Description de l'évènement est requis"
      ),
    }),
    Yup.object({
      tags: Yup.array().of(Yup.string()),
    }),
    Yup.object({
      tickets: Yup.array().of(Yup.object({
        name: Yup.string().required("Ticket name is required"),
        price: Yup.number().required("Ticket price is required"),
        startDate: Yup.date().required("Start date is required"),
        endDate: Yup.date().required("End date is required"),
        numberOfTickets: Yup.number().required("Number of tickets is required"),
      })),
    }),
  ];

  const steps = ["Event Details", "Event Content", "Tags","Tickets"];
  const handleNext = async () => {
    const currentStepSchema = stepValidationSchemas[activeStep];
    try {
      await currentStepSchema.validate(formik.values);
      console.log(formik.errors)
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
      eventName: "",
      eventType: [],
      startDate: null,
      endDate: null,
      location: "",
      eventDescription: "",
      legalDescription: "",
      eventBanner: null,
      tags: [],
      legalDescriptionEnabled: false,
      eventBannerFile: null,
      tickets: [
        {
          numberOfTickets: 1,
          name: '',
          price: 0,
          startDate: null,
          endDate: null,
        },
      ],
    },
    validationSchema: stepValidationSchemas[activeStep],
    onSubmit: async (values) => {
      
      // Format startDate and endDate
      const formattedStartDate = format(values.startDate, "yyyy-MM-dd");
      const formattedEndDate = format(values.endDate, "yyyy-MM-dd");
      let tickets = values.tickets

      // Create a FormData instance
      const formData = new FormData();

      // Create the data object
      const data = {
        eventName: values.eventName,
        eventType: Array.isArray(values.eventType)
          ? values.eventType
          : [values.eventType],
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        location: geolocation,
        eventDesc: values.eventDescription,
        legalDesc: values.legalDescription || "",
        tags: Array.isArray(values.tags) ? values.tags : [],
        publishedAt: null,
        tickets: tickets,
      };
      
      // Append the data object to formData
      formData.append("data", JSON.stringify(data));
      formData.append("files.eventBanner", values.eventBannerFile);
      try {
        console.log("formik",data)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/events`,
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
      console.log(coords);
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


  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="container h-full mx-auto mt-10 flex-col items-center justify-center md:w-[70%] pb-10 ">
          <h1 className="text-3xl mb-5 text-white font-monument">
            Création d'évènement
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
                    <DateTimePicker
                      label="Start Date and Time"
                      value={
                        formik.values.startDate
                          ? new Date(formik.values.startDate)
                          : null
                      }
                      onChange={(value) => {
                        formik.setFieldValue("startDate", value);
                      }}
                      minDateTime={new Date()}
                      format="dd/MM/yyyy hh:mm a"
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
                      selected={selected}
                      setSelected={setSelected}
                      setgeolocation={getLocationData}
                    />
                  </FormControl>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <TextField
                    id="eventDescription"
                    name="eventDescription"
                    label="Description de l'évènement"
                    fullWidth
                    multiline
                    rows={6}
                    value={formik.values.eventDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.eventDescription &&
                      Boolean(formik.errors.eventDescription)
                    }
                    helperText={
                      formik.touched.eventDescription &&
                      formik.errors.eventDescription
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
                        <div className="flex flex-col items-center justify-center gap-2">
                          <AddPhotoAlternateOutlined
                            style={{
                              fontSize: 50,
                              color: "#E5E7EB",
                            }}
                          />
                          <p>1920x1080</p>
                          <p>Image</p>
                        </div>
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
                      name="tags"
                      label="Tags"
                      multiple
                      value={formik.values.tags}
                      onChange={formik.handleChange}
                      inputProps={{
                        name: "tags",
                        id: "tags",
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
              {activeStep === 3 && (
                <FieldArray name="tickets">
                  {({ push, remove }) => (
                    <>
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                      {formik.values.tickets.map((ticket, index) => (
                        <Box key={index} sx={{display:"flex", alignItems:"center",gap:"5px"}}>
                          <Field
                            name={`tickets[${index}].name`}
                            label="Name"
                            as={TextField}
                            error={Boolean(formik.errors.tickets?.[index]?.name)}
                            helperText={<ErrorMessage name={`tickets[${index}].name`} />}
                          />
                          <Field
                            name={`tickets[${index}].price`}
                            label="Price"
                            type="number"
                            as={TextField}
                            error={Boolean(formik.errors.tickets?.[index]?.price)}
                            helperText={<ErrorMessage name={`tickets[${index}].price`} />}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">DZD</InputAdornment>
                              ),
                            }}
                          />
                          <Field
                            name={`tickets[${index}].numberOfTickets`}
                            label="Number of tickets"
                            type="number"
                            as={TextField}
                            error={Boolean(formik.errors.tickets?.[index]?.numberOfTickets)}
                            helperText={<ErrorMessage name={`tickets[${index}].numberOfTickets`} />}
                          />
                          <DateTimePicker
                            label="Start Date and Time"
                            value={
                              formik.values.tickets[index].startDate
                                ? new Date(formik.values.tickets[index].startDate)
                                : null
                            }
                            onChange={(value) => {
                              formik.setFieldValue(`tickets[${index}].startDate`, value);
                            }}
                            minDateTime={new Date()}
                            format="dd/MM/yyyy hh:mm a"
                            renderInput={(props) => <TextField {...props} />}
                          />
                          <DateTimePicker
                            label="End Date and Time"
                            value={
                              formik.values.tickets[index].endDate
                                ? new Date(formik.values.tickets[index].endDate)
                                : null
                            }
                            onChange={(value) => {
                              formik.setFieldValue(`tickets[${index}].endDate`, value);
                            }}
                            minDateTime={new Date(formik.values.tickets[index].startDate)}
                            format="dd/MM/yyyy hh:mm a"
                            renderInput={(props) => <TextField {...props} />}
                          />
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <RemoveCircle />
                          </Button>
                        </Box>
                      ))}
                    </Box>
                    <Button
                        type="button"
                        sx={{
                          display:"flex",gap:"5px"
                        }}
                        onClick={() =>
                          push({
                            numberOfTickets: 1,
                            name: '',
                            price: 0,
                            startDate: null,
                            endDate: null,
                          })
                        }
                      >
                        <Typography>Add New Slug of Tickets </Typography>
                        <Add />
                        
                      </Button>
                    </>
                    
                  )}
                </FieldArray>
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
                        console.log(formik.values);
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

export default EventCreation;
