import React from "react";
import Expert from "./Expert";
import expert1 from "../img/p1.jpg";
import expert2 from "../img/p2.jpg";
import expert3 from "../img/p3.jpg";
import expert4 from "../img/p4.jpg";

export default class Experts extends React.Component {
  // render
  render() {
    var one = {
      name:"Alan Wu",
      description:"Alan is good at manipulating and analysing tweets data.",
      img:expert1
    };
    var two = {
      name:"Sean Liu",
      description:"Sean is an expert in crawling newest tweets data.",
      img:expert2
    };
    var three = {
      name:"Defang Shi",
      description:"Defang is an excellent teammate when dealing with database-related issues.",
      img:expert3
    };
    var four = {
      name:"Eric",
      description:"Eric plays an important role setting up clouds and easing the process of using clouds.",
      img:expert4
    };
    return (
      <section id="team" className="py-5 text-center bg-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="info-header mb-5 text-secondary">
                  <h1 className=" pb-3">
                    Meet Our Team Members
                  </h1>
                  <p className="lead">
                    Behind every great product is a great team. Like soccer teammates passing to one another to find the perfect shot, each teammate plays a specific, meaningful role.                   </p>
                </div>
              </div>
            </div>
            <div className="row mt-20">
              <Expert expert= {one}/>
              <Expert expert= {two}/>
              <Expert expert= {three}/>
              <Expert expert= {four}/>

            </div>
          </div>
        </section>
    );
  }
}
