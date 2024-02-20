"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Question() {
  const [question, setQuestion] = useState(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${params.title}`)
      .then((response) => {
        if (response.status != 404) return response.json();
        return null;
      })
      .then(
        (question) => {
          setQuestion(question);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  async function postAnswer(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const postData = {
      answer: formData.get("answer"),
    };
    const formattedString = encodeURI(
      formData.get("questionTitle").toLowerCase()
    ).replace("?", "%3F");
    console.log(formattedString);
    const postUrl = `http://localhost:8080/questions/${formattedString}/answers`;
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.status == 201)
          router.push(`/questions/${formattedString}`);
        else if (response.status == 403) {
          alert("You need to be logged in to answer questions");
        }
      })
      .then(
        () => {},
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  }

  const expandText = (event) => {
    const elem = event;
    if (elem.getAttributeNode("data-text-expanded").value == "false") {
      elem.setAttribute("data-text-expanded", true);
      elem.classList.remove("question-content-not-expanded");
    } else {
      elem.setAttribute("data-text-expanded", false);
      elem.classList.add("question-content-not-expanded");
    }
  };
  return question == null ? (
    <div className="question-container">
      <h2 className="text-center"></h2>
    </div>
  ) : (
    <div className="question-container">
      <div className="question-header d-flex flex-sm-row flex-column flex-md-row">
        <div>
          <span className="question-title h4">
            <strong>{question.title}</strong>
          </span>
          <span
            className="question-content question-content-not-expanded"
            data-text-expanded="false"
            onClick={(event) => expandText(event.target)}
          >
            {question.content ? question.content : "no content"}
          </span>
        </div>

        <div className="d-flex flex-column">
          <span>
            <i>date posted: {question.datePosted}</i>
          </span>
          <span>
            <i>posted by: {question.postedBy}</i>
          </span>
        </div>
      </div>
      <div className="question-body  d-flex flex-sm-row flex-column flex-md-row">
        <div className="question-replies-section">
          {question.answers.length == 0
            ? "no answers yet"
            : question.answers.map((item) => {
                console.log("reload");
                return (
                  <div key={item.id} className="reply">
                    <span className="reply-author">
                      by: <br />
                      {item.postedBy == null ? "anonymous" : item.postedBy}
                    </span>
                    <span className="reply-content">{item.answer}</span>
                  </div>
                );
              })}
        </div>
        <div className="question-reply-section">
          <span className="m-1">Enter your reply</span>
          <form data-question-title={question.title} onSubmit={postAnswer}>
            <div className="">
              <input
                type="hidden"
                name="questionTitle"
                value={question.title}
              />
              <textarea
                className="form-control m-1"
                name="answer"
                title="Answer"
              ></textarea>
              <button type="submit" className="mx-1 btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
