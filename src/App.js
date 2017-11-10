import React, { Component } from 'react';
import './App.css';
import treeData from './imagetree.json';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      //the tree of image selections available to the user
      imageTree: treeData.imageTreeRoot,
      keyPath: []
    }
  }

  addKeyPath(key){
    this.setState((prevState) => {
      var newKeyPath = prevState.keyPath.concat([key]);
      return {
        keyPath: newKeyPath
      }
    });
  }

  remKeyPath(){
    this.setState((prevState) => {
      var newKeyPath = prevState.keyPath.slice(0, prevState.keyPath.length - 1);
      return {
        keyPath: newKeyPath
      }
    });
  }

  clickClass(item, currentMap){
    let cssClass = "col-md-3 col-sm-6 selectionTile";
    if(currentMap[item].children && Object.keys(currentMap[item].children).length > 0){
      cssClass = cssClass + ' clickTile';
    }

    return cssClass;
  }

  clickHandler(item, currentMap){
    let onClick = undefined;
    if(currentMap[item].children && Object.keys(currentMap[item].children).length > 0){
      onClick = () => {
        this.addKeyPath(item);
      };
    }

    return onClick;
  }

  render() {
    let goBack = null;
    let currentMap = this.state.imageTree;
    let i = 0;
    while(i < this.state.keyPath.length){
      currentMap = currentMap[this.state.keyPath[i]].children;
      i++;
    }
    if(this.state.keyPath.length > 0){
      goBack = <div className="col-md-3 col-sm-6 selectionTile clickTile" onClick={() => {this.remKeyPath();}}>
        <img src={process.env.PUBLIC_URL + "/images/goback.png"}
          alt="goback"/>
      </div>;
    }
    return (
      <div className="App">
        {goBack}
        {Object.keys(currentMap).map((item, index) => (
            <div className={this.clickClass(item, currentMap)} key={item}
              onClick={this.clickHandler(item, currentMap)}>
              <img src={process.env.PUBLIC_URL + "/images/" + currentMap[item].image}
                alt={item}/>
            </div>
        ))}
      </div>
    );
  }
}

export default App;
