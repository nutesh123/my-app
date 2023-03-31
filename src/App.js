import React, { useState, useEffect } from "react";
import classes from './App.module.css'

function App() {
  const [query, setQuery] = useState("");
  const [show, setshow] = useState(false);
  const [sortField, setSortField] = useState("stars");
  const [sortOrder, setSortOrder] = useState("desc");
  const [repos, setRepos] = useState([ ]);

  
   const search=()=>{
    if(query.length >= 2 ){
      setshow(true)
    }
   }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&sort=${sortField}&order=${sortOrder}`
      );
      const data = await response.json();
      setRepos(data.items);
      if(response.ok != true ){
        setshow(false)
      }
      else{
        setshow(true)
      }
    };
    fetchData();

  }, [query, sortField, sortOrder]);

console.log(query)
console.log(repos)

  return (
    <div>
        <h1 className={classes.main}>GitHub Repository Search</h1>
    <div className={classes.main}>
    
      <input
        type="text"
        placeholder="Search for repositories"
        value={query}
        onChange={(e) => setQuery(e.target.value)
          }
      
      />
      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value="stars">Sort by stars</option>
        <option value="watchers">Sort by watchers count</option>
        <option value="score">Sort by score</option>
        <option value="name">Sort by name</option>
        <option value="created">Sort by created date</option>
        <option value="updated">Sort by updated date</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      {/* <button onClick={search}>Search</button> */}
      </div>
      
      <div className={classes.container}>
        { show && repos.map((repo) => (
          <div className={classes.card} key={repo.id}>
            <img src={repo.owner.avatar_url}  alt="" />
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <p>Language: {repo.language}</p>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Watchers: {repo.watchers_count}</p>
            <p>Score: {repo.score}</p>
            <p>Created at: {repo.created_at}</p>
            <p>Updated at: {repo.updated_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
