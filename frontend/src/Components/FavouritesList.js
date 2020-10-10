import React from 'react';
import FavouritesCard from './FavouritesCard'

//This is the List of Favourite items that get fetched form the local API//
class FavouritesList extends React.Component {
    constructor(props) {
          super(props);
          this.componentDidMount = this.componentDidMount.bind(this);
          this.state = {
        isLoaded: false,
        FavouriteSongs: []
        };
        }
        componentDidMount() {
            fetch("/api")
            .then(res => res.json())
            .then(
            (result) => {
            this.setState({
            isLoaded: true,
            FavouriteSongs: result
            }); 
          })}
      render() {
        const { FavouriteSongs, isLoaded } = this.state;
        console.log(FavouriteSongs)
        if (!isLoaded) {
            return <div>Loading...</div>;
            } else {
            return (
       <div>
        {FavouriteSongs.map(items => (
        <FavouritesCard
        key = {items.title}
       Image={items.image} 
       Artist={items.singer}
       Tracks={items.title}
       
        />
        ))}
        </div>
        )}}
    }
  
  
  
  
       
       
      
      
  
  
  export default FavouritesList