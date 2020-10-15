import React from 'react';
import Header from "./components/header/Header";
import Main from './components/main/Main';
import Features from './components/features/Features';
import Footer from './components/footer/Footer';
import './style.css';

import FetchData from './service/FetchData';

class App extends React.Component{

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
  };

  componentDidMount(){
    this.updateRocket();

  }

  updateRocket(){
  
    this.fetchData.getRocket()
        .then(data=>{
          this.setState({rockets: data.map(item => item.name)});
          return data;
        })
        .then(data => data.find(item => item.name === this.state.rocket))
        .then(rocketFeatures => this.setState({rocketFeatures}))    
      }

  changeRocket = rocket => {
    this.setState({
      rocket
    }, this.updateRocket);
  }

  render(){
    console.log(this.state);
    
    return (
    <React.Fragment>
    <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>
    <Main rocket={this.state.rocket}/>
    <Features  rocket={this.state.rocket} rocketFeatures={this.state.rocketFeatures}/>
    <Footer />

</React.Fragment>
    
    );
  }
}

export default App;
