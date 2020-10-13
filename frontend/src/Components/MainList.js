import React from 'react';
import MainCard from './MainCards'

//This is the List of Favourite items that get fetched form the local API//
class MainList extends React.Component {
    constructor(props) {
          super(props);
          this.componentDidMount = this.componentDidMount.bind(this);
          
          this.state = {
        isLoaded: false,
        MainItems: [],
        };
        }
        componentDidMount() {
            fetch("/itunes")
            .then(res => res.json())
            .then(
            (data) => {
            this.setState({
            isLoaded: true,
            MainItems: data
            }); 
          })}

        
      render() {
        const { MainItems, isLoaded } = this.state;
        
        if (!isLoaded) {
            return <div>Loading...</div>;
            } else {  
            return (
                <div>
                  
                
        {MainItems[0].map((items, index) => (
       <MainCard
       key={index}
       Image={items.artworkUrl100} 
       Artist={items.artistName}
       Tracks={items.trackName}
       />))}
      </div>
            )
    }}
}  
  
  
  
       
       
      
      
  
  
  export default MainList