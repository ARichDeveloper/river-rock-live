import React from 'react';
import axios from 'axios';
import moment from 'moment';
import sortby from 'lodash.sortby';
import './App.css';
import Header from './Header/Header';
import Player from './Video/Player';

export default class App extends React.Component{
    static shortPollCountdownThreshold = 300000; // 5 minutes;
    static thirtySeconds = 30000 // 30 seconds

    backgrounds = [
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%23000824' points='800 100 0 200 0 800 1600 800 1600 200'/%3E%3Cpolygon fill='%23001049' points='800 200 0 400 0 800 1600 800 1600 400'/%3E%3Cpolygon fill='%2300186d' points='800 300 0 600 0 800 1600 800 1600 600'/%3E%3Cpolygon fill='%23002192' points='1600 800 800 400 0 800'/%3E%3Cpolygon fill='%230029b6' points='1280 800 800 500 320 800'/%3E%3Cpolygon fill='%230031db' points='533.3 800 1066.7 800 800 600'/%3E%3Cpolygon fill='%230039ff' points='684.1 800 914.3 800 800 700'/%3E%3C/g%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2000' height='2000' viewBox='0 0 800 800'%3E%3Cg fill='none' %3E%3Cg stroke='%23000000' stroke-width='17'%3E%3Cline x1='-8' y1='-8' x2='808' y2='808'/%3E%3Cline x1='-8' y1='792' x2='808' y2='1608'/%3E%3Cline x1='-8' y1='-808' x2='808' y2='8'/%3E%3C/g%3E%3Cg stroke='%23010105' stroke-width='16'%3E%3Cline x1='-8' y1='767' x2='808' y2='1583'/%3E%3Cline x1='-8' y1='17' x2='808' y2='833'/%3E%3Cline x1='-8' y1='-33' x2='808' y2='783'/%3E%3Cline x1='-8' y1='-783' x2='808' y2='33'/%3E%3C/g%3E%3Cg stroke='%2302020a' stroke-width='15'%3E%3Cline x1='-8' y1='742' x2='808' y2='1558'/%3E%3Cline x1='-8' y1='42' x2='808' y2='858'/%3E%3Cline x1='-8' y1='-58' x2='808' y2='758'/%3E%3Cline x1='-8' y1='-758' x2='808' y2='58'/%3E%3C/g%3E%3Cg stroke='%2303030e' stroke-width='14'%3E%3Cline x1='-8' y1='67' x2='808' y2='883'/%3E%3Cline x1='-8' y1='717' x2='808' y2='1533'/%3E%3Cline x1='-8' y1='-733' x2='808' y2='83'/%3E%3Cline x1='-8' y1='-83' x2='808' y2='733'/%3E%3C/g%3E%3Cg stroke='%23030412' stroke-width='13'%3E%3Cline x1='-8' y1='92' x2='808' y2='908'/%3E%3Cline x1='-8' y1='692' x2='808' y2='1508'/%3E%3Cline x1='-8' y1='-108' x2='808' y2='708'/%3E%3Cline x1='-8' y1='-708' x2='808' y2='108'/%3E%3C/g%3E%3Cg stroke='%23040515' stroke-width='12'%3E%3Cline x1='-8' y1='667' x2='808' y2='1483'/%3E%3Cline x1='-8' y1='117' x2='808' y2='933'/%3E%3Cline x1='-8' y1='-133' x2='808' y2='683'/%3E%3Cline x1='-8' y1='-683' x2='808' y2='133'/%3E%3C/g%3E%3Cg stroke='%23050718' stroke-width='11'%3E%3Cline x1='-8' y1='642' x2='808' y2='1458'/%3E%3Cline x1='-8' y1='142' x2='808' y2='958'/%3E%3Cline x1='-8' y1='-158' x2='808' y2='658'/%3E%3Cline x1='-8' y1='-658' x2='808' y2='158'/%3E%3C/g%3E%3Cg stroke='%2306081b' stroke-width='10'%3E%3Cline x1='-8' y1='167' x2='808' y2='983'/%3E%3Cline x1='-8' y1='617' x2='808' y2='1433'/%3E%3Cline x1='-8' y1='-633' x2='808' y2='183'/%3E%3Cline x1='-8' y1='-183' x2='808' y2='633'/%3E%3C/g%3E%3Cg stroke='%2306091d' stroke-width='9'%3E%3Cline x1='-8' y1='592' x2='808' y2='1408'/%3E%3Cline x1='-8' y1='192' x2='808' y2='1008'/%3E%3Cline x1='-8' y1='-608' x2='808' y2='208'/%3E%3Cline x1='-8' y1='-208' x2='808' y2='608'/%3E%3C/g%3E%3Cg stroke='%23070a20' stroke-width='8'%3E%3Cline x1='-8' y1='567' x2='808' y2='1383'/%3E%3Cline x1='-8' y1='217' x2='808' y2='1033'/%3E%3Cline x1='-8' y1='-233' x2='808' y2='583'/%3E%3Cline x1='-8' y1='-583' x2='808' y2='233'/%3E%3C/g%3E%3Cg stroke='%23070b22' stroke-width='7'%3E%3Cline x1='-8' y1='242' x2='808' y2='1058'/%3E%3Cline x1='-8' y1='542' x2='808' y2='1358'/%3E%3Cline x1='-8' y1='-558' x2='808' y2='258'/%3E%3Cline x1='-8' y1='-258' x2='808' y2='558'/%3E%3C/g%3E%3Cg stroke='%23060c25' stroke-width='6'%3E%3Cline x1='-8' y1='267' x2='808' y2='1083'/%3E%3Cline x1='-8' y1='517' x2='808' y2='1333'/%3E%3Cline x1='-8' y1='-533' x2='808' y2='283'/%3E%3Cline x1='-8' y1='-283' x2='808' y2='533'/%3E%3C/g%3E%3Cg stroke='%23060d28' stroke-width='5'%3E%3Cline x1='-8' y1='292' x2='808' y2='1108'/%3E%3Cline x1='-8' y1='492' x2='808' y2='1308'/%3E%3Cline x1='-8' y1='-308' x2='808' y2='508'/%3E%3Cline x1='-8' y1='-508' x2='808' y2='308'/%3E%3C/g%3E%3Cg stroke='%23050e2b' stroke-width='4'%3E%3Cline x1='-8' y1='467' x2='808' y2='1283'/%3E%3Cline x1='-8' y1='317' x2='808' y2='1133'/%3E%3Cline x1='-8' y1='-333' x2='808' y2='483'/%3E%3Cline x1='-8' y1='-483' x2='808' y2='333'/%3E%3C/g%3E%3Cg stroke='%23040f2d' stroke-width='3'%3E%3Cline x1='-8' y1='342' x2='808' y2='1158'/%3E%3Cline x1='-8' y1='442' x2='808' y2='1258'/%3E%3Cline x1='-8' y1='-458' x2='808' y2='358'/%3E%3Cline x1='-8' y1='-358' x2='808' y2='458'/%3E%3C/g%3E%3Cg stroke='%23021030' stroke-width='2'%3E%3Cline x1='-8' y1='367' x2='808' y2='1183'/%3E%3Cline x1='-8' y1='417' x2='808' y2='1233'/%3E%3Cline x1='-8' y1='-433' x2='808' y2='383'/%3E%3Cline x1='-8' y1='-383' x2='808' y2='433'/%3E%3C/g%3E%3Cg stroke='%23013' stroke-width='1'%3E%3Cline x1='-8' y1='392' x2='808' y2='1208'/%3E%3Cline x1='-8' y1='-408' x2='808' y2='408'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%230a0b3b' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E"
    ];

