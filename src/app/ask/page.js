"use client";

import { useState, useEffect } from "react";

export default function Ask() {
  const [tagList, setTagList] = useState([]);
  const [tagSearchResult, setTagSearchResult] = useState([]);
  const [resultsVisible, setResultVisible] = useState(false);
  const [searchError, setSearchError] = useState(null);
  async function addTagToList(event) {
    event.preventDefault();
    tagList.push(event.currentTarget.innerHTML);
    setResultVisible(true);
  }
  async function removeTag(event) {
    const tagItems = [...tagList];
    const itemToRemove =
      event.currentTarget.getAttributeNode("data-to-remove").value;
    const indexToRemove = tagItems.indexOf(itemToRemove);
    const removedItems = tagItems.splice(indexToRemove, 1);
    setTagList(tagItems);
  }
  async function searchForTags(event) {
    const inputData = event.currentTarget.value;
    if (inputData.length > 0) {
      await fetch("http://localhost:8080/tags/search?search=" + inputData)
        .then((res) => res.json())
        .then(
          (result) => {
            const items = [];
            result.forEach((element) => {
              if (!tagList.includes(element.name)) {
                items.push(element);
              }
            });
            if (items.length > 0) {
              setResultVisible(true);
            }
            setTagSearchResult(items);
          },
          (error) => {
            setSearchError(error);
            setResultVisible(false);
          }
        );
    } else {
      setTagSearchResult([]);
      setResultVisible(false);
    }
  }
  const searchContainerResults = () => {
    if (tagSearchResult == 0) return "";
    else {
      return tagSearchResult.map((item, index) => (
        <li key={index} className="list-group-item" onClick={addTagToList}>
          {item.name}
        </li>
      ));
    }
  };
  const tagContainer = () => {
    if (tagList.length == 0) return "";
    else {
      return tagList.map((item, index) => (
        <div key={index} className="chosen-item">
          <span>{item}</span>{" "}
          <span className="close" data-to-remove={item} onClick={removeTag}>
            &times;
          </span>
        </div>
      ));
    }
  };
  async function postQuestion(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const tags = tagList.map((item) => {
      return { name: item };
    });
    // formData.append("tags", tags);
    console.log(formData.get("title"));
    console.log(event.currentTarget);
    fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        tags: tags,
      }),
    }).then((respose) => {
      if (respose.status == 201) console.log("success");
      else {
        console.log("error");
      }
    });
  }
  return (
    <>
      <div className="question-container">
        <h2 className="text-center">Ask a question.</h2>
        <form onSubmit={postQuestion}>
          <div className="row align-items-center m-2">
            <div className="col-md-6 col-8 mx-auto">
              <input
                type="text"
                placeholder="enter question"
                name="title"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row align-items-center m-2">
            <div className="col-md-6 col-8 mx-auto">
              <input
                type="text"
                placeholder="search for a tag"
                name="tags"
                className="form-control"
                onInput={searchForTags}
                onBlur={(event) =>
                  setTimeout(() => {
                    event.target.value = "";
                    setResultVisible(false);
                  }, 500)
                }
              />
              <div
                className={`box-search-result-container ${
                  resultsVisible ? "d-flex" : "d-none"
                }`}
              >
                <ul className="list-group">{searchContainerResults()}</ul>
              </div>
              <div className="tag-list-container">{tagContainer()}</div>
            </div>
          </div>
          <div className="row align-items-center m-2">
            <div className="col-md-6 col-8 mx-auto">
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mx-auto">
                  ask
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
