import React, { useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import ListIcon from "@material-ui/icons/List";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import { Badge, Tooltip, withWidth } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import "./navbar.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

    drawer: {
      width: 400,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 400,
    },
  })
);

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  drawer: {
    width: 400,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 400,
  },
});

interface IProps {
  logout: () => void;
  loggedUserName: string;
  width: any;
  taskData: { [k: string]: any }[];
}

const Appbar: React.FC<IProps> = ({
  logout,
  loggedUserName,
  width,
  taskData,
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const classes = useStyles();
  const mobileView = ["xs", "sm"].includes(width);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => showDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6" style={{ flex: 1 }}>
            Task Management
          </Typography>

          {!mobileView && (
            <Typography variant="h6">Welcome {loggedUserName}!</Typography>
          )}

          <Tooltip title="Logout">
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={logout}
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />

      <Drawer anchor={"left"} open={visible} onClose={onClose}>
        {mobileView && (
          <MenuItem className="lists">
            <span className="content">
              <Typography variant="h6">Welcome {loggedUserName}!</Typography>
            </span>
          </MenuItem>
        )}
        {mobileView && <Divider />}
        <Link to="/dashboard" className="linkDecor">
          <MenuItem className="lists" onClick={onClose}>
            <DashboardIcon />

            <span className="content">Dashboard </span>
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/editTask" className="linkDecor">
          <MenuItem className="lists" onClick={onClose}>
            <CreateIcon />

            <span className="content">Create Task </span>
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/viewTasks" className="linkDecor">
          <MenuItem className="lists" onClick={onClose}>
            <ListIcon />

            <span className="content">View Tasks </span>
            <Badge
              badgeContent={taskData.length}
              color="secondary"
              className="lists"
            />
          </MenuItem>
        </Link>
        <Divider />
        <Link to="/jokes" className="linkDecor">
          <MenuItem className="lists" onClick={onClose}>
            <BeachAccessIcon />

            <span className="content">View Jokes </span>
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem
          className="lists"
          onClick={() => {
            onClose();
            logout();
          }}
        >
          <PowerSettingsNewIcon />

          <span className="content">Logout </span>
        </MenuItem>
        <Divider />
      </Drawer>
    </div>
  );
};

export default withStyles(styles)(withWidth()(Appbar));
