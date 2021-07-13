import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core";
import { useState } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import Leaderboard from "./Leaderboard";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  ImageList: {
    width: 550,
    height: 800,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ChooseFighter({ pokemonList }) {
  // console.log(pokemonList);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Select Pokemon" {...a11yProps(0)} />
            <Tab label="Show Leaderboard" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ImageList
            cellHeight={250}
            className={classes.ImageList}
            style={{ overflow: "auto" }}
          >
            <ImageListItem key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div"></ListSubheader>
            </ImageListItem>
            {pokemonList.map((pokemon) => (
              <ImageListItem key={pokemon.id}>
                <NavLink to={`/${pokemon.id}`}>
                  <img src={pokemon.image} alt={pokemon.title} />
                  <ImageListItemBar
                    title={pokemon.name.english}
                    subtitle={
                      <span>
                        attack: {pokemon.base.Attack} defense:{" "}
                        {pokemon.base.Defense}
                      </span>
                    }
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${pokemon.name.english}`}
                        className={classes.icon}
                      ></IconButton>
                    }
                  />
                </NavLink>
              </ImageListItem>
            ))}
          </ImageList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Container fixed>
            <Leaderboard />
          </Container>
        </TabPanel>
      </div>
    </div>
  );
}
