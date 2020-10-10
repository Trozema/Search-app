import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//This is the Card component that feature option to be deleted off the local API//
class FavouritesCard extends React.Component { 
	constructor(props) {
		super(props);
        this.DeleteSongItem = this.DeleteSongItem.bind(this);
		this.state = {
			MainImage: this.props.Image,
			Title: this.props.Tracks,
			Singer: this.props.Artist
			   
			};	
      }
      DeleteSongItem(event) {
        event.preventDefault();
        const titledata =  this.state.Title
        const data = JSON.stringify({ image:this.state.MainImage, title:this.state.Title, singer: this.state.Singer })
        console.log(titledata)
        
        fetch(`/api/${titledata}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data,
                
            }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.log('Error:', error));
            alert("Item Was removed")
            window.location.reload()  
      }
render(){
	const Picture = this.props.Image
	const SongTitle = this.props.Tracks
	const Singer = this.props.Artist
return(
<div class="cardItem">
	 <Card style={{ width: '18rem' }}>
 <Card.Body>
   <Card.Img src={Picture}></Card.Img>
   <Card.Title>{SongTitle}</Card.Title>
   <Card.Subtitle className="mb-2 text-muted">{Singer}</Card.Subtitle>
   
   <Button onClick={this.DeleteSongItem}>Remove</Button>
 </Card.Body>
</Card>
   </div>
)
	}
}
export default FavouritesCard;