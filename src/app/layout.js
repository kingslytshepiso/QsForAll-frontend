"use client";
import "./globals.css";
import "./main.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import reactSessionApi from "react-session-api";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qs For All",
  description: "Lets learn from each other",
};

export default function RootLayout({ children }) {
  const [isLoggedIn, setLogStatus] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    fetch("http://localhost:8080/auth/authenticate")
      .then((response) => {
        console.log(response.headers.get("set-cookie"));
        return response.json();
      })
      .then(
        (result) => {
          setLogStatus(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  const IsLogged = () => {
    if (isLoggedIn) {
      return (
        <>
          <Link
            href={"http://localhost:8080/account/logout"}
            className="btn btn-danger mx-1"
          >
            Logout
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link href={"/account/login"} className="btn btn-danger mx-1">
            Login
          </Link>
          <Link href={"/account/signup"} className="btn btn-secondary mx-1">
            Sign up
          </Link>
        </>
      );
    }
  };
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top navbar-light rounded">
          <div className="container-fluid">
            <Link className="navbar-brand" href={"/"}>
              QsForAll
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample09"
              aria-controls="navbarsExample09"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample09">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href={"/"}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={"/ask"}>
                    Ask
                  </Link>
                </li>
              </ul>
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  const keyword = event.currentTarget.searchInput.value;
                  router.push(`/search?q=${keyword}`);
                }}
              >
                <input
                  name="searchInput"
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              <IsLogged />
            </div>
          </div>
        </nav>
        <Suspense fallback={<Loading />}>
          <main className="container">{children}</main>
        </Suspense>
        <footer></footer>
      </body>
    </html>
  );
}
