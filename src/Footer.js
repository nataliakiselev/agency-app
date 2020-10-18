import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
import {
  Divider,
  List,
  ListItemText,
  ListItem,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import InstagramIcon from "@material-ui/icons/Instagram";
import PageGrid from "./shared/UI/PageGrid";
import WarningModal from "./shared/UI/WarningModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    listStyle: "none",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Footer = () => {
  const classes = useStyles();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const handleClose = (body) => {
    setShowConfirmModal(false);
  };
  const body = (
    <Typography component="div">
      <Box pt={2}>
        Images used in this repository are for demo purposes only.
      </Box>
      <Box pb={5}>
        Some of them are not my own and I hold no rights to them.
      </Box>
    </Typography>
  );

  return (
    <PageGrid>
      <Divider variant="middle" />
      <WarningModal
        open={showConfirmModal}
        onClose={handleClose}
        header="Disclaimer"
        children={body}
      />
      <List className={classes.root}>
        <ListItemLink href="https://github.com/nataliakiselev">
          <ListItemText primary="Ⓒ 2020 NATALIA KISELEV" />
        </ListItemLink>
        <ListItem
          button
          style={{ textAlign: "center " }}
          onClick={showWarningHandler}
        >
          <ListItemText primary="DISCLAIMER" />
        </ListItem>
        <ListItemLink href="#footer">
          <ListItemText style={{ textAlign: "right" }} primary="CONTACT US" />
        </ListItemLink>
      </List>
    </PageGrid>
  );
};

export default Footer;
