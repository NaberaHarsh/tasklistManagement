import React, { Fragment, FunctionComponent, useState, useEffect } from "react";
import { TextField, Paper, Button, Container, Grid } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./login.css";

interface IProps {
  taskName: string;
  setTaskName: (e: string) => {};
  description: string;
  setDescription: (e: string) => {};
  startTime: any;
  setStartTime: (e: any) => {};
  endTime: any;
  setEndTime: (e: any) => {};
  isEdit: boolean;
  handleSubmit: () => {};
  handleUpdataData: () => {};
  handleReset: () => {};
}

const CreateTask: FunctionComponent<IProps> = ({
  taskName,
  setTaskName,
  description,
  setDescription,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  isEdit,
  handleSubmit,
  handleUpdataData,
  handleReset,
}) => {
  const [errors, setErrors] = useState<{
    taskName: string;
    description: string;
    startTime: string;
    endTime: string;
  }>({
    taskName: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    return () => {
      handleReset();
    };
  });

  let startDateError: string = "";
  let endDateError: string = "";

  const t1 = new Date(startTime).getTime();
  const t2 = new Date(endTime).getTime();

  if (t1 < t2) {
    startDateError = "";
  } else {
    startDateError = "Start date and time must be less than end date and time";
  }

  if (t2 > t1) {
    endDateError = "";
  } else {
    endDateError = "End date and time must be greater than start date and time";
  }

  const validateForm = () => {
    let errors = {
      taskName: "",
      description: "",
      startTime: "",
      endTime: "",
    };

    if (!taskName) {
      errors.taskName = "Taskname is Required";
    }
    if (!description) {
      errors.description = "Description is Required";
    }
    if (!startTime) {
      errors.startTime = "Start date & time is Required";
    }
    if (!endTime) {
      errors.endTime = "End date & Time is Required";
    }
    setErrors(errors);

    if (taskName)
      if (description)
        if (startTime && !startDateError)
          if (endTime && !endDateError) {
            return true;
          } else {
            return false;
          }
  };

  const handleSubmitData = () => {
    let proceed: any = false;
    proceed = validateForm();
    if (proceed) {
      handleSubmit();
    }
  };

  const handleUpdateExistingData = () => {
    let proceed: any = false;
    proceed = validateForm();
    if (proceed) {
      handleUpdataData();
    }
  };

  return (
    <Fragment>
      <br />
      <Container maxWidth="sm" className="container">
        <Paper elevation={4} className="header">
          <h1 style={{ textAlign: "center" }}>Task Management Form</h1>

          {/* task name section */}
          <div className="inputs">
            <TextField
              required
              label="Task Name"
              variant="outlined"
              placeholder="Enter Task name"
              value={taskName}
              onChange={(e: any) => {
                setTaskName(e.target.value);
              }}
              fullWidth
            />
            {errors.taskName && !taskName && (
              <div className="error">{errors.taskName} </div>
            )}
          </div>

          {/* description section */}
          <div className="inputs">
            <TextField
              required
              label="Description"
              variant="outlined"
              placeholder="Enter Description"
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
            {errors.description && !description && (
              <div className="error">{errors.description} </div>
            )}
          </div>

          {/* startTime section */}

          <Grid container spacing={0}>
            <Grid
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              item
              style={{ padding: "4px", marginTop: "12px" }}
            >
              <DatePicker
                required
                placeholderText="Start Date & Time"
                selected={startTime}
                onChange={(e: any) => setStartTime(e)}
                timeIntervals={15}
                showTimeSelect
                dateFormat="dd/MM/yyyy - HH:mm"
                customInput={
                  <TextField
                    error={startDateError ? true : false}
                    className="width100"
                    variant="outlined"
                    value={startTime}
                    label="Start Date & Time"
                    InputProps={{
                      readOnly: true,
                    }}
                    helperText={startDateError ? startDateError : ""}
                  />
                }
              />
              {errors.startTime && !startTime && (
                <div className="error">{errors.startTime} </div>
              )}
            </Grid>
            <Grid
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              item
              style={{ padding: "4px", marginTop: "12px" }}
            >
              <DatePicker
                required
                placeholderText="End Date & Time"
                selected={endTime}
                onChange={(e: any) => setEndTime(e)}
                timeIntervals={15}
                showTimeSelect
                dateFormat="dd/MM/yyyy - HH:mm"
                customInput={
                  <TextField
                    error={endDateError ? true : false}
                    className="width100"
                    variant="outlined"
                    value={endTime}
                    label="End Date & Time"
                    InputProps={{
                      readOnly: true,
                    }}
                    helperText={endDateError ? endDateError : ""}
                  />
                }
              />
              {errors.endTime && !endTime && (
                <div className="error">{errors.endTime} </div>
              )}
            </Grid>
          </Grid>

          {/* action section */}
          <div className="inputs" style={{ marginTop: "54px" }}>
            {!isEdit && (
              <Button
                className="btn"
                variant="contained"
                color="primary"
                onClick={handleSubmitData}
              >
                Submit
              </Button>
            )}
            {isEdit && (
              <Button
                className="btn"
                variant="contained"
                color="primary"
                onClick={handleUpdateExistingData}
              >
                Update
              </Button>
            )}
            {isEdit && (
              <Button className="btn" variant="contained" onClick={handleReset}>
                Cancel
              </Button>
            )}
          </div>

          <br />
        </Paper>
      </Container>
    </Fragment>
  );
};

export default CreateTask;
