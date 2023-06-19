import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${capitalizeFirstLetter(
  //   props.category
  // )} - Newsgenix`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(50);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }
  
  useEffect(() => {
    updateNews();
  }, [])

  // const handlePrevClick = async () => {
  //   // console.log("Prev");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=e765ba2b1ebe4aad834e5339c7a001c5&page=${
  //   //   page - 1
  //   // }&pageSize=${props.pageSize}`;
  //   // setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);
  //   // setState({
  //   //   page: page - 1,
  //   //   articles: parseData.articles,
  //   //   loading: false,
  //   // });
  //   setPage(page - 1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   // if (
  //   //   !(
  //   //     page + 1 >
  //   //     Math.ceil(totalResults / props.pageSize)
  //   //   )
  //   // ) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //     props.country
  //   //   }&category=${
  //   //     props.category
  //   //   }&apiKey=e765ba2b1ebe4aad834e5339c7a001c5&page=${
  //   //     page + 1
  //   //   }&pageSize=${props.pageSize}`;
  //   //   setState({ loading: true });
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json();

  //   //   setState({
  //   //     page: page + 1,
  //   //     articles: parseData.articles,
  //   //     loading: false,
  //   //   });

  //   setPage(page + 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json()
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults)
  };

    return (
      <>
        <h2 className="text-center my-4">
          &#10024;Newsgenix - Top{" "}
          {capitalizeFirstLetter(props.category)} Headlines &#10024;
        </h2>
        {loading && <Spinner />}
        <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">

                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
        {/* <div className="conatiner d-flex justify-content-center  my-5">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-success mx-4"
            onClick={handlePrevClick}
          >
            &#8678; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &#8680;
          </button>
        </div> */}
      </>
    );

    News.defaultProps = {
      country: "in",
      pageSize: 5,
      category: "general",
    };
    News.propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    };
}
export default News
