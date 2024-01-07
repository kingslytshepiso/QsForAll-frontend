"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../main.css";
import Link from "next/link";
export default function SignUp() {
  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("http://localhost:8080/account/signup", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="question-container w-75">
        <div className="mx-auto">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={onSubmit}>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <input
                  type="password"
                  placeholder="password"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <input
                  type="password"
                  placeholder="re-enter password"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary mx-auto">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <div className="d-flex justify-content-center">
                  <Link href={"/account/login"}>Already have an account</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
