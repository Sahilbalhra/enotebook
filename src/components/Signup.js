import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({showAlert}) => {
  const host = "http://localhost:5000";
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState(null);
  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.confirmpassword) {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json.jwtAuthToken);
      if (json.success) {
        //redirect
        // localStorage.setItem("token", json.jwtAuthToken);
        navigate("/login");
        showAlert("Account created Successfully","success");
      } else {
        showAlert("Invalid Credentials","danger");
      }
    } else {
      setError("Confirm Password and Password are not same");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <section>
      {/* Background image */}
      <div
        className="bg-image"
        style={{
          backgroundImage:
            'url("https://mdbootstrap.com/img/new/textures/full/171.jpg")',
          height: 300,
        }}
      />
      {/* Background image */}
      <div
        className="card mx-4 mx-md-5 shadow-5-strong"
        style={{
          marginTop: "-100px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5 text-center">Sign up now</h2>
              <form>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={credentials.name}
                    className="form-control"
                    onChange={onChange}
                  />
                </div>

                {/* Email input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    onChange={onChange}
                    value={credentials.email}
                  />
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    onChange={onChange}
                    value={credentials.password}
                  />
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    className="form-control"
                    onChange={onChange}
                    value={credentials.confirmpassword}
                  />
                </div>
                <div className="form-outline mb-4">
                  <p style={{ color: "red" }}>{error}</p>
                </div>
                <div className="form-outline mb-4 text-center">
                  <p className="pb-lg-2">
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#393f81" ,textDecoration:"none"}}>
                      Login here
                    </Link>
                  </p>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block col-lg-12"
                  onClick={handleClick}
                >
                  SignUp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
