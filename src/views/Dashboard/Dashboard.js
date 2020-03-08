import React from "react";
import {connect, useDispatch} from "react-redux"
import axios from 'axios'
import '../../dataModel/actions.js'
import  {request} from 'graphql-request'
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components

import Carousel from "components/Carousel/Carousel.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import {addAllHomes, addHome} from "../../dataModel/actions";

const useStyles = makeStyles(styles);


class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {...props};

  }
  componentDidMount() {
    console.log("lets gets some homes");
    this.getFullList();

  }
  getFullList = () => {
    console.log("getting homes now");
    const testUserID = "iHOyc-t_ChoX34w_8aJe_DJ7g7Gvddd9ML9Wz5Hx9vU";
    const query = `query {
                      homes (userId : "${testUserID}"){
                        homeID
                        name
                        address
                        latitude
                        longitude
                        rent
                        city
                        numBed
                      }
                    }`;
    axios({
      url: 'http://localhost:8080/query',
      method: 'post',
      origin: 'localhost:3000',
      data : {
        query: query
          }
    }).then( res => {
      console.log("homesRequest came back");
      console.log(res.data.data.homes);
      this.props.dispatch(addAllHomes(res.data.data.homes));
    });
  };
  getCityList() {
    let cities = [];
    const {homes} = this.state.homes;

    const handleUniqueCities = (newCity, index) =>{
      if (!cities.includes(newCity)) {
        cities.push(newCity);
      }
    };
    console.log("here are the homes");
    console.log(this.state.homes);
    if (homes.length === 0) {
      console.log("no homes");
    }
    homes.forEach(e => {handleUniqueCities(e)});
    return cities;
  }
  getCityElementsByCity = (cityName) => {
    let elements = [];
    const handleCityElement = (newElement, index)=>{
      if (newElement.city === cityName)
      {
        elements.push(newElement);
      }
    };
    this.state.works.forEach(handleCityElement(cityName));
    this.state.homes.forEach(handleCityElement(cityName));
    return elements;
  };
  render() {
    return (
        <div>
          {this.getCityList().map(city => (
              <Carousel city={city} elements={this.getCityElementsByCity(city)}/>
          ))}
        </div>)
    }
}
const  myMapStateToProps = (state) => ({
  ...state
});
export default connect(myMapStateToProps)(Dashboard)
// }
