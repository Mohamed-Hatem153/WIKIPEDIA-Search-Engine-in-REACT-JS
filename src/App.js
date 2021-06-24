import React, { useState } from "react";

function App() {
  const [showSearch, setSearchShow] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const toggleSearch = () => {
    setSearchShow(!showSearch);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;
    const endPoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
    const response = await fetch(endPoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };
  return (
    <>
      <div className="title">
        <h1>Wikipedia Seeker</h1>
      </div>
      <div className={`search-icon ${showSearch ? "open" : null}`}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="search-icon__input"
            placeholder="search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="search-icon__wrapper" onClick={toggleSearch}>
          <div className="search-icon__glass"></div>
          <div className="search-icon__handle"></div>
        </div>
      </div>
      {searchInfo.totalhits ? (
        <p className="search-result">Search results : {searchInfo.totalhits}</p>
      ) : (
        ""
      )}

      <div className="results">
        {results.map((result, indx) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return (
            <div className="result" key={indx}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="noreferrer">
                Read more
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
