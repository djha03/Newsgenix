import React from "react";

const NewsItem =(props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;
    return (
      <div className="my-3 justify-content-center">
        <div className="card text-bg-dark">
          <img
            src={
              !imageUrl
                ? "https://c.ndtvimg.com/2022-09/r7vc1e68_raids-on-at-the-centre-for-policy-research-office-in-delhis-chanakyapuri_625x300_07_September_22.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <div style={{display: 'flex', top: 0, justifyContent: 'flex-end', position: 'absolute', right: 0}}>
          <span className="badge rounded-pill bg-danger">
                {source}
          </span>
          </div>
            <h5 className="card-title">
              {title}
              
              ...
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-outline-danger"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem;
