import React, { Fragment } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

interface IProps {
  showLoader: boolean;
}

const CircularIndeterminate: React.FC<IProps> = ({ showLoader }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Backdrop className={classes.backdrop} open={showLoader}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Fragment>
  );
};
export default CircularIndeterminate;
