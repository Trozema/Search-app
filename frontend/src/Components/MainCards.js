import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//This is the Main Cards component where every card has the option to be added to favourites//
class MainCard extends React.Component { 
	constructor(props) {
		super(props);
		this.AddToFavourites = this.AddToFavourites.bind(this)
		this.state = {
			id: this.props.key,
			MainImage: this.props.Image,
			Title: this.props.Tracks,
			Singer: this.props.Artist 
			};
			
	  }

	
AddToFavourites(event){
	console.log(this.state.Title)
	event.preventDefault();
    const data = JSON.stringify({ image:this.state.MainImage, title:this.state.Title, singer: this.state.Singer })
    console.log(data)
    
    fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data,
            
        }).then(res => res.json())
       
        .then(response => console.log('Success:', JSON.stringify(response)))
        
        alert("New Song hase been added to favourites")
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
   
   <Button onClick={this.AddToFavourites}>Add to Favourites</Button>
 </Card.Body>
</Card>
</div>




)






	}
	

}
export default MainCard;