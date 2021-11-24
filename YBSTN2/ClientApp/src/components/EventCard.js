import React, { Component } from "react";
export class EventCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: this.props.event, image: this.props.image
        }
        this.TrackClick = this.TrackClick.bind(this);
        this.EventClick = this.EventClick.bind(this);
    }
    TrackClick(Track) {
        this.props.TrackClick(Track);
    }
    EventClick(id) {
        this.props.EventClick(id);
    }
    render() {
        let TrackClick = this.TrackClick;
        var EventClick = this.EventClick;
        let Event = this.state.event;
        let currentTrack = this.props.currentTrack;
       
        let HasAudio = Event.audioFiles.length !== 0 ? true : false;
        let EventLink;
        if (Event.eventLink !== "") {
            EventLink = <a href={Event.eventLink} className="link-secondary">
                <small className="text-light">{Event.eventLinkText}</small>
            </a>
        }
        else {
            EventLink = <small className="text-light">{Event.eventLinkText}</small>
        }
        let HasGalleryFiles = (Event.files.length !== 0 || Event.eventVideoLinks.length !== 0) ? true : false;
            return (
                <div className="card mx-5 mb-3 text-white" style={{ backgroundColor: "rgba(0, 0, 0, .8)"}}>
                    <div className="row g-0">
                        <div className="col-sm-3 d-flex" style={{ backgroundColor: "black" }}>
                            <div className="OpenEventImage m-auto" onClick={HasGalleryFiles ? EventClick.bind(this, Event.eid) : undefined} style={{ backgroundImage: this.state.image }} >
                                <div className="EventImagePlayButton" style={{ display: HasGalleryFiles ? "block" : "none" }} />
                            </div>
                        </div>
                        <div className="d-flex col-sm-9 px-0">
                            <div className="card-body d-flex flex-column justify-content-between p-0">
                                <div className="text-center row g-0 border-bottom border-dark" >
                                    <div className={(HasAudio ? "col-sm-8" : "col-sm-12") + " card-title mb-0 text-uppercase"}>
                                        <div>{Event.eventName}</div>
                                    </div>
                                    <div className="col-sm-4 card-title mb-0">
                                        <div className="EventAudioIcon" />
                                    </div>
                                </div>
                                <div className="row h-100 g-0">
                                    <div className={(HasAudio ? "col-sm-8" : "col-sm-12") + ""} style={{ backgroundColor: "rgba(255,255,255,.2)"} }>
                                        <p className="px-2 mt-2">{HasAudio ? Event.eventShortDescription : Event.eventLongDescription}</p>
                                    </div>
                                    {HasAudio &&
                                        <div className="col-sm-4" style={{ backgroundColor: "rgba(255,255,255,.1)" } }>
                                        <div className="px-2 my-2">
                                            {
                                                Event.audioFiles.map(function (Track, subindex) {
                                                    let border = true;
                                                    if (subindex === (Event.audioFiles.length - 1)) {
                                                        border = false;
                                                    }
                                                    let isCurrent = currentTrack.path === Track.path ? false : true;
                                                 
                                                    return (
                                                        <div key={Track.path + "1"} className={(border ? "border-bottom" : "") + (isCurrent ? " EventSongDiv" :" EventSongDivSelected") + " border-secondary"} onClick={TrackClick.bind(this, Track)}>
                                                            <span className={(isCurrent ? "EventSongPlayIcon" : "EventCurrentSongPlayIcon") +" me-1"}></span>{Track.name}
                                                        </div>
                                                        )
                                                    })
                                            }
                                        </div>
                                    </div>
                                    }
                                </div>
                                <div className="card-footer text-muted py-0 border-top border-dark text-end">
                                    {EventLink}
                                    {Event.eventLinkText!=="" &&
                                        <small className="text-muted"> / </small>}
                                    <small className="text-muted">{Event.eventDate}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}