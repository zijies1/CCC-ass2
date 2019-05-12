import React from "react";

export default class Footer extends React.Component {
  // render
  render() {
    return (
      <footer className="bg-dark page-footer font-small special-color-dark pt-4">
        <div className="container">
          <ul className="list-unstyled list-inline text-center">
            <li className="list-inline-item">
              <a className="btn-floating btn-fb mx-1">
                <i className="fab fa-facebook-f"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-tw mx-1">
                <i className="fab fa-twitter"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-li mx-1">
                <i className="fab fa-linkedin-in"> </i>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-copyright text-center py-3">© 2018 Copyright:
          <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
        </div>

      </footer>
    );
  }
}
