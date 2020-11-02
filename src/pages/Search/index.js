import React, { Component, useState } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Alert from "../../components/Alert";

// class Search extends Component 

const Search = () => {

  const [wikiSearch, setWikiSearch] = useState({
    search: "Wikipedia",
    title: "",
    description: "",
    url: "",
    error: ""
  });
  
  // moved to useState hook
  // state = {
  //   search: "Wikipedia",
  //   title: "",
  //   description: "",
  //   url: "",
  //   error: ""
  // };

  // When the component mounts, update the title to be Wikipedia Searcher
  // componentDidMount() {
  //   document.title = "Wikipedia Searcher";

    API.searchTerms(wikiSearch.search)
      .then(res => {
        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        setWikiSearch({
          title: res.data[1],
          description: res.data[2][0],
          url: res.data[3][0],
          error: ""
        });
      })
      .catch(err => setWikiSearch({ error: err.message }));
  // }

  const handleInputChange = event => {
    setWikiSearch({ search: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (!wikiSearch.search) {
      return;
    }
    API.searchTerms(wikiSearch.search)
      .then(res => {
        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        setWikiSearch({
          title: res.data[1],
          description: res.data[2][0],
          url: res.data[3][0],
          error: ""
        });
      })
      .catch(err => setWikiSearch({ error: err.message }));
  };

  // render() {
    return (
      <div>
        <Container style={{ minHeight: "100vh" }}>
          <h1 className="text-center">Search For Anything on Wikipedia</h1>
          <Alert type="danger" style={{ opacity: wikiSearch.error ? 1 : 0, marginBottom: 10 }}>
            {wikiSearch.error}
          </Alert>
          <SearchForm
            handleFormSubmit={handleFormSubmit}
            handleInputChange={handleInputChange}
            results={wikiSearch.search}
          />
          <SearchResults
            title={wikiSearch.title}
            description={wikiSearch.description}
            url={wikiSearch.url}
          />
        </Container>
      </div>
    );
  }
// }

export default Search;
