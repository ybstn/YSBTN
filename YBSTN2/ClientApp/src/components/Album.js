import React, { Component } from "react";
import {ModalBody } from 'reactstrap';
import Iframe from 'react-iframe';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
export class Album extends Component{

constructor(props) {
    super(props);
    this.state = {
        Albom: this.props.Albom, Footages: this.props.Footages, currentTrack: this.props.Albom.trackList[0], play: false, playerHorizontalView: true
    }
    this.audioRef = React.createRef();
    this.listenToResize = this.listenToResize.bind(this);
    this.TrackClick = this.TrackClick.bind(this);
    this.SongEnded = this.SongEnded.bind(this);
    this.PlayNext = this.PlayNext.bind(this);
    this.PlayPrev = this.PlayPrev.bind(this);
    this.Play = this.Play.bind(this);
    this.Pause = this.Pause.bind(this);
}
    componentDidMount() {
        if (window.innerWidth < 1024) {
            this.setState({ playerHorizontalView: false });
        }
        window.addEventListener('resize', this.listenToResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.listenToResize);
    }
    listenToResize() {
        if (window.innerWidth < 1024) {
            this.setState({ playerHorizontalView: false });
        }
        else {
            this.setState({ playerHorizontalView: true });
        }
    }
    TrackClick(Track) {
        if (Track.path !== this.state.currentTrack.path) {
            this.setState({ currentTrack: Track }, () => { });
        }
        else {
            if (this.audioRef.current.isPlaying()) {
                this.audioRef.current.audio.current.pause();
            }
            else {
                this.audioRef.current.audio.current.play();
            }
        }
    }
    SongEnded() {
        this.PlayNext();
    }
    Play() {
        //this.refs.VideoPlayer.play();
    }
    Pause() {
        //this.refs.VideoPlayer.pause();
    }
    PlayNext() {
        let id = this.state.currentTrack.trackId + 1;
        
        if (id > this.state.Albom.trackList.length) {
            this.setState({ currentTrack: this.state.Albom.trackList.find(x => x.trackId === 1)});
        }
        else {
            this.setState({ currentTrack: this.state.Albom.trackList.find(x => (x.trackId === id))});
        }
        
    }
    PlayPrev() {
        let id = this.state.currentTrack.trackId -1;
        if (id < 1) {
            this.setState({ currentTrack: this.state.Albom.trackList.find(x => x.trackId === this.state.Albom.trackList.length)});
        }
        else {
            this.setState({ currentTrack: this.state.Albom.trackList.find(x => x.trackId === id)});
        }
    }
    render() {
        let TrackClick = this.TrackClick;
        let currentTrack = this.state.currentTrack;
        //let currentFootage = this.state.Footages[currentTrack.trackId];
        //let currFotagePoster = currentFootage.replace(".mp4", ".png");
        //let insIndex = currFotagePoster.lastIndexOf('/') + 1;
        //currFotagePoster = currFotagePoster.slice(0, insIndex) + "Thumbnails/" + currFotagePoster.slice(insIndex);
        return (
            <ModalBody className="px-3">
                <div className="row flex-grow-1 h-50 AlbumSongsRow">
                    <div className="col d-flex flex-column">
                        {this.state.Albom.trackList.map(function (Track, index) {
                            let SongClass = "AlbumSongDiv";
                            if (currentTrack === Track) {
                                SongClass = "AlbumSongDivSelected";
                            }
                                return <div key={index} className="row">
                                    <div onClick={TrackClick.bind(this, Track)} className={SongClass}>{index}) {Track.name}</div>
                                    </div>
                                })
                            }
                        </div>
                    <div className="col-sm-6" id="albomIframe">
                        {/*   <video ref="VideoPlayer" className="VideoPlayer" loop={true} src={currentFootage} poster={currFotagePoster} controls controlsList="nodownload" >
                        </video>*/}
                        <Iframe url={this.state.Albom.albLink + "&modestbranding=1"}
                            
                            allowFullScreen
                            width="100%"
                        height="100%"
                        className="myClassname"
                        position="relative" />
                    </div>
                </div>
                        <div className="row my-3 ">
                    <div>{this.state.Albom.albumDescriptionText}</div>
                </div>
                <div className="row mt-auto">
                    <AudioPlayer ref={this.audioRef} src={this.state.currentTrack.path}
                        showSkipControls={true} showJumpControls={this.state.playerHorizontalView}
                        header={this.state.currentTrack.name}
                        layout={this.state.playerHorizontalView ? "horizontal" : "stacked"}
                        onEnded={this.SongEnded} onClickNext={this.PlayNext} onClickPrevious={this.PlayPrev} onPlay={this.Play} onPause={this.Pause}/>
                        </div>
            </ModalBody>

        );
    }
}