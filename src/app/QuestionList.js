"use client";
import { useEffect, useState } from "react";
import "./main.css";

export function QuestionList() {
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/getQuestions")
      .then((res) => res.json())
      .then(
        (result) => {
          setQuestions(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  return (
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
                    <i>posted by: {item.postedBy}</i>
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
  );
}
