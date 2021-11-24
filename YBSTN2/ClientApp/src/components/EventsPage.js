import React, { Component } from 'react';
import { trackPromise } from "react-promise-tracker";
import { Modal, ModalHeader } from 'reactstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Event } from './Event.js';
import { EventCard } from './EventCard.js';

//const devSite = "localhost:5001";
const devSite = "ybstn.ru";

export class EventsPage extends Component {
    static displayName = "Events";
    constructor(props) {
        super(props);
        this.state = {
            Events: [], SingleEvent: [], EventModal: false, ClickedEventId: 0, activeIndex: 0, animating: false,
            currentTrack: "", hidePlayer: true, playerHorizontalView: true, scrollposition: 0 
        }
        this.audioRef = React.createRef();
        this.listenToScroll = this.listenToScroll.bind(this); 
        this.listenToResize = this.listenToResize.bind(this);
        this.loadData = this.loadData.bind(this);
        this.EventClick = this.EventClick.bind(this);
        this.ToggleEventModal = this.ToggleEventModal.bind(this);
        this.TrackClick = this.TrackClick.bind(this);
        this.SongEnded = this.SongEnded.bind(this);
        this.PlayNext = this.PlayNext.bind(this);
        this.PlayPrev = this.PlayPrev.bind(this);
        this.hidePlayer = this.hidePlayer.bind(this);
    }
    loadData() {
       
        var url = new URL("https://" + devSite + "/EventsData");
        
        trackPromise(
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => this.setState({ Events: data.sort((a, b) => b.eid - a.eid) }))
        );
    }
    componentDidMount() {

        this.loadData();
        if (window.innerWidth < 1024) {
            this.setState({ playerHorizontalView: false });
        }
        window.addEventListener('scroll', this.listenToScroll);
        window.addEventListener('resize', this.listenToResize);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
        window.removeEventListener('resize', this.listenToResize);
    }
    listenToScroll() {
        let winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        let height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        let scrolled = (winScroll / height);
        this.setState({
            scrollposition: scrolled,
        })
    }
    listenToResize() {
        if (window.innerWidth < 1024) {
            this.setState({ playerHorizontalView: false });
        }
        else {
            this.setState({ playerHorizontalView: true });
        }
    }
    EventClick(id) {

        this.setState({ ClickedEventId: id });
        let event = this.state.Events.find(x => x.eid === id);
        this.setState({ SingleEvent: event }, () => { this.ToggleEventModal(); });
    }

    ToggleEventModal() {
        this.setState({ EventModal: !this.state.EventModal });
    }
    TrackClick(Track) {
        this.setState({ hidePlayer: false });
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
    hidePlayer() {
        this.setState({ hidePlayer: !this.state.hidePlayer });
    }
    SongEnded() {
        this.PlayNext();
    }
    PlayNext() {
        let Event = this.state.Events.find(x => x.audioFiles.some(x => x.path === this.state.currentTrack.path));
        let EventTrackList = Event.audioFiles;
        let EventCurrentTrackIndex = EventTrackList.findIndex(x => x.path === this.state.currentTrack.path) + 1;
        let EventTracksCount = Event.audioFiles.length;
        if (EventCurrentTrackIndex >= EventTracksCount) {
            this.setState({ currentTrack: EventTrackList[0] });
        }
        else {
            this.setState({ currentTrack: EventTrackList[EventCurrentTrackIndex] });
        }
    }
    PlayPrev() {
        let Event = this.state.Events.find(x => x.audioFiles.some(x => x.path === this.state.currentTrack.path));
        let EventTrackList = Event.audioFiles;
        let EventCurrentTrackIndex = EventTrackList.findIndex(x => x.path === this.state.currentTrack.path)-1;
        let EventTracksCount = Event.audioFiles.length;
        if (EventCurrentTrackIndex < 0) {
            this.setState({ currentTrack: EventTrackList[EventTracksCount-1] });
        }
        else {
            this.setState({ currentTrack: EventTrackList[EventCurrentTrackIndex] });
        }
    }
    render() {
        let TrackClick = this.TrackClick;
        var EventClick = this.EventClick;
        var events = this.state.Events;
        let currentTrack = this.state.currentTrack
        if (JSON.stringify(events) === "[]") {
            return null;
        }
        let bgCol = "";
        //let bgCol = "rgba(" + this.state.scrollposition*255 + "," + this.state.scrollposition*255 + "," + this.state.scrollposition*255 + ",1)";
        //let bgCol = "linear-gradient(180deg,black " + (92 - (this.state.scrollposition * 92)) + "%, rgba(165,20,32,1) 92%, rgba(172,15,23,1) 100% )";
        //let bgCol = "linear-gradient(90deg, rgba(255,239,228,1) " + (this.state.scrollposition * 92) + "%, rgba(172,15,23,1) " + (92 - (this.state.scrollposition * 92)) + "%, rgba(165,20,32,1) 100%)";
        //let bgCol = "radial-gradient(circle, rgba(172,15,23,1) 0%, black " + (100 - (this.state.scrollposition * 100)) + "%)";
        return (
            <div className="EventsPlaceholderPanel" style={{background: bgCol }}>
                <Modal isOpen={this.state.EventModal} toggle={this.ToggleEventModal} className="modal-fullscreen EventModal" >

                    <ModalHeader toggle={this.ToggleEventModal}>{this.state.SingleEvent.eventName}</ModalHeader>

                    <Event Event={this.state.SingleEvent} />

                </Modal>
                <div className="h-100 EventsPanel">
                    
                    {
                       events.map(function (Event, index) {
                            let image = "url('" + Event.coverImgUrl + "')";
                            return (
                                <EventCard key={index} EventClick={EventClick} TrackClick={TrackClick} event={Event} image={image} currentTrack={currentTrack}/>
                            )
                        })
                    }
                </div>
                
                <div className="row mt-auto EventAudioPlayerContainer" >
                    <div className="btn HidePlayerButton" onClick={this.hidePlayer} style={{ transform: this.state.hidePlayer ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
                    <AudioPlayer src={this.state.currentTrack.path} ref={this.audioRef}
                        showSkipControls={true} showJumpControls={this.state.playerHorizontalView}
                        header={this.state.currentTrack.name}
                        layout={this.state.playerHorizontalView ? "horizontal" : "stacked"}
                        onEnded={this.SongEnded} onClickNext={this.PlayNext} onClickPrevious={this.PlayPrev}
                        style={{ display: this.state.hidePlayer ? 'none' : 'block' }}/>
                   
                </div>
            </div>

        );
    }
}
