import { useState } from 'react';
import axios from 'axios';
import myRepoDetails from "./components/myRepoDetails"
import './App.css';
function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDeatailsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    searchRepos();
  };

  function searchRepos() {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`,
    })
      .then((res) => {
        setLoading(false);
        setRepos(res.data);
      })
      .catch((error) => {
        console.error("Error fetching repositories:", error);
        setLoading(false); 
        setRepos([]); 
      });
  }
  

  function renderRepo(repo) { 
    return(
      <>
      <div className='row'  onClick={() => getDetails(repo.name)} key={repo.id}>
        <h2 className='repo-name'>
          {repo.name}
        </h2>
      </div>
      
      </>
    );
  }

  function getDetails(repoName){
    setDeatailsLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/repos/${username}/${repoName}`,
    }).then(res => {
      setDeatailsLoading(false);
      setDetails(res.data);
    });
  }
  return (
    <>
    <div className="page">
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input className="input" value={username} 
            placeholder='Github Username' onChange={e => setUsername(e.target.value)} />

            <button className="button" onClick={handleSubmit}>{loading ? "Searching..." : "Search"}</button>
          </form>
          <div className='result-container'>
            {repos.map(renderRepo)}
          </div>
        </div>
        <myRepoDetails details = {details} loading = {detailsLoading} />
      </div>
    </div>
    </>
  );
}

export default App;
