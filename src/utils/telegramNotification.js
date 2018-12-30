const https = require('https');

function sendTelegramNotification(feedData) {
	let url = 'https://alert.eosdetroit.io?alert=' + encodeURIComponent("Github Alert: " + feedData.title + " " + feedData.link);
	https.get(url, (resp) => {
	}).on("error", (err) => {
  		console.log("Error: " + err.message);
	});
}


module.exports = {
  sendTelegramNotification,
};

