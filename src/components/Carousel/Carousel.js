import React from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import GridItem from "../Grid/GridItem.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";
import CardFooter from "../Card/CardFooter.js";
import Danger from "../Typography/Danger.js";
import Icon from "@material-ui/core/Icon";

import { bugs, website, server } from "../../variables/general.js";
import {makeStyles} from "@material-ui/core/styles";
import Warning from "../Typography/Warning";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
let locations= [1,2,3,4, 5, 6];
export default function SingleLineGridList(props) {
    let useStyles = makeStyles(styles);
    const classes = useStyles();
    locations = this.props.data;

    return (
        <div className={classes.root}>
            <h2>{this.props.cityName}</h2>
            <GridList className={classes.gridList} cols={2.5}>
                {locations.map(tile => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                    <Icon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}