import React, { Component } from 'react';
import { trackPromise } from "react-promise-tracker";
import { Modal, ModalHeader } from 'reactstrap';
import { CardGroup, Card } from 'react-bootstrap'
import { Album } from './Album.js';
const devSite = "localhost:5001";//"ybstn.ru";



export class AdminPage extends Component {
    static displayName = "admin";
   
    constructor(props) {
        super(props);
        this.state = {
            Albumes: [], Footages: [], AlbomModal: false, ClickedAlbumId: 0, activeIndex: 0, animating: false
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
        this.setState({ AlbomModal: !this.state.AlbomModal });
    }

    render() {
        var AlbumClick = this.AlbomClick;
        var albumes = this.state.Albumes;
        let ModalBack;
        if (JSON.stringify(albumes) === "[]") {
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
                <CardGroup>
                    {
                        albumes.map(function (Album, index) {
                            return (
                                <Card key={index} className="h-100">
                                    <Card.Img src={Album.imgUrl} />
                                    <Card.Body className="p-1">
                                        <Card.Title lassName="h-5">{Album.name}
                                        </Card.Title>
                                    <Card.Text>{Album.albumDescriptionText}</Card.Text>
                                    
                                    </Card.Body>
                                    <Card.Body>
                                       
                                        <div className="btn btn-warning" onClick={AlbumClick.bind(this, index)} >EDit</div>
                                        <div className="btn btn-danger" onClick={ null}>X</div>
                                    </Card.Body>
                                </Card>
                                )
                        })
                    }
                    </CardGroup>
            </div>
        );
    }
}