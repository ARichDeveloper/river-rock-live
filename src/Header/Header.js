import React from 'react';
import RRLiveIcon from '../assets/components/RRLiveIcon';
// import rrLiveOffline from '../assets/RRlive-Offline.svg';
import {cssClasses} from '../HelperFunctions';
import "./Header.css"

export default class Header extends React.Component{
    render() {
        // const { online } = this.props;
        return (
            <header className={cssClasses("App-header")}>
                <RRLiveIcon online={this.props.online && this.props.playing} />
            </header>
        )
    }

}
