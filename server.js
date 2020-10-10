
const express = require('express');
const server = express();
const path = require('path');
const fileHandler = require('fs');
const favourites = require('./favourites');

const helmet = require("helmet");

server.use(helmet());

server.use(express.json());



server.get('/api', (req, res) => res.json(favourites));

const titleFilter = (req) => (favourites) => favourites.title === req.params.title;

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

  app.use(express.static('frontend/build'));

  

	app.get('*', (req, res) => {

		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

	});

}





//This listens on localhost port 3001 //

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {

	console.log(`Server is listening on port ${PORT}`);

});