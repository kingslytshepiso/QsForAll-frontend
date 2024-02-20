"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../main.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("fullname"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    }).then(
      (response) => {
        if (response.status == 201) {
          router.push("/");
        }
      },
      (error) => {
        console.log(error);
      }
    );
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
                  type="text"
                  placeholder="Full name"
                  className="form-control"
                  name="fullname"
                />
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <input
                  type="text"
                  placeholder="username"
                  className="form-control"
                  name="username"
                />
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  name="email"
                />
              </div>
            </div>
            <div className="row align-items-center m-2">
              <div className="col-md-6 col-8 mx-auto">
                <input
                  type="password"
                  placeholder="password"
                  className="form-control"
                  name="password"
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
