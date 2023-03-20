import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Select from "../common/Select";
import Loading from "../UI/Loading";
import SubjectRating from "../common/SubjectRating";
import FeedbackParameters from "../../models/FeedbackParameters";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import { Alert } from "@mui/material";

const steps = ["Select Electives", "Feedback"];

const MainSubjects: string[] = [
  "MA1408 NUMERICAL METHODS, COMPLEX AND FOURIER ANALYSIS",
  "CS1403 DATABASE MANAGEMENT SYSTEMS",
  "CS1405 DESIGN AND ANALYSIS OF ALGORITHMS",
  "CS1406 ADVANCED COMPUTER ORGANIZATION & ARCHITECTURE",
];

const Labs: string[] = [
  "CS1462 DATABASE MANAGEMENT SYSTEMS LAB",
  "CS1464 ADVANCED PROGRAMMING LAB",
  "CS1465 ALGORITHM LAB",
];

const ElectiveII: string[] = [
  "CS1438/CS1431/CS1843 MICROPROCESSOR",
  "CS1440/CS1425 INTERNET, TECHNOLOGY AND SOCIETY",
  "CS1439/1407 COMMUNICATION TECHNIQUES",
  "CS1437/1422 ERP",
];

const ElectiveIII: string[] = [
  "CS1442 UI/UX",
  "CS1434 JAVA PROGRAMMING",
  "CS1435 PYTHON PROGRAMMING",
  "CS1436 FUNDAMENTALS OF WEB TECHNOLOGY",
];

const ratingKeys = FeedbackParameters.reduce(
  (acc, key) => ({ ...acc, [key]: null }),
  {}
);

const FourthFeedback = () => {
  const content = <MainPageContent />;

  return content;
};

