import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
  GridList,
  GridListTile,
  GridListTileBar,
  useMediaQuery,
} from "@material-ui/core";
import { AuthContext } from "../../shared/context/AuthContext";

const useStyles = makeStyles((theme) => ({
  base: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    // [theme.breakpoints.down("xs")]: {
    //   paddingTop: theme.spacing(7),
    // },
  },

  title: {
    color: theme.palette.contrastText,
    textTransform: "capitalize",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  image: {
    width: "100%",
    height: "auto",
  },
}));

const ListTemplate = ({ profiles = [], userId }) => {
  const { agentId } = useContext(AuthContext);
  const classes = useStyles();
  const small = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const widescreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  if (!profiles.length) {
    return (
      <div>
        <h2> No profiles found. </h2>
        {userId === agentId && (
          <>
            <h2>Create one?</h2>

            <Link to="/profiles/new">
              <button>Create Profile</button>
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={classes.base}>
      <GridList
        cellHeight={230}
        className={classes.gridList}
        cols={small ? 1 : widescreen ? 4 : 2}
      >
        {profiles.map((item) => (
          <GridListTile key={item._id}>
            <img
              className={classes.image}
              src={
                item.mainImg.startsWith("https")
                  ? `${item.mainImg}`
                  : process.env.REACT_APP_ASSETS_URL + `/${item.mainImg}`
              }
              alt={item.name.first}
            />
            <Link to={`/profiles/${item._id}`} id={item._id} agent={item.agent}>
              <GridListTileBar
                title={`${item.name.first} ${item.name.last}`}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default ListTemplate;
