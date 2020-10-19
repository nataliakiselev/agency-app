import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "70%",
    margin: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #212121",
    boxShadow: 5,
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function WarningModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby={props.header}
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2>{props.header}</h2>
            <div>{props.children}</div>
            <footer>{props.footer}</footer>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
