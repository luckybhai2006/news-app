import React from 'react';
import './newsitem.css';

const Newsitem = (props) => {
    let { title, des, imageUrl, newsUrl, author, date, source } = props; // Fixed typo 'tytle' to 'title'
    
    return (
        <div className='my-1'>
            <div className="card">

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}>
                    <span className="badge rounded-pill bg-danger">
                        {source}
                    </span>
                </div>

                <img 
                    src={!imageUrl ? "https://www.shutterstock.com/shutterstock/photos/1671885220/display_1500/stock-photo-circle-with-stick-null-zero-1671885220.jpg" : imageUrl} 
                    className="card-img-top" 
                    alt="News Thumbnail" 
                    style={{ height: '150px' }} 
                />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5> {/* Fixed typo 'tytle' to 'title' */}
                    <p className="card-text">{des}...</p>
                    <p className="card-text">
                        <small className='text-muted'>
                            By {!author ? 'unknown' : author} on {new Date(date).toGMTString()}
                        </small>
                    </p>
                    <a 
                        href={newsUrl} 
                        target='_blank' 
                        rel='noopener noreferrer' // Updated for security
                        className="btn btn-info"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Newsitem;