    constructor(props) {
        super(props);

        this.state = {
            online: false,
            playing: false,
            loaded: false,
            videoUrl: 'https://play.boxcast.com/p/bequs9eerdkzbx4m8cwz/v/all-ext.m3u8?Expires=2147483647&Signature=l84CB4tNFdcg53WOk4e6vwwxJ74xHivMJhknWgF3fn20nX3aTzWZA87~vczTTW1czOHR1ICqWplZCZyabkkB0WzFLwwud0ZOoUDFams1w8qNnYxNT9D-nyFe9FgEqnURrfNWaFtBo-U8FwD5vVlE75Zx~8t4sEPtx2qY5E1hboD3t3LLA0Yv1y3~aFr40NyYow~AWU2Zu07EiqTrOGiur4PT5B3F1DsUFoETKnI3Efs43AvnoGiDLMCf54GZS9m7IF8MG1mGaLa-iJ3bQUoLFZ3gt2Dp6wyNDxnSg1agGM8I3k3NdKErtBpaDuKvK59JJFo7dFxHl5RxEaN8U4VT9A__&Key-Pair-Id=APKAJ7GUCBQUK6NTWZCA',
            testVideoUrl: 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8',
            backgroundColor: '#16357e',
        }
    }

    componentWillMount() {
        this.fetchBroadcasts().then(channels => {
            const currentChannel = this.getCurrentOrNearestUpcoming(channels);
            const howLong = currentChannel.starts_at.diff(moment())

            if (howLong < this.shortPollCountdownThreshold) {
                // begin short polling;
            }
        })
    }

    fetchBroadcasts() {
        let channels = {};

        const promise = new Promise((resolve, reject) =>  {
            axios.get(`${process.env.REACT_APP_API_BASEURL}/api/broadcasts`).then(response => {
                channels = (((response.data || {}).channels || {}).data || {});
                channels.forEach(channel => {
                    channel.starts_at = moment(channel.starts_at);
                    channel.stops_at = moment(channel.stops_at);
                });

                resolve(channels);
            }).catch(error => {
                reject(error)
            });
        });

        return promise;
    }

    getCurrentOrNearestUpcoming(channels) {
        const now = moment();

        let current = channels.filter(channel => now.isBetween(channel.starts_at, channel.stops_at));

        let future = sortby(channels.filter(channel => now.isBefore(channel.starts_at)), futureChannel => futureChannel.starts_at);

        return current.length ? current[0] : future[0];
    }

    events = {
        play: () => {
            this.setState({ backgroundColor: '#000', playing: true, online: true, loaded: true })
        },

        pause: () => {
            this.setState({ backgroundColor: '#16357e', playing: false, online: true, loaded: true })
        },
    }

    render() {
        const { online, playing, videoUrl } = this.state;
        return (
            <div className="App" style={{backgroundImage: `url("${this.backgrounds[1]}")`, backgroundColor: !playing ? '#16357e' : '#000' }}>
                <Header online={online} playing={playing} />
                <div className="App-body">
                    <div class="video-well">
                        <Player src={videoUrl} events={this.events} />
                    </div>
                </div>
            </div>
        )
    }
}
