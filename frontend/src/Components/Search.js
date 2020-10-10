import React from "react";

//This is the search function that works with the list.js to fetch data from the itunes api using this form//
const Search = props => (
	<div class="MainForm">

	
	<form onSubmit={props.fetchSong}>
		
		<div class="FormSelect">
	<select name="entity" onSelect={props.Change} id="type">
        <option value="movie">movie</option>
        <option value="podcast">podcast</option>
        <option value="song">song</option>
        <option value="musicVideo">musicVideo</option>
        <option value="audiobook">audiobook</option>
        <option value="shortFilm">shortFilm</option>
        <option value="tvShow">TVshow</option>
        <option value="software">software</option>
        <option value="ebook">ebook</option>
     </select>
	 </div>
	 <div class="FormInput">
		<input type="text" name="musicitem" placeholder="Search..."/>
		</div>
	 <div class="FormBtn">
		<button id="BTN" onClick={props.resetList}>Search</button>
		</div>
	</form>
	</div>
);

export default Search;