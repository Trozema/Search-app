
const express = require('express');
const server = express();
const path = require('path');
const fileHandler = require('fs');
const favourites = require('./favourites');
const itemsList = require('./itemsList')
const fetch = require('node-fetch')

const helmet = require("helmet");
const { response } = require('express');


server.use(helmet());

server.use(express.json());



server.get('/api', (req, res) => res.json(favourites));

server.get('/itunes', (req, res) => res.json(itemsList));

const titleFilter = (req) => (favourites) => favourites.title === req.params.title;


//This is the API fetch call in the backend//

server.get('/itunes/:inputtext/:entities', async (req, res) => {

		const entity = req.params.entities;
		const input = req.params.inputtext;
		console.log(input)
		console.log(entity)
	const api_url = `https://itunes.apple.com/search?term=${input}&entity=${entity}&limit=10`
	const fetch_response = await fetch(api_url)
	 const json = await fetch_response.json()
	 const item = json.results
	 
	 

		fileHandler.writeFile(
			'itemslist.js',
			'const itemslist = ' + '[' + JSON.stringify(item) + ']' + '; module.exports = itemslist ',
			(err) => {
				if (err) throw err;
				res.send('File created!');
			}
		);

		
		
})



server.post('/api', (req, res) => {
	
	const newSong = {
		image: req.body.image,
		title: req.body.title,
		singer: req.body.singer
	};
	console.log(newSong.title);
	if (!newSong.title || !newSong.singer) {
		return res.status(400).json({ msg: 'Please include a title and email' });
	}

	favourites.push(newSong);
	res.json(favourites);

	//I am rewriting the favourites.js file with the newSong items. //

	fileHandler.writeFile(
		'favourites.js',
		'const favourites = ' + JSON.stringify(favourites) + '; module.exports = favourites ',
		(err) => {
			if (err) throw err;
			res.send('File created!');
		}
	);
});

server.delete('/api/:title', (req, res) => {
	const found = favourites.some(titleFilter(req));

	if (found) {
		res.json({
			msg: 'project deleted',
			favourites: favourites.filter((favourites) => !titleFilter(req)(favourites))
		});

		fileHandler.writeFile(
			'favourites.js',
			'const favourites = ' +
				JSON.stringify(favourites.filter((favourites) => !titleFilter(req)(favourites))) +
				'; module.exports = favourites ',
			(err) => {
				if (err) throw err;
				res.send('File created!');
			}
		);
	} else {
		res.status(400).json({ msg: `No project with the title of ${req.params.title}` });
	}
});


if (process.env.NODE_ENV === 'production') {

  server.use(express.static('frontend/build'));

	server.get('*', (req, res) => {

		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

	});

}





//This listens on localhost port 3001 //

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {

	console.log(`Server is listening on port ${PORT}`);

});