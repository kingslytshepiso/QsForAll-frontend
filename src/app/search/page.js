"use client";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "../loading";

export default function Search() {
  const searchParam = useSearchParams();
  const keyword = searchParam.get("q");
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/search?q=${keyword}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setQuestions(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, [questions, keyword]);
  return (
    <>
      <h2>
        Results for <i>'{keyword}'</i>
      </h2>
      <div className="p-2 m-2">
        <div className="mx-auto">
          {questions?.map(function (item, index) {
            return (
              <div key={index} className="question-container">
                <div className="question-header d-flex flex-sm-row flex-column flex-md-row">
                  <span className="h4">
                    <strong>{item.content}</strong>
                  </span>
                  <div className="d-flex flex-column">
                    <span>
                      <i>date posted: {item.datePosted}</i>
                    </span>
                    <span>
                      <i>posted by: {item.from}</i>
                    </span>
                  </div>
                </div>
                <div className="question-body  d-flex flex-sm-row flex-column flex-md-row">
                  <div className="question-replies-section">No replies</div>
                  <div className="question-reply-section">
                    <span className="m-1">Enter your reply</span>
                    <form action="#">
                      <div className="m-1 p-1">
                        <textarea className="form-control m-1"></textarea>
                        <button type="submit" className="mx-1 btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
