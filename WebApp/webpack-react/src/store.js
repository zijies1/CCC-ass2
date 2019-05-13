import { createStore } from 'redux';
import reducers from './components/reducers';
import {addData} from './components/actions';
import axios from "axios";
const root = "http://172.26.38.153:8081/";

axios.get(root+"aurinObese")
      .then(res => {
        store.dispatch(addData(res.data,"aurinObese"));
      })
      .catch((error)=>{
          // handle error
        console.log(error);
      });
axios.get(root+"aurinOverweight")
      .then(res => {
        store.dispatch(addData(res.data,"aurinOverweight"));
      })
      .catch((error)=>{
          // handle error
        console.log(error);
      });
axios.get(root+"twrGeometry")
      .then(res => {
        store.dispatch(addData(res.data,"twrJson"));
      })
      .catch((error)=>{
          // handle error
        console.log(error);
      });

const data = {
       "location":"perth",
       "year":14
     };
var headers = {
   'Content-Type': 'application/json'
}

fetch(root+'api/gluttonynum', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(res =>{
      console.log(res);
    }).catch(error=> {
      console.log(error);
    });

const store = createStore(reducers);

export default store ;
