import React, { Component } from 'react';
import { trackPromise } from "react-promise-tracker";
import { Modal, ModalHeader} from 'reactstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Album } from './Album.js';

//const devSite = "localhost:5001";
const devSite = "ybstn.ru";

export class Home extends Component {
    
    //static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            Albumes: [], Footages:[], AlbomModal: false, ClickedAlbumId: 0, activeIndex: 0, animating: false
        }
        this.loadData = this.loadData.bind(this);
        this.AlbomClick = this.AlbomClick.bind(this);
        this.ToggleAlbumModal = this.ToggleAlbumModal.bind(this);

    }
    loadData() {
        var url = new URL("https://" + devSite + "/Home");
        trackPromise(
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => this.setState({ Albumes: data.albumes, Footages: data.currentFootageArray }))
        );
    }
    componentDidMount() {
        this.loadData();
    }

    AlbomClick(id) {
        this.setState({ ClickedAlbumId: id });
        this.ToggleAlbumModal()
    }
    ToggleAlbumModal() {
        this.setState({ AlbomModal: !this.state.AlbomModal});
    }

    render() {
        var AlbumClick = this.AlbomClick;
        var albumes = this.state.Albumes;
        let ModalBack;
        if (JSON.stringify(albumes) === "[]")
        {
            return null;
        }
        if (this.state.AlbomModal) {
            ModalBack = <div className="ModalBackGround" style={{ backgroundImage: "url('" + albumes[this.state.ClickedAlbumId].imgUrl + "')" }} />;
        }
        return (
            <div className="AlbumsPlaceholderPanel">
                {ModalBack}
                <Modal isOpen={this.state.AlbomModal} toggle={this.ToggleAlbumModal} className="modal-fullscreen AlbumModal" >
                   
                    <ModalHeader toggle={this.ToggleAlbumModal}>LP "{albumes[this.state.ClickedAlbumId].name}"</ModalHeader>

                    <Album Albom={albumes[this.state.ClickedAlbumId]} Footages={this.state.Footages} />
                  
                </Modal>
                <Carousel fade interval={null} className="h-100 pb-1">
                    {
                        albumes.map(function (Album, index) {
                            let image = "url('" + Album.imgUrl + "')";
                            return (<Carousel.Item key={index} className="h-100">
                                <div className="AlbumImage" onClick={AlbumClick.bind(this, index)} style={{ backgroundImage: image }}>
                                 
                                </div>
                        </Carousel.Item>)
                        })
                        }
                  
                </Carousel>
            
            </div>
        );
    }
}
