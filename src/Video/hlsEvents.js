import * as HLS from 'hls.js';

class HlsEvents {
    liveStream = undefined;
    videoTag = undefined;

    config = {
        capLevelToPlayerSize: false,
        capLevelOnFPSDrop: false,
        debug: true,
        autoStartLoad: true,
        startPosition: -1,
        defaultAudioCodec: undefined,
        initialLiveManifestSize: 1,
        maxBufferLength: 30,
        maxBufferSize: 60 * (1000*1000), //60MB
        maxBufferHole: 0.5,
        maxStarvationDelay: 4,
        maxLoadingDelay: 4,
        lowBufferWatchdogPeriod: 0.5,
        highBufferWatchdogPeriod: 3,
        nudgeOffset: 0.1,
        nudgeMaxRetry: 3,
        maxFragLookUpTolerance: 0.25,
        maxMaxBufferLength: 600,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: Infinity,
        liveSyncDuration: undefined,
        liveMaxLatencyDuration: undefined,
        liveDurationInfinity: false,
        liveBackBufferLength: Infinity,
        enableWorker: true,
        enableSoftwareAES: true,
        startLevel: undefined,

        fragLoadingTimeOut: 20000,
        manifestLoadingTimeOut: 10000,
        levelLoadingTimeOut: 10000,

        fragLoadingMaxRetry: 6,
        manifestLoadingMaxRetry: Infinity,
        levelLoadingMaxRetry: 4,

        fragLoadingMaxRetryTimeout: 64000,
        manifestLoadingMaxRetryTimeout: 64000,
        levelLoadingMaxRetryTimeout: 64000,

        fragLoadingRetryDelay: 1000,
        manifestLoadingRetryDelay: 1000,
        levelLoadingRetryDelay: 1000,

        startFragPrefetch: false,
        testBandwidth: true,
        appendErrorMaxRetry: 3,
        fLoader: undefined,
        pLoader: undefined,
        xhrSetup: undefined,
        fetchSetup: undefined,

    };

    constructor() {
        this.liveStream = new HLS(this.config);
    }

    attemptToPlay = () => {
        debugger;
        if (this.liveStream.media) {
            this.liveStream.media.play();
        }
    };

    initializeHLS = (videoTag, videoSource) => {
        if (HLS.isSupported) {
            this.liveStream.loadSource(videoSource);
            this.liveStream.attachMedia(videoTag);
            this.liveStream.on(HLS.Events.MEDIA_ATTACHED, () => {
                console.log("Video tag bound");
                this.liveStream.on(HLS.Events.MANIFEST_PARSED, (event, data) => {
                    console.log(`Manifest loaded: Quality level ${data.levels.length}`);
                    this.registerEvents();
                })
            });
        }
    };

    error = (event, data) => {
        if (data.fatal) {
            switch (data.type) {
                case HLS.ErrorTypes.NETWORK_ERROR:
                    // try to recover network error
                    console.log("fatal network error encountered, try to recover");
                    HLS.startLoad();
                    break;
                case HLS.ErrorTypes.MEDIA_ERROR:
                    console.log("fatal media error encountered, try to recover");
                    HLS.recoverMediaError();
                    break;
                default:
                    // cannot recover
                    HLS.destroy();
                    break;
            }
        }
    };

    registerEvents = () => {
        this.liveStream.on(HLS.Events.ERROR, this.error);
    };
}

export default new HlsEvents();
