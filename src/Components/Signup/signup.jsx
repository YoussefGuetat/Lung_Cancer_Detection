import React from "react";
import Header from "../Header/header";
import SelectCountry  from "react-select-country-list";
import Footer from "../Footer/footer";

const Signup = () => {
  const options = SelectCountry().getData();
  return (
    <main className="main" id="top">
      <Header/>
      <section className="py-8">
        <div className="container">
          <div className="row">
            <div className="bg-holder bg-size" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/dot-bg.png)`, backgroundPosition: "bottom right", backgroundSize: "auto" }}>
            </div>
            <div className="col-lg-6 z-index-2 mb-5"><img className="w-100" src={`${process.env.PUBLIC_URL}/assets/img/gallery/appointment.png`} alt="..." /></div>
            <div className="col-lg-6 z-index-2">
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="visually-hidden" htmlFor="fname">First Name</label>
                  <input className="form-control form-livedoc-control" id="fname" type="text" placeholder="First Name" />
                </div>
                <div className="col-md-6">
                  <label className="visually-hidden" htmlFor="lname">Last Name</label>
                  <input className="form-control form-livedoc-control" id="lname" type="text" placeholder="Last Name" />
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="gender">Gender</label>
                  <select className="form-select" id="gender">
                    <option selected="selected">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="date">Date of birth</label>
                  <input className="form-control form-livedoc-control" id="date" type="date" placeholder="Date of birth" />
                </div>
                <div className="col-md-6">
                <label className="form-label visually-hidden" htmlFor="country">Select Country:</label>
      <select className="form-select" id="country">
      <option value="" disabled selected>Select Country</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="email">Email</label>
                  <input className="form-control form-livedoc-control" id="email" type="email" placeholder="Email" />
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="pwd">Password</label>
                  <input className="form-control form-livedoc-control" id="pwd" type="password" placeholder="Password" />
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="cpwd">Confirm password</label>
                  <input className="form-control form-livedoc-control" id="cpwd" type="password" placeholder="Confirm password" />
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn btn-primary rounded-pill" type="submit">Sign in</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Signup;
