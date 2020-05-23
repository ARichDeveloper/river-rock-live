import React from 'react';

export default class RRLiveLogo extends React.Component {
    lightColors = {
        riverColor: '#FFFFFF',
        rockColor: '#FFFFFF',
        liveBGColor: '#FF0C00',
        liveColor: '#FFFFFF'
    };

    darkColors = {
        riverColor: '#7b7b7b',
        rockColor: '#7b7b7b',
        liveBGColor: '#8c8c8c',
        liveColor: '#000000'
    };

    render() {

        let { online } = this.props;

        const liveColor = online ? this.darkColors.liveColor : this.lightColors.liveColor,
            liveBGColor = online ? this.darkColors.liveBGColor : this.lightColors.liveBGColor,
            rockColor = online ? this.darkColors.rockColor : this.lightColors.rockColor,
            riverColor = online ? this.darkColors.riverColor : this.lightColors.riverColor

        return (
            <div>
                <svg viewBox="0 0 2000 300" version="1.1" style={{fillRule:'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2}}>
                    <g id="LIVE" transform="matrix(0.792775,0,0,0.817206,832.594,-394.84)">
                        <g transform="matrix(1.07136,0,0,1.0549,-295.318,-256.374)">
                            <path d="M1636.59,792.265C1636.59,746.475 1598.86,709.299 1552.38,709.299L994.235,709.299C947.759,709.299 910.026,746.475 910.026,792.265L910.026,958.197C910.026,1003.99 947.759,1041.16 994.235,1041.16L1552.38,1041.16C1598.86,1041.16 1636.59,1003.99 1636.59,958.197L1636.59,792.265Z" style={{ fill: liveBGColor }}/>
                        </g>
                        <g transform="matrix(1.26139,0,0,1.22368,569.537,371.311)">
                            <text x="147.927px" y="317.606px" style={{fontFamily:'ArialMT, Arial, sans-serif', fontSize: '220px', fill: liveColor}}>LIVE</text>
                        </g>
                    </g>
                    <g transform="matrix(1,0,0,1,-147.369,-95.3998)">
                        <text x="147.927px" y="321.187px" style={{ fontFamily:'ArialMT, Arial, sans-serif', fontSize: '225px', fill: riverColor }}>RIVER</text>
                        <text x="835.561px" y="321.187px" style={{ fontFamily:'ArialMT, Arial, sans-serif', fontWeight: 700, fontSize: '225px', fill: rockColor }}>ROCK</text>
                    </g>
                </svg>
            </div>
        )
    }
}
