import React from 'react';
import Header from "../Header/header";
import Footer from "../Footer/footer";
const Team = () => {
  return (
    <>
    <Header/>
      <section className="pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3">
              <div className="bg-holder bg-size" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/doctors-us.png)`, backgroundPosition: "top center", backgroundSize: "contain" }}>
              </div>
              {/*/.bg-holder*/}
              <h1 className="text-center">OUR TEAM</h1>
            </div>
          </div>
        </div>
        {/* end of .container*/}
      </section>

      <section className="py-5">
        <div className="bg-holder bg-size" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/doctors-bg.png)`, backgroundPosition: "top center", backgroundSize: "contain" }}>
        </div>
        {/*/.bg-holder*/}
        <div className="container">
          <div className="row flex-center">
            <div className="col-xl-10 px-0">
              <div className="carousel slide" id="carouselExampleDark" data-bs-ride="carousel">
                <a className="carousel-control-prev carousel-icon z-index-2" href="#carouselExampleDark" role="button" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next carousel-icon z-index-2" href="#carouselExampleDark" role="button" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </a>
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval="10000">
                    <div className="row h-100 m-lg-7 mx-3 mt-6 mx-md-4 my-md-7">
                      <div className="col-md-4 mb-8 mb-md-0">
                        <div className="card card-span h-100 shadow">
                          <div className="card-body d-flex flex-column flex-center py-5"><img src={`${process.env.PUBLIC_URL}/assets/img/gallery/joseph.png`} width="128" alt="..." />
                            <h5 className="mt-3">Guetat Youssef</h5>
                            <p className="mb-0 fs-xxl-1">Data Science Ingenier</p>
                            <p className="text-600 mb-0">Ben Guerdan, Tunisia</p>
                            <p className="text-600 mb-4">23 Year Old</p>
                            <div className="text-center">
                              <button className="btn btn-outline-secondary rounded-pill" type="submit">View Profile</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-8 mb-md-0">
                        <div className="card card-span h-100 shadow">
                          <div className="card-body d-flex flex-column flex-center py-5"><img src={`${process.env.PUBLIC_URL}/assets/img/gallery/joseph.png`} width="128" alt="..." />
                            <h5 className="mt-3">Guetat Youssef</h5>
                            <p className="mb-0 fs-xxl-1">Data Science Ingenier</p>
                            <p className="text-600 mb-0">Ben Guerdan, Tunisia</p>
                            <p className="text-600 mb-4">23 Year Old</p>
                            <div className="text-center">
                              <button className="btn btn-outline-secondary rounded-pill" type="submit">View Profile</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-8 mb-md-0">
                        <div className="card card-span h-100 shadow">
                          <div className="card-body d-flex flex-column flex-center py-5"><img src={`${process.env.PUBLIC_URL}/assets/img/gallery/joseph.png`} width="128" alt="..." />
                            <h5 className="mt-3">Guetat Youssef</h5>
                            <p className="mb-0 fs-xxl-1">Data Science Ingenier</p>
                            <p className="text-600 mb-0">Ben Guerdan, Tunisia</p>
                            <p className="text-600 mb-4">23 Year Old</p>
                            <div className="text-center">
                              <button className="btn btn-outline-secondary rounded-pill" type="submit">View Profile</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Add more carousel items as needed */}
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
    
  );
};

export default Team;
