import React from 'react';
import Search from "./Search";


//This is the Main components that uses the Itunes API// 
//This data is passed to a state array and passed to the Main Cards component through props//

class List extends React.Component {
  constructor(props) {
		super(props);
		this.AddToMainList = this.AddToMainList.bind(this);
    this.handleChange =this.handleChange.bind(this);
   
		this.state = {
    Song: [],
    value: "",
    item: ""
	  };
    }
    
    handleChange(event){
      
      this.setState({ [event.target.name]:event.target.value })
     
    }

    AddToMainList(){

      
      const entities = this.state.value;
    
      const inputtext = this.state.item;

           fetch(`/itunes/${inputtext}/${entities}`)
           .then(res => console.log(res.json()))
           
           window.location.reload();
           alert("Search Successful")
           window.location.reload();
          
    }


    render() {

      return (
       <div>
      <Search fetch={this.AddToMainList} Change={this.handleChange}  />
      </div>
        )
      } 
    }




     
     
    
    


export default List
  
  
  
  
  

      