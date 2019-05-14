import { createStore } from 'redux';
import reducers from './components/reducers';
import {addData} from './components/actions';
import axios from "axios";
const root = "http://172.26.38.153:8081/";

const store = createStore(reducers);

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

const timePeriods = ["T1","T2","T3","T4"];
const cities = ["melbourne","perth","brisbane"];
var points = [];
timePeriods.map(time=>{
  var obj = [];
  cities.map(city =>{
    axios.get(root + "past_Geo/"+city+"/"+time)
          .then(res => {
            obj.push(res.data);
          })
          .catch((error)=>{
              // handle error
            console.log(error);
          });
  });
  points.push(obj);
})
var dataName =  "allPoints";
store.dispatch(addData(points,dataName));


export default store ;
