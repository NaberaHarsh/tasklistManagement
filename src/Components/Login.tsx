import React, { Fragment, useState } from "react";
import { Container, Paper, TextField, Button } from "@material-ui/core";
import "./login.css";

interface IProps {
  setUserLoginData: (e: { [k: string]: any }) => void;
  userName: string;
  setUserName: any;
  password: string;
  setPassword: any;
}

const Login: React.FC<IProps> = ({
  setUserLoginData,
  userName,
  setUserName,
  password,
  setPassword,
}) => {
  const [errors, setErrors] = useState<{
    userName: string;
    password: string;
  }>({
    userName: "",
    password: "",
  });

  let userNameError: string = "";
  let passwordError: string = "";

  const validateForm = () => {
    let errors = {
      userName: "",
      password: "",
    };

    if (!userName) {
      errors.userName = "Username is Required";
    }
    if (!passwordError) {
      errors.password = "Password is Required";
    }
    setErrors(errors);

    if (userName && !userNameError)
      if (password && !passwordError) {
        return true;
      } else {
        return false;
      }
  };

  const handleSubmit = () => {
    let proceed: any = false;
    proceed = validateForm();
    if (proceed) {
      const userId = Math.random();
      const payload = {
        userName: userName,
        userId: userId,
      };
      setUserLoginData(payload);
    }
  };

  if (userName.match(/^[a-zA-Z]*$/)) {
    userNameError = "";
  } else {
    userNameError = "Username not in valid format. Only alphabets are allowed";
  }

  if (password.match(/^[a-zA-Z0-9]{8}$/)) {
    passwordError = "";
  } else {
    passwordError =
      password.length !== 8
        ? "Password must be 8 character long"
        : "Password not in valid format. Only alphabets and numbers are allowed";
  }

  return (
    <Fragment>
      <Container maxWidth="sm" className="container">
        <Paper
          className="header"
          elevation={4}
          style={{ borderRadius: "20px" }}
        >
          <h1>Task Management</h1>
          <h3>Login</h3>
          <div className="inputs">
            <TextField
              error={userNameError ? true : false}
              fullWidth
              required={true}
              label="Username"
              variant="outlined"
              placeholder="Enter Username"
              value={userName}
              onChange={(e: any) => {
                setUserName(e.target.value);
              }}
              helperText={userNameError ? userNameError : ""}
            />
            {errors.userName && !userName && (
              <div className="error">{errors.userName} </div>
            )}
          </div>

          <div className="inputs">
            <TextField
              error={passwordError ? true : false}
              required={true}
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              placeholder="Enter Password"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              helperText={passwordError ? passwordError : ""}
            />
            {errors.password && !password && (
              <div className="error">{errors.password} </div>
            )}
          </div>
          <div className="inputs">
            <Button
              variant="contained"
              color="primary"
              className="btn"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>
          <br />
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Login;
