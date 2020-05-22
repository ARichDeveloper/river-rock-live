import React from 'react';
import HlsEvents from './hlsEvents';
import './video.css'

export default class Player extends React.Component {
    constructor(props) {
        super(props);

        this.videoTag = React.createRef();
        this.state = {
            liveStream: null
        }
    }

    componentDidMount() {
        HlsEvents.initializeHLS(this.videoTag.current, this.props.src);
    }

    render() {
        return (
            <video id="live-stream" ref={this.videoTag} />
        )
    }
}
