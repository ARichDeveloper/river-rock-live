import React from 'react';
import './player.css'
import VideoPlayer from './Video';


export default class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            liveStream: null
        }
    }

    render() {
        return (
            <VideoPlayer id="live-stream" class="video-js" src={this.props.src} events={this.props.events} />
        )
    }
}
