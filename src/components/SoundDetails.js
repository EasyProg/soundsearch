/**
 * Created by Михаил on 04.04.2018.
 */
import React,{Component} from 'react';
import '../styles/SoundDetails.css';
export default class SoundDetails extends Component {
    constructor(props) {
      super(props);
    }
    render () {
        let track = this.props.trackSelected;
        let duration = track.duration_ms/1000/60;
        let release_date = new Date(track.album.release_date).toLocaleString().substr(0,10);
        if (!track.id)
        return (
            <div className="detailsContainerText">
                Please choose a track ...
            </div>
        );
        else return (
            <div className="detailsContainer">
                <div className="albumInfoCont">
                    <p>Artist:  <br/>{track.artists[0].name}</p>
                    <p>Album:   <br/>{track.album.name}</p>
                    <div>
                    <img src={track.album.images[1].url}/>
                    <div className="releaseCont">
                    <p>Released: {release_date}</p>
                    <p>Album type: {track.album.album_type}</p>
                    </div>
                    </div>
                </div>
                <div className="trackInfoCont">
                    <p>{track.name}</p>
                    <div>
                    <p>Track num.: {track.track_number}</p>
                    <p>Duration:   {duration.toFixed(2)}</p>
                    <p>Popularity: {track.popularity}</p>
                    </div>
                    <a href={track.preview_url} className="previewUrlDiv">
                    <div>
                        Url for Play...
                    </div>
                    </a>
                    <div>
                    <p>Disc num.: {track.disc_number}</p>
                    </div>
                </div>
            </div>
        )
    }
}