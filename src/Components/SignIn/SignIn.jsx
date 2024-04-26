import React, { useState } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import userServices from "../Services/user-services";

const SignIn = () => {
    const [username, setUsername] = useState(''); // Changed 'email' to 'username'
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setIsLoading(true);
        setError('');

        try {
            const response = await userServices.login(username, password); 

            if (response.token) {
                setIsLoggedIn(true);
                console.log("Login successful");
            } else {
                setError("Invalid username or password"); 
                console.log(response)
            }
        } catch (error) {
            console.error("Error occurred while signing in:", error);
            setError("An unexpected error occurred");
        }

        setIsLoading(false);
    };

    return (
        <main className="main" id="top">
            <Header />
            <section className="py-8">
                <div className="container">
                    <div className="row">
                        <div className="bg-holder bg-size" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/dot-bg.png)`, backgroundPosition: "bottom left", backgroundSize: "auto" }}>
                        </div>
                        <div className="col-lg-6 z-index-2 mb-5"><img className="w-100" src={`${process.env.PUBLIC_URL}/assets/img/gallery/poumons.jpg`} alt="..." /></div>
                        <div className="col-lg-6 z-index-2 mb-5">
                            <h1>Sign In</h1>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : isLoggedIn ? (
                                <p>Redirecting...</p>
                            ) : (
                                <form className="row g-3" style={{ marginTop: '5rem' }} onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <label className="visually-hidden" htmlFor="username">Username:</label> {/* Changed 'Email' to 'Username' */}
                                        <input className="form-control form-livedoc-control" id="username" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} /> {/* Changed 'email' to 'username' */}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="visually-hidden" htmlFor="password">Password:</label>
                                        <input className="form-control form-livedoc-control" id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                    </div>
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button className="btn btn-primary rounded-pill" type="submit">Sign In</button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default SignIn;
