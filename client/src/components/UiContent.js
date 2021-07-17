import React from "react";
import { NavLink } from "react-router-dom";

const UiContent = () => {
  return (
    <>
      <div className="container py-3">
        <div className="row justify-content-center align-items-center">
          <div className="col-10 col-md-6 text-center">
            <img
              src="https://www.springboard.com/library/static/9d3d50624748d0e6afddadb1ff26af4b/6c4bb/10-reasons-you-should-get-into-ui-ux-design-right-now.jpg"
              className="img-fluid"
              alt="Banner"
            />
            <h1>Shorten Any URL</h1>
            <h2>And Get deep Analytics from them !</h2>
            <NavLink className="btn btn-lg btn-primary mt-5" to="/login">
              Start Creating Now
            </NavLink>
          </div>
        </div>
      </div>
      <div id="features" className="container p-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center g-3">
          <div className="col">
            <div className="card text-center h-100">
              <i
                style={{ fontSize: "4rem" }}
                className="bi bi-bar-chart-line"
              ></i>
              <div className="card-body">
                <h3 className="card-title">Easy Analytics</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam esse debitis, iure nobis quasi magnam magni facere ad
                  commodi iste.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center h-100">
              <i style={{ fontSize: "2em" }} className="bi bi-cpu"></i>
              <div className="card-body">
                <h3 className="card-title">Fast And Powerful</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam esse debitis, iure nobis quasi magnam magni facere ad
                  commodi iste.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center h-100">
              <i style={{ fontSize: "2em" }} className="bi bi-megaphone"></i>
              <div className="card-body">
                <h3 className="card-title">Who Drives Traffic</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam esse debitis, iure nobis quasi magnam magni facere ad
                  commodi iste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiContent;
