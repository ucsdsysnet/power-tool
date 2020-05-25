//this is connecting our front-end to the Node JS server (using Express)
// the React server and the Node server are talking to each other (call it API)
	// the front-end sends a request to the API to respond with a .png graph

// we collect the 
const express = require('express')
const { execFile } = require('child_process')

const app = express()
const port = process.env.PORT || 9000

app.get('//power', (req, res) => {

	// req represents the incoming requests (from the form)
	// res represents the outgoing requests (to the form)

	// store request params in a variable	
	// to capture the request parameters collected from the form, we can use req.query
	// req.query stores the parameters provided by the form

	// GET /?servers[]=b09-xx&startTime=mm-dd-yy::MM:ss:SS&endTime=mm-dd-yy::MM:ss:SS
	// req.query.startTime, req.query.endTime, req.query.servers are holding the inputdata


	// spawn child process passing in request params and store it in a variable
	
	const child = execFile('/home/cleung/ERSP/scripts/visualization/extract.sh', [
		req.query.startTime, 
		req.query.endTime, 
		req.query.serverOne, 
		req.query.serverTwo,
		req.query.serverThree,
		req.query.serverFour
	], (error, stdout, stderr) => {
		if (error) {
			res.send('error.png')
			throw error;
		}
		res.send(stdout)
	})
})

app.get('//cpu', (req, res) => {

	// req represents the incoming requests (from the form)
	// res represents the outgoing requests (to the form)

	// store request params in a variable	
	// to capture the request parameters collected from the form, we can use req.query
	// req.query stores the parameters provided by the form

	// GET /?servers[]=b09-xx&startTime=mm-dd-yy::MM:ss:SS&endTime=mm-dd-yy::MM:ss:SS
	// req.query.startTime, req.query.endTime, req.query.servers are holding the inputdata


	// spawn child process passing in request params and store it in a variable
	
	const child = execFile('/home/cleung/ERSP/scripts/visualization/cpu_extract.sh', [
		req.query.startTime, 
		req.query.endTime, 
		req.query.serverOne, 
		req.query.serverTwo,
		req.query.serverThree,
		req.query.serverFour
	], (error, stdout, stderr) => {
		if (error) {
			res.send('error.png')
			throw error;
		}
		res.send(stdout)
	})
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

