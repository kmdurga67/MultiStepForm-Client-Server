import React, { useState } from "react";
import { toast } from "react-toastify";
import PersonalInformation from "./PersonalInformation";
import ContactDetails from "./ContactDetails";
import Address from "./Address";
import TermCondition from "./TermCondition";
import Review from "./Review";
import useStyles from "./styles";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import FormSubmitted from "./FormSubmitted";
import axios from "axios";

const steps = [
  "Personal Information",
  "Contact Details",
  "Address",
  "Agree & Continue",
  "Review & Submit",
];

const Form = () => {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    agree: false,
    profilePicture: null,
    hobbies: "",
    gender: "",
    graduation: "",
    alternatemobile: "",
    country: "",
    state: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  //adding stepper to the form to track steps
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const submitForm = async () => {
    // If the user is in the last step, perform the final form submission
    if (step === steps.length - 1) {
      try {
        await axios.post("http://localhost:5000/api/formdata", formData);

        console.log("Final Form Data:", formData);
        toast.success("Form submitted successfully!");

        setTimeout(() => {
          setIsSubmitted(true);
        }, 8000); //after 8 sec message will be displaying
      } catch (error) {
        toast.error("Failed to submit form.");
      }
    } else {
      // Move to the next step
      nextStep();
    }
  };

  const updateFormData = (stepData) => {
    // Update the formData with the current step's data
    setFormData((prevData) => {
      return { ...prevData, ...stepData };
    });
  };

  // Render the FormSubmitted component if the form is successfully submitted
  if (isSubmitted) {
    return <FormSubmitted />;
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <PersonalInformation
            formData={formData}
            setFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <ContactDetails
            formData={formData}
            setFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <Address
            formData={formData}
            setFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <TermCondition
            formData={formData}
            setFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Review
            formData={formData}
            prevStep={prevStep}
            submitForm={submitForm}
            nextStep={nextStep}
          />
        );
      default:
        return (
          <PersonalInformation
            formData={formData}
            setFormData={updateFormData}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <div className={classes.formContainer}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.formStep}>{renderStep()}</div>
      {/* <div className={classes.formActions}>
        {step > 0 && (
          <Button variant="contained" color="primary" onClick={prevStep}>
            Previous
          </Button>
        )}
        {step < steps.length - 1 && (
          <Button variant="contained" color="primary" onClick={nextStep}>
            Next
          </Button>
        )}
      </div> */}
    </div>
  );
};

export default Form;
