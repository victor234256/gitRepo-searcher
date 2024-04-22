function myRepoDetails({details, loading}){
    if(loading){
        return (
            <h1 className="loader">Loading...</h1>
        )
    }
    return(
        <div className="repo-details-container">
            <div className="details-row">
                <label className="label">Name:</label>
                <span className="value">{details.name}</span>
            </div>
            <div className="details-row">
                <label className="label">Forks Count:</label>
                <span className="value">{details.fork}</span>
            </div>

            <div className="details-row">
                <label className="label">Programming Language Used:</label>
                <span className="value">{details.language}</span>
            </div>

        </div>
    )
}