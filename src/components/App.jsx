import React from 'react';
import youtube from '../apis/youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    }

    componentDidMount() {
        this.onTermSubmit('covid')
    }

    onTermSubmit = async (term) => {
        try {
            const response = await youtube.get('/search', {
                params: {
                    q: term,
                    part: 'snippet',
                    type: 'video',
                    maxResults: 5,
                    key: process.env.REACT_APP_API_KEY
                }
            })

            // check out our data
            // console.log(response.data.items);

            // update our state with newly returned videos
            this.setState({ 
                videos: response.data.items,
                selectedVideo: response.data.items[0]
            })
        } catch(err) {
            console.log(err);
        }
    }

    onVideoSelect = (video) => {
        // console.log("From the App!", video);
        this.setState({
            selectedVideo: video
        })
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: "1rem"}}>
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList
                                onVideoSelect={this.onVideoSelect}
                                videos={this.state.videos}
                            />
                        </div>
                        {/* I have {this.state.videos.length} videos. */}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;