"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./main.css";
import Link from "next/link";

export function QuestionList() {
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetch("http://localhost:8080/questions")
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
        {questions.content?.map(function (item, index) {
          const itemUrlTitle = encodeURI(item.title.toLowerCase()).replace(
            "?",
            "%3F"
          );
          return (
            <Link
              key={index}
              href={`/questions/${itemUrlTitle}`}
              className="question-link"
            >
              <div className="question-container">
                <div className="question-header d-flex flex-sm-row flex-column flex-md-row">
                  <div>
                    <span className="question-title h4">
                      <strong>{item.title}</strong>
                    </span>
                    <span
                      className="question-content question-content-not-expanded"
                      data-text-expanded="false"
                      onClick={(event) => expandText(event.target)}
                    >
                      {item.content ? item.content : "no content"}
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <span>
                      <i>date posted: {item.datePosted}</i>
                    </span>
                    <span>
                      <i>posted by: {item.postedBy}</i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
