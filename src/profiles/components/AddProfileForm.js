import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { TextField, Button } from "@material-ui/core";
import { ProfilesContext } from "../../shared/contexts/ProfilesContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

const formatPhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) return value;
  return phoneNumber.formatInternational();
};

// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const FILE_SIZE = 1000000;

const AddProfileForm = () => {
  const classes = useStyles();

  const schema = yup.object().shape({
    name: yup.object().shape({
      first: yup
        .string()
        .matches(/^([^0-9]*)$/, "Please enter a valid value")
        .required("required field")
        .min(2)
        .max(10),
      last: yup
        .string()
        .matches(/^([^0-9]*)$/, "Please enter a valid value")
        .required("required field")
        .min(1)
        .max(15),
    }),
    eyes: yup
      .string()
      .matches(/^([^0-9]*)$/, "Please enter a valid value")
      .required("required field")
      .min(4)
      .max(5),
    hair: yup
      .string()
      .matches(/^([^0-9]*)$/, "Please enter a valid value")
      .required("required field")
      .min(5)
      .max(10),
    height: yup
      .string()
      .required("required field")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(3)
      .max(3),
    bust: yup
      .string()
      .required("required field")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(2)
      .max(2),
    waist: yup
      .string()
      .required("required field")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(2)
      .max(2),
    hips: yup
      .string()
      .required("required field")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(2)
      .max(2),
    shoes: yup
      .string()
      .required("required field")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(1),
    email: yup
      .string()
      .email("Please enter a valid value")
      .required("required field"),
    phone: yup.string().required("required field"),
    notes: yup.string().max(30),
    mainImg: yup
      .mixed()
      .required("required field")
      .test("fileSize", "File too large", (v) => v && v[0].size <= FILE_SIZE),
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   (v) => v && SUPPORTED_FORMATS.includes(v.type),
    // ),
  });

  const { errors, control, formState, register } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const history = useHistory();
  const { addProfile } = useContext(ProfilesContext);

  const onSubmit = (e) => {
    console.log(e, "e");
    e.preventDefault();
    e.persist();
    const form = e.target;
    console.log("onSubmit formvalues", form);
    const data = new FormData(form);
    console.log(data, "data");
    addProfile(data);
    history.push("/");
    form.reset();
  };
  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className={classes.root}
      // action="/profiles"
      // method="POST"
    >
      <Controller
        as={TextField}
        error={!!errors.name && errors.name.first}
        helperText={
          errors.name && errors.name.first && errors.name.first.message
        }
        id="firstName"
        name="name.first"
        label="First Name"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.name && errors.name.last}
        helperText={errors.name && errors.name.last && errors.name.last.message}
        id="lastName"
        name="name.last"
        label="Larst Name"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.eyes}
        helperText={errors.eyes && errors.eyes.message}
        id="eyes"
        name="eyes"
        label="Eyes"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.hair}
        helperText={errors.hair && errors.hair.message}
        id="hair"
        name="hair"
        label="Hair"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.height}
        helperText={errors.height && errors.height.message}
        id="height"
        name="height"
        label="Height (cm)"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.bust}
        helperText={errors.bust && errors.bust.message}
        id="bust"
        name="bust"
        label="Bust"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.waist}
        helperText={errors.waist && errors.waist.message}
        id="waist"
        name="waist"
        label="Waist"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.hips}
        helperText={errors.hips && errors.hips.message}
        id="hips"
        name="hips"
        label="Hips"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.shoes}
        helperText={errors.shoes && errors.shoes.message}
        id="shoes"
        name="shoes"
        label="Shoes"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.email}
        helperText={errors.email && errors.email.message}
        id="email"
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.phone}
        helperText={errors.phone && errors.phone.message}
        id="phone"
        name="phone"
        label="Phone"
        type="tel"
        variant="outlined"
        control={control}
        rules={{ required: true }}
        onChange={(e) => (e.target.value = formatPhoneNumber(e.target.value))}
        defaultValue=""
      />
      <Controller
        as={TextField}
        error={!!errors.notes}
        helperText={errors.notes && errors.notes.message}
        id="notes"
        name="notes"
        label="Notes"
        variant="outlined"
        control={control}
        multiline
        defaultValue=""
      />
      <div>
        <input
          accept=".jpg,.jpeg,.png"
          className={classes.input}
          id="contained-button-file"
          type="file"
          name="mainImg"
          ref={register}
          control={control}
        />

        <label htmlFor="contained-button-file">
          <Button
            className={classes.button}
            variant="outlined"
            size="large"
            component="span"
          >
            Upload Photo (maximum 1mb)
          </Button>
        </label>
        {errors.mainImg && <p>The file is too large</p>}
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        disabled={!formState.isValid}
      >
        Create Profile
      </Button>
    </form>
  );
};

export default AddProfileForm;
