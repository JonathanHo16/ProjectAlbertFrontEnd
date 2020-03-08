import {GraphQLClient} from 'graphql-request'
import {element} from "prop-types";

class UserSession {

    client = new GraphQLClient("http://localhost:8080/query");
    homes;
    works;
    constructor(userId) {
        this.userId = userId;
        this.homesArray = null;
        this.worksArray = null;
        var request = new XMLHttpRequest();
        request.bo
        request.open("POST", )
        this.client.request(this.getHomesQuery()).then(data => this.parseHomesQuery(data));
        this.client.request(this.getWorksQuery()).then(data => this.parseWorksQuery(data));

    }
    getHomesQuery() {
       return `{
          {
          homes (userId : \"`+this.userId+`\"){
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

    }
    parseHomesQuery (result) {
        let jsonResponse = JSON.parse(result);
        this.homesArray = jsonResponse.data.homes;
    }
    getWorksQuery() {
        return `{
              homes (userId : \"`+this.userId+`\"){
                homeID
                name
                numBed
                address
                rent
              }
            }`
    }
    parseWorksQuery (result){
        let jsonResponse = JSON.parse(result);
        this.worksArray = jsonResponse.data.works;
    }
    getElementsByCity(cityName) {
        let homes = [];
        let works = [];

        function handleHome(newHome, index) {
            if (cityName.equals(newHome.city)) {
                homes.push(newHome);
            }
        }

        this.homesArray.forEach(handleHome);

        function handleWork(newWork, index) {
            if (cityName.equals(newWork.city)) {
                works.push(newWork);
            }

        }

        this.worksArray.forEach(handleWork);
        let returnDic = new Map();
        returnDic["homes"] = homes;
        returnDic["works"] = works;
        return returnDic;
    }
    getUniqueCities() {
        let cities = [];
        function handleElement(newElement, index) {
            if (cities.includes(newElement.city) === false) {
                cities.push(newElement.city);
            }
        }
        this.worksArray.forEach(handleElement);
        this.homesArray.forEach(handleElement)
    }

    addItem(itemObj, itemType) {
        let query;
        if (itemType === "home") {
             query =`{
                  createHome (input: {
                    userID: "${this.userId}"
                    name: "${itemObj.name}"
                    numBed: ${itemObj.numBeds}
                    address: "${itemObj.address}"
                    rent: ${item.rent}
                    city: "${item.city}"
                  }) {
                    homeID
                    name
                    numBed
                    rent
                    address
                    latitude
                    longitude
                    city
                  }
            }`;
        } else if (itemType === "work") {
            query = `{
              createWork(input:{
                userID: "${this.userId}"
                address: "${itemObj.address}"
                city: "${itemObj.city}"
                name: "${itemObj.name}"
              }) {
                workID
                name
                city
                address
                latitude
                longitude
              }
            }`;
        } else {
            return false
        }

        let queryResponse = this.postRequest("mutation", query);
        let result = null;
        queryResponse.then(data => result=data);
        if (result == null)
            return false;
        if (itemType === "work") {
            this.worksArray.push(result.data.createWork);
        } else {
            this.homesArray.push(result.data.createHome);
        }
        return true;

    }
    async postRequest(type = '', query = '') {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: `mutation ${query}` // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }
}
