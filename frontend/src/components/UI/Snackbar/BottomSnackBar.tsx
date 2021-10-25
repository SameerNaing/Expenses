import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import styles from "./BottomSnackBar.module.scss";

import { RootState } from "../../../store";
import { closeSnackBar } from "../../../store/snackbar/snackbar-slice";

const BottomSnackBar: React.FC = () => {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state.snackbar);

  const { isError, show, message } = states;

  const onCloseHandler = () => dispatch(closeSnackBar());

  return (
    <Snackbar open={show} autoHideDuration={1500} onClose={onCloseHandler}>
      <MuiAlert
        className={styles.alert}
        elevation={6}
        variant="filled"
        onClose={onCloseHandler}
        severity={isError ? "error" : "success"}
      >
        <span className={styles.message}>{message}</span>
      </MuiAlert>
    </Snackbar>
  );
};

export default BottomSnackBar;
