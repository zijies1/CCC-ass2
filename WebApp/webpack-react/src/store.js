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
const store = createStore(reducers);

export default store ;
