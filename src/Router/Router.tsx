import React, { useState } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Login from "../Components/Login";
import { connect } from "react-redux";
import { PrivateRoute } from "../Utils/PrivateRoute";
import Dashboard from "../Components/Dashboard";
import {
  setUserLoginData,
  setData,
  logout,
  deleteData,
  editData,
} from "../redux/todo/todoAction";
import CircularIndeterminate from "../Components/progressBar";
import CustomizedSnackbars from "../Components/Snackbar";
import CreateTask from "../Components/CreateTask";
import Appbar from "../Components/Navbar";
import Jokes from "../Components/Jokes";
import ViewTask from "../Components/ViewTasks";

interface IProps {
  setUserLoginData: (e: { [k: string]: any }) => void;
  userId: string;
  taskData: any;
  setData: (e: { [k: string]: any }) => void;
  logout: () => void;
  loggedUserName: string;
  editData: (e: { [k: string]: any }) => {};
  deleteData: (e: number) => {};
}

const Routes: React.FC<IProps> = ({
  setUserLoginData,
  userId,
  setData,
  taskData,
  loggedUserName,
  deleteData,
  editData,
}) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLoader, setShowLoader] = useState(false);
  const [toast, isToastOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [loggedIn, setLoggedIn] = useState(false);
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startTime, setStartTime] = useState<any>(new Date());
  const [endTime, setEndTime] = useState<any>(
    new Date(new Date().getTime() + 900000)
  );
  const [taskId, setTaskId] = useState<any>("");
  const [isEdit, setIsEdit] = useState(false);

  const handleLoginSubmitData = (data: { [k: string]: any }) => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
      setUserLoginData(data);
      isToastOpen(true);
      setMessage("Login Successfully !");
      setType("success");
      setLoggedIn(true);
    }, 1000);
  };

  const handleTaskSubmitData = () => {
    const taskId = Math.random();
    const payload = {
      taskName,
      description,
      startTime,
      endTime,
      taskId,
    };
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setData(payload);
      isToastOpen(true);
      setMessage("Data Saved!");
      setType("success");
      handleReset();
    }, 1000);
  };

  const handleReset = () => {
    setTaskName("");
    setDescription("");
    setStartTime(new Date());
    setEndTime(new Date(new Date().getTime() + 900000));
    setIsEdit(false);
    setTaskId("");
  };

  const handleLogout = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      logout();
      isToastOpen(true);
      setMessage("Logout Successfully !");
      setType("warning");
      handleReset();
      window.location.reload(false);
    }, 1000);
  };

  const handleEdit = (data: { [k: string]: any }) => {
    const { taskName, description, startTime, endTime, taskId } = data;
    setTaskName(taskName);
    setDescription(description);
    setStartTime(startTime);
    setEndTime(endTime);
    setTaskId(taskId);
    setIsEdit(true);
  };

  const handleUpdataData = () => {
    const payload = { taskName, description, startTime, endTime, taskId };

    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      editData(payload);
      isToastOpen(true);
      setMessage("Data Updated");
      setType("info");
      handleReset();
      setIsEdit(false);
    }, 1000);
  };

  const handleDelete = (id: number) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      deleteData(id);
      isToastOpen(true);
      setMessage("Data Deleted");
      setType("error");
      handleReset();
    }, 1000);
  };

  if (loggedIn === true) {
    setTimeout(() => {
      setLoggedIn(false);
    }, 2000);
  }

  return (
    <BrowserRouter>
      {loggedIn && <Redirect to="/dashboard" />}
      {userId && (
        <Appbar
          logout={handleLogout}
          loggedUserName={loggedUserName}
          taskData={taskData}
        />
      )}
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route
          path="/login"
          exact
          render={() => (
            <Login
              userName={userName}
              password={password}
              setUserName={setUserName}
              setPassword={setPassword}
              setUserLoginData={handleLoginSubmitData}
            />
          )}
        />

        <PrivateRoute path="/dashboard" component={Dashboard} uid={userId} />
        <PrivateRoute
          path="/editTask"
          uid={userId}
          component={CreateTask}
          taskName={taskName}
          setTaskName={setTaskName}
          description={description}
          setDescription={setDescription}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          isEdit={isEdit}
          handleSubmit={handleTaskSubmitData}
          handleUpdataData={handleUpdataData}
          handleReset={handleReset}
        />
        <PrivateRoute path="/jokes" component={Jokes} uid={userId} />
        <PrivateRoute
          path="/viewTasks"
          component={ViewTask}
          uid={userId}
          taskData={taskData}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Switch>
      {/* progress bar */}
      <CircularIndeterminate showLoader={showLoader} />
      {/* snackbar */}
      <CustomizedSnackbars
        isOpen={toast}
        message={message}
        type={type}
        handleClose={() => isToastOpen(false)}
      />{" "}
    </BrowserRouter>
  );
};

const mapStateToProps = (state: any) => ({
  userId: state.data.userId,
  taskData: state.data.taskData,
  loggedUserName: state.data.userName,
});

const mapDispatchToProps = {
  setUserLoginData,
  setData,
  logout,
  deleteData,
  editData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
