import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
    width: 500,
    height: 450,
  },
  title: {
    color: theme.palette.primary.light,
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
      <GridList cellHeight={180} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Women Main</ListSubheader>
        </GridListTile> */}
        {profiles.map((item) => (
          <GridListTile key={item._id}>
            <img src={item.mainImg} alt={item.name.first} />

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

  //     <ul className="profiles-list">
  //       <h2>Profiles</h2>
  //       {props.profiles.map((item) => (
  //         <Link
  //           to={`/profiles/${item.id}`}
  //           key={item.id}
  //           id={item.id}
  //           agent={item.agent}
  //         >
  //           <li>
  //             <Avatar avatar={item.avatar} alt={item.name.first} />
  //             <h3>{`${item.name.first} ${item.name.last}`} </h3>
  //           </li>
  //         </Link>
  //       ))}
  //     </ul>
  // );
};

export default ListTemplate;