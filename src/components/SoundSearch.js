/**
 * Created by Михаил on 04.04.2018.
 */
import React, {Component} from 'react';
import {Search,Label} from 'semantic-ui-react';
import SoundDetails from './SoundDetails';
import notrack from '../img/no-track-image.jpg';
import '../styles/SoundSearch.css';
export default class SoundSearch extends Component
{   constructor (props) {
        super(props);
        this.state = {results:[],
                      isLoading:false,
                      lowSymbolsCount:false,
                      trackSelected:{artists:['1'],album:{}},
                      tracks:[]
                     }
    }
    searchData (queryParam)
    {
    const endpoint = 'https://api.spotify.com/v1/search?';
    const fetchUrl = `${endpoint}q=${queryParam}&type=track&limit=3`;
    let accessToken = this.props.token;
    let fetchOptions = {
      method:'GET',
      headers:{
          'Authorization':'Bearer '+accessToken
      },
      mode:'cors'
    };
        fetch(fetchUrl,fetchOptions)
        .then(response=>
        {if (response.status===200)
            return response.json();
            else throw new Error('Network response was not ok.');})
        .then(json=> {
        let res = json.tracks.items.map((item)=>{return {title:item.name,
                                                         image:item.album.images[2].url||notrack,
                                                         description:item.artists[0].name,
                                                         id:item.id
        }});
        this.setState({results:res,isLoading:false,tracks:json.tracks.items});
        })
    }
    handleResultSelect = (e, { result }) =>
    {   let find = (elem) => elem.id === result.id;
        let track = this.state.tracks.find(find);
        this.setState({ value: result.title,trackSelected:track});

    };
    handleSearchChange = (e, { value}) => {
        this.setState({results:[]});
        if (value.length<3)
        {
        this.setState({lowSymbolsCount:true,trackSelected:{artists:['1'],album:{}}});
        return false;
        }
        this.setState({lowSymbolsCount:false,isLoading:true});
        this.searchData(value);
        };
    render()
    {   let {isLoading,results} = this.state;
        return (
            <div>
            <div className="searchContainer">
                <Search                   loading={isLoading}
                                          onResultSelect={this.handleResultSelect}
                                          onSearchChange={this.handleSearchChange}
                                          results={results}
                                          minCharacters={3}
                                          size="massive"
                                          className="searchInput"
                                          input={{ fluid:true}}
                                          fluid={true}/>
                {this.state.lowSymbolsCount?
                <Label basic color='red' pointing
                                          attached="bottom"
                >Please enter at least 3 symbols</Label>:null}
            </div>
            <SoundDetails trackSelected = {this.state.trackSelected}/>
            </div>
        )
    }
}