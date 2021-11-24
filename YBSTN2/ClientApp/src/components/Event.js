import React, { Component } from "react";
import { ModalBody } from 'reactstrap';
import Iframe from 'react-iframe';
import Carousel from 'react-bootstrap/Carousel';
export class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Event: this.props.Event
        }
    }
   
    render() {
        let videos;
        let videosCount = 0;
        if (this.state.Event.eventVideoLinks.length !== 0) {
            videosCount = this.state.Event.eventVideoLinks.length;
            videos =
                this.state.Event.eventVideoLinks.map(function (IframeUrl, index) {
                    return (<Carousel.Item key={ index} className="h-100">
                        <Iframe url={IframeUrl}
                            allowFullScreen
                            width="100%"
                            height="100%"
                            position="relative"/>
                    </Carousel.Item>)
                });
            
        }
        return (
            <ModalBody className="px-3">
                <Carousel interval={null} id="EventImagesCarousel" className="h-100 pb-1">
                    {
                  
                        this.state.Event.files.map(function (Img, index) {
                            let image = "url('" + Img + "')";
                           
                            return (<Carousel.Item key={videosCount + index} className="h-100">

                                <div className="AlbumImage" style={{ backgroundImage: image }}/>
                                
                            </Carousel.Item>)
                        })
                        
                    }
                    {videos}
                </Carousel>
            </ModalBody>

        );
    }
}