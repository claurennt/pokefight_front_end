import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 600,
    height: 800,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function ChooseFighter({ pokemonList }) {
  // console.log(pokemonList);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={250} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">
            Choose your Pokemon from the list below:
          </ListSubheader>
        </GridListTile>
        {pokemonList.map((pokemon) => (
          <GridListTile key={pokemon.id}>
            <NavLink to={`/${pokemon.id}`}>
              <img src={pokemon.image} alt={pokemon.title} />
              <GridListTileBar
                title={pokemon.name.english}
                subtitle={
                  <span>
                    type: {pokemon.type[0]} {pokemon.type[1]}
                  </span>
                }
                actionIcon={
                  <IconButton
                    aria-label={`info about ${pokemon.name.english}`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </NavLink>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
