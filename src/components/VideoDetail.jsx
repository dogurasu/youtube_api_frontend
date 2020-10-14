import React from 'react';

const VideoDetail = ({ video }) => {
    // props.video --> video
    if (!video) {
        return <div>Loading...</div>
    }

    const videoSrc = "https://www.youtube.com/embed/";
    
    return (
        <div className="ui segment">
            <div className="ui embed">
                <iframe title="video player" src={videoSrc + video.id.videoId} />
            </div>
            <h4 className="ui header">{video.snippet.title}</h4>
            <p>{video.snippet.description}</p>
        </div>
    )
}

export default VideoDetail;