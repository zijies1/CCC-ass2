import React from "react";

export default class Expert extends React.Component {
  // render
  render() {
    const {name,description,img} = this.props.expert;
    return (
        <div className="col">
          <div className="card text-secondary">
            <div className="card-body">
              <img src={img} alt="" className="img-fluid rounded-circle w-50 mb-3"/>
              <h3>{name}</h3>
              <p>{description}</p>
              <div className="d-flex justify-content-center">
                <div className="p-4">
                  <a href="http://facebook.com">
                    <i className="fab fa-facebook"></i>
                  </a>
                </div>
                <div className="p-4">
                  <a href="http://twitter.com">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
                <div className="p-4">
                  <a href="http://instagram.com">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
    );
  }
}
