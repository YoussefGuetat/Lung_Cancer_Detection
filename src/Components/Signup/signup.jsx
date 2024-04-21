import React, { useState } from "react";
import Header from "../Header/header";
import SelectCountry from "react-select-country-list";
import Footer from "../Footer/footer";
import userServices from "../Services/user-services";


const Signup = () => {
  const options = SelectCountry().getData();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "M",
    date_of_birth: "",
    country: "TN",
    email: "",
    username: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);   
      const response = await userServices.addUser(formData);
      console.log(response);   
      if (response.ok) {
        // Handle successful signup, e.g., show success message or redirect
        console.log('Signup successful');
        console.log(response);
      } else {
        // Handle signup failure, e.g., show error message
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <main className="main" id="top">
      <Header />
      <section className="py-8">
        <div className="container">
          <div className="row">
            <div className="bg-holder bg-size" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/dot-bg.png)`, backgroundPosition: "bottom right", backgroundSize: "auto" }}>
            </div>
            <div className="col-lg-6 z-index-2 mb-5"><img className="w-100" src={`${process.env.PUBLIC_URL}/assets/img/gallery/medecins.jpeg`} alt="..." /></div>
            <div className="col-lg-6 z-index-2">
              <form className="row g-3" style={{ marginTop: '5rem' }} onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="visually-hidden" htmlFor="first_name">First Name</label>
                  <input className="form-control form-livedoc-control" id="first_name" type="text" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="visually-hidden" htmlFor="last_name">Last Name</label>
                  <input className="form-control form-livedoc-control" id="last_name" type="text" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="gender">Gender</label>
                  <select className="form-select" id="gender" value={formData.gender} onChange={handleChange}>
                    <option >Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="date_of_birth">Date of birth</label>
                  <input className="form-control form-livedoc-control" id="date_of_birth" type="date" placeholder="Date of birth" value={formData.date_of_birth} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="country">Select Country:</label>
                  <select className="form-select" id="country" value={formData.country} onChange={handleChange}>
                    <option value="" >Select Country</option>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="email">Email</label>
                  <input className="form-control form-livedoc-control" id="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="username">Username</label>
                  <input className="form-control form-livedoc-control" id="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="password">Password</label>
                  <input className="form-control form-livedoc-control" id="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn btn-primary rounded-pill" type="submit">Sign Up</button>
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
