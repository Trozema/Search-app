import React from 'react';
import Search from "./Search";
import MainCard from "./MainCards";

//This is the Main components that uses the Itunes API// 
//This data is passed to a state array and passed to the Main Cards component through props//

class MainList extends React.Component {
  constructor(props) {
		super(props);
		this.getSong = this.getSong.bind(this);
    this.reset = this.reset.bind(this);
    this.handleChange =this.handleChange.bind(this);
		this.state = {
	  Song: []
	  };
    }
    
    handleChange(event){
      console.log("hi")
      this.setState({ [event.target.name]:event.target.value })
      console.log(event.target.name)
    }


    getSong = async (e) => {
      
      e.preventDefault();
      const entity = e.target.elements.entity.value
      console.log(entity)
      const input = e.target.elements.musicitem.value;
      const api_call = await fetch(`https://itunes.apple.com/search?term=${input}&entity=${entity}&limit=15`);
      const data = await api_call.json();
      console.log(data)
      
      if (data.cod !== "404") {
        this.setState({
          Song: data,
        });
      }

    }
    reset() {
      this.setState({ Song: [] });
    }

    render() {

      const { Song }  = this.state;
      console.log(Song.results)

      if (Song.results === undefined){
        return (
       <div>
      <Search fetchSong={this.getSong} />
      </div>
        )
      } else {
       
        return (
      <div>
      <Search fetchSong={this.getSong} Change={this.handleChange} resetList={this.reset}/>
      
      {Song.results.map((items, index) => (
       <MainCard
       key={index}
       Image={items.artworkUrl100} 
       Artist={items.artistName}
       Tracks={items.trackName}
       />))}
      </div>

      )
     
      
      
      ;}
    
    }




     }
     
    
    


export default MainList
  
  
  
  
  

      