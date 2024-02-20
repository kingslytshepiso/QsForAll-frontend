"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../main.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [summary, setSummary] = useState(null);
  const [isValid, setValidity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    })
      .then((response) => {
        if (response.status == 200) {
          router.push("/");
        } else if (response.status == 401) {
          alert("invalid credentials");
        }
      })
      .then(
        () => {},
        (error) => {
          console.log(error);
        }
      );
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="question-container w-75">
        <div className="mx-auto">
          <h2 className="text-center">Login</h2>
          <div
            className={`${
              isValid ? "text-success" : "text-danger"
            } text-center`}
          >
            {summary}
          </div>
          <form onSubmit={onSubmit}>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <input
                  type="email"
                  placeholder="username"
                  name="username"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary mx-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? "loading" : "Login"}
                  </button>
                </div>
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <div className="d-flex justify-content-center">
                  <Link href={"/account/signup"}>Dont have an account</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
