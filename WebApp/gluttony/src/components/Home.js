import React from "react";
import style from "./style.css";
import { connect } from 'react-redux';
import About from './About';
import Footer from './Footer';
import Experts from './Experts';
import Header from './Header';
import homeBg from "../img/home-bg.jpg";

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
                  <h1 className="display-2">Hello, world!</h1>
                  <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                  <hr className="my-4" />
                  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                  <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
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
