import React, { Fragment } from "react";
import { Container, Paper } from "@material-ui/core";
import "./navbar.css";
const Dashboard = () => {
  return (
    <Fragment>
      <br />
      <Container maxWidth="md">
        <Paper
          elevation={4}
          className="header"
          style={{ borderRadius: "20px" }}
        >
          <h1 className="title">Welcome to Task Management Application</h1>
          <h2>Applications</h2>
          <li>
            This is a simple to use tasklist management application that can
            help you plan,list and get more tasks done.
          </li>
          <li>You can create unlimited tasks, give completion dates.</li>
          <li>You can Create tasks for yourself and for others.</li>
          <li>You can keep record of your employees daily tasks as well.</li>
          <li>
            One of the most important reasons for keeping a tasklist management
            application is the organization.
          </li>
          <li>
            Organizing your tasks with a list can make everything much more
            manageable and make you feel grounded.
          </li>

          <li>
            Seeing a clear outline of all your tasks will help you feel
            organized and stay mentally focused.
          </li>

          <h2>Features</h2>
          <li>
            You can create a task with task name, descriptipn, start time and
            end time.
          </li>
          <li>
            You can view the list of all the created tasks, filter the list
            accoroding to dates, seach and sort by task name.
          </li>
          <li>You can edit and delete any task from the task list.</li>
          <li>You can read jokes from the jokes section.</li>
        </Paper>
      </Container>
    </Fragment>
  );
};
export default Dashboard;
