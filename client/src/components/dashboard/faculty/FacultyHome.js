import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import Sidebar from "./Sidebar";
import { getCourses } from "../../../actions/faculty";
import "./style.css";
import Card from "./Card";

const FacultyHome = ({
  getCourses,
  faculty: { loading, courses },
  auth: { user },
}) => {
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  let ongoing = courses.filter((course) => {
    if (course.archived == 0) return course;
  });

  return !user ? (
    <Spinner />
  ) : (
    <div className="grid-container">
      <div className="menu-icon">
        <i className="fas fa-bars header__menu"></i>
      </div>

      <header className="header">
        <div className="header__logo">Attendance DashBoard</div>
      </header>

      <Sidebar user={user} />

      <main className="main">
        <div className="container_head">
          <div className="main-header">
            <div className="main-header__heading">
              <h1 style={{ fontWeight: "750px" }}>{user.name} </h1>
              <h4 style={{ fontSize: "28" }}>{user.dept} department faculty</h4>
            </div>
          </div>
        </div>

        <h1 style={{ paddingLeft: "26px" }}>Ongoing courses: </h1>
        <div className="main-overview" style={{ color: "white" }}>
          {ongoing.map((course) => (
            <ul className="card_container">
              <Card course={course} />
            </ul>
          ))}
        </div>

        <br />
      </main>

      <footer className="footer">
        <div className="footer__copyright">&copy; IIITDMJ</div>
        <div className="footer__signature">
          The Ultimate Attendance Management Tool
        </div>
      </footer>
    </div>
  );
};

FacultyHome.propTypes = {
  getCourses: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  faculty: state.faculty,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCourses })(FacultyHome);
