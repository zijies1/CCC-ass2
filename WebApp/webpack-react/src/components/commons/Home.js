import React from "react";
import style from "./style.css";
import { connect } from 'react-redux';
import About from './About';
import Footer from './Footer';
import Experts from './Experts';
import Header from './Header';
import homeBg from "../../img/home-bg.jpg";
import { Link } from "react-router-dom";

// Home page component
class Home extends React.Component {

  // render
  render() {
    // var backgroundImage = "https://truebarbecue.com/wp-content/uploads/2018/09/Reds-True-BBQ-Sept-2018-35969-WEB-RES-2.jpg";
    return (
      <div>
        <Header/>
        <header id="home-section" style = {{ "backgroundImage": `url(${homeBg})`}}>
            <div className="dark-overlay">
              <div className="home-inner container">
                <div className="jumbotron text-white bg-transparent text-center">
                  <h1 className="display-2">TheDeadlySins-Gluttony</h1>
                  <p className="lead">Gluttony (Latin: gula, derived from the Latin gluttire meaning "to gulp down or swallow") means over-indulgence and over-consumption of food, drink, or wealth items, particularly as status symbols.</p>
                  <hr className="my-4" />
                  <p>This website dives into the beauty of big data connecting gluttony with tweets data and analytically shows them on the map of Australia.</p>
                  <p className="lead">
                    <Link to="/map" ><button className="btn btn-primary btn-lg" role="button">Learn more</button></Link>
                  </p>
                </div>
              </div>
            </div>
          </header>
          <About/>
          <Experts/>
          <Footer/>
        </div>
    );
  }
}



export default connect(null,null)(Home);
