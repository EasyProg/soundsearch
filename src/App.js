import React, { Component } from 'react';
import SoundSearch from './components/SoundSearch';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token:''
    }
  }
  getAccessToken = () => {
      let callback_url = window.location.href;
      const api_url = "https://accounts.spotify.com/authorize?client_id=58784f58061a4e37a7659588b167c8a6&response_type=token&redirect_uri="+callback_url;
      let access_token;
      let hash;
      if(!window.location.hash){
          window.location.replace(api_url);
      }else{
          let url = window.location.href;
          hash = url.split('#')[1];
          hash = hash.split('&')[0];
          hash = hash.split('=')[1];
      }
      access_token = hash;
      this.setState({token:access_token});
  };
  componentDidMount() {
    this.getAccessToken();
  }
  render() {
    return (
      <div className="App">
        <SoundSearch token={this.state.token}/>
      </div>
    );
  }
}

export default App;
