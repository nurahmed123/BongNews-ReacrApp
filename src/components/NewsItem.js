import React from 'react'

export default function NewsItem(props){
        let { title, description, imageURL, newsUrl, author, date, source} = props;
        return (
            <>
                <div className='my-3' >
                    <div className="card">
                    <div style={{display: "flex", justifyContent: "center", position: "absolute", right: "0"}}> <span className="badge rounded-pill bg-danger"> {source} </span></div>
                        <img src={imageURL} className="card-img-top" alt="" />

                        <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">By - {!author?"Unknown":author} on {new Date(date).toUTCString()}</small>
                        </div>
                    </div>
                </div>
            </>
        )
    
}
