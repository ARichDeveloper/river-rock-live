/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
//import 'videojs-logo';
import 'video.js/dist/video-js.css';

const usePlayer = ({ src, events, controls, autoplay }) => {
    const options = {
        fill: true,
        fluid: true,
        preload: 'auto',
        html5: {
            hls: {
                enableLowInitialPlaylist: true,
                smoothQualityChange: true,
                overrideNative: true,
            },
        },
    };
    const videoRef = useRef(null);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const vjsPlayer = videojs(videoRef.current, {
            ...options,
            controls,
            autoplay,
            sources: [src],
        });
        setPlayer(vjsPlayer);

        vjsPlayer.on('play', () => {
           events.play();
        });

        vjsPlayer.on('pause', () => {
            events.pause();
        });

        return () => {
            if (player !== null) {
                player.dispose();
            }
        };
    }, []);
    useEffect(() => {
        if (player !== null) {
            player.src({ src });
        }
    }, [src]);

    return videoRef;
};

const VideoPlayer = ({ src, events, controls, autoplay }) => {
    const channel = 'ekrzw3ypbltz9aaohsml';
    const options = {
        "showTitle": 0,
        "showDescription": 0,
        "showHighlights": 0,
        "showRelated": false,
        "defaultVideo": "next",
        "market": "house-of-worship",
        "showDocuments": false,
        "showIndex": false,
        "showDonations": false
    }
    const playerRef = usePlayer({ src, events, controls, autoplay });

    return (
        <div data-vjs-player>
            <video ref={playerRef} className="vjs-matrix video-js" />
        </div>
    );
};

VideoPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    controls: PropTypes.bool,
    autoplay: PropTypes.bool,
};

VideoPlayer.defaultProps = {
    controls: true,
    autoplay: false,
};

export default VideoPlayer;
