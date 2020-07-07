import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "97%",
  },

  title: {
    color: theme.palette.contrastText,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const ListTemplate = ({ profiles = [] }) => {
  const classes = useStyles();

  if (!profiles.length) {
    return (
      <div>
        <h2> No profiles found. Create one?</h2>
        <Link to="/profiles/new">
          <button>Create Profile</button>
        </Link>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* <Grid container spacing={3} className={classes.gridList}> */}
      <GridList cellHeight={230} className={classes.gridList} cols={4}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Women Main</ListSubheader>
        </GridListTile> */}
        {profiles.map((item) => (
          <GridListTile key={item._id}>
            <img
              src={`http://localhost:4000/${item.mainImg}`}
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