const MainPageContent = () => {
  const [ratingsDetail, setRatingsDetail] = useState<any>({});

  useEffect(() => {
    MainSubjects.forEach((subject) => {
      setRatingsDetail((prevValue: any) => {
        return {
          ...prevValue,
          [subject]: { ...ratingKeys },
        };
      });
    });
    Labs.forEach((subject) => {
      setRatingsDetail((prevValue: any) => {
        return {
          ...prevValue,
          [subject]: { ...ratingKeys },
        };
      });
    });
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const [ratingsDetailElectiveTwo, setRatingsDetailElectiveTwo] = useState<any>(
    {}
  );
  const [ratingsDetailElectiveThree, setRatingsDetailElectiveThree] =
    useState<any>({});

  const [electiveTwo, setElectiveTwo] = useState("");

  const handleElectiveTwoChange = (value: string) => {
    setElectiveTwo(value);
    setRatingsDetailElectiveTwo({ [value]: ratingKeys });
  };

  const [section, setSection] = useState("");

  const handleSectionChange = (value: string) => {
    setSection(value);
  };

  const [electiveThree, setElectiveThree] = useState("");

  const handleElectiveThreeChange = (value: string) => {
    setElectiveThree(value);
    setRatingsDetailElectiveThree({ [value]: ratingKeys });
  };

  const handleSubjectRatingChange = (
    subjectName: string,
    label: string,
    value: number | null
  ) => {
    setRatingsDetail((prevValue: any) => {
      return {
        ...prevValue,
        [subjectName]: {
          ...prevValue[subjectName],
          [label]: value,
        },
      };
    });
  };

  const handleSubjectRatingChangeElectiveTwo = (
    subjectName: string,
    label: string,
    value: number | null
  ) => {
    setRatingsDetailElectiveTwo((prevValue: any) => {
      return {
        ...prevValue,
        [subjectName]: {
          ...prevValue[subjectName],
          [label]: value,
        },
      };
    });
  };

  const handleSubjectRatingChangeElectiveThree = (
    subjectName: string,
    label: string,
    value: number | null
  ) => {
    setRatingsDetailElectiveThree((prevValue: any) => {
      return {
        ...prevValue,
        [subjectName]: {
          ...prevValue[subjectName],
          [label]: value,
        },
      };
    });
  };

  const [invalidForm, setInvalidForm] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const finalRatings = {
      ...ratingsDetail,
      ...ratingsDetailElectiveTwo,
      ...ratingsDetailElectiveThree,
    };
    for (let key in finalRatings) {
      for (let label in finalRatings[key]) {
        if (finalRatings[key][label] === null) {
          setInvalidForm(true);
          return;
        }
      }
    }
    setInvalidForm(false);
    const response = await fetch(`/api/feedback/submit`, {
      method: "POST",
      body: JSON.stringify({
        ratingData: { ...finalRatings },
        section: section,
        semester: 4,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setSubmitted(true);
    }
  };

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        paddingTop: "2rem",
      }}
    >
      <Card sx={{ minWidth: "60vw", maxWidth: "100vw", margin: "auto" }}>
        <CardContent>
          {submitted && (
            <Alert severity="success">
              Thank you for submitting for your valuable feedback
            </Alert>
          )}
          {!submitted && (
            <div>
              <Typography
                sx={{
                  fontSize: 14,
                  textAlign: "center",
                }}
                color="text.primary"
                gutterBottom
              >
                Please provide your valuable feedback
              </Typography>
              <Box sx={{ maxWidth: "100%", alignItems: "center" }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step}>
                      <StepLabel
                        optional={
                          index === 2 ? (
                            <Typography variant="caption">Last step</Typography>
                          ) : null
                        }
                      >
                        {step}
                      </StepLabel>
                      <StepContent TransitionProps={{ unmountOnExit: false }}>
                        {index === 0 && (
                          <>
                            <Select
                              label="Elective II"
                              options={ElectiveII}
                              handleSelectionChange={handleElectiveTwoChange}
                            />
                            <Select
                              label="Elective III"
                              options={ElectiveIII}
                              handleSelectionChange={handleElectiveThreeChange}
                            />
                            <Select
                              label="Section"
                              options={["A", "B", "C"]}
                              handleSelectionChange={handleSectionChange}
                            />
                          </>
                        )}
                        {index === 1 && (
                          <Box sx={{ m: 1 }}>
                            {MainSubjects.map((subject) => (
                              <SubjectRating
                                key={subject}
                                subjectLabel={subject}
                                subjectRatings={handleSubjectRatingChange}
                              ></SubjectRating>
                            ))}
                            {electiveTwo !== "" && (
                              <SubjectRating
                                subjectLabel={electiveTwo}
                                subjectRatings={
                                  handleSubjectRatingChangeElectiveTwo
                                }
                              />
                            )}
                            {electiveThree !== "" && (
                              <SubjectRating
                                subjectLabel={electiveThree}
                                subjectRatings={
                                  handleSubjectRatingChangeElectiveThree
                                }
                              />
                            )}
                            {Labs.map((subject) => (
                              <SubjectRating
                                key={subject}
                                subjectLabel={subject}
                                subjectRatings={handleSubjectRatingChange}
                              />
                            ))}
                          </Box>
                        )}
                        <Box sx={{ mb: 2 }}>
                          <div>
                            {index === steps.length - 1 ? (
                              <Box sx={{ m: "auto", width: "300px" }}>
                                <Button
                                  variant="contained"
                                  sx={{ mt: 1, mr: 1, mb: 1 }}
                                  onClick={handleSubmit}
                                  disabled={!invalidForm && submitting}
                                >
                                  Finish
                                </Button>
                                {submitting && invalidForm && (
                                  <Chip
                                    label="Please fill all the fields"
                                    color="error"
                                  />
                                )}
                                {submitting && !invalidForm && (
                                  <>
                                    <Chip
                                      label="Submitting form"
                                      color="success"
                                    />
                                    <LinearProgress />
                                  </>
                                )}
                              </Box>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                                disabled={
                                  electiveTwo === "" ||
                                  electiveThree === "" ||
                                  section === ""
                                }
                              >
                                Continue
                              </Button>
                            )}
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default FourthFeedback;
