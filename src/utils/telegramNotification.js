const https = require('https');

function sendTelegramNotification(feedData) {
	let TELEGRAM_KEY = "552780825:AAFGfxVWcACZ5vKrL1NmaTCDU6xpzCKCh0Q";
	let TELEGRAM_CHAT_I D= "-1001401965082";
	let message = encodeURIComponent("Github Alert: " + feedData.title + " " + feedData.link);
	let TELEGRAM_URL = "https://api.telegram.org/bot" + TELEGRAM_KEY + "/sendMessage?chat_id=" + TELEGRAM_CHAT_ID + "&text=" + message;
	https.get(TELEGRAM_URL, (resp) => {
	}).on("error", (err) => {
  		console.log("Error: " + err.message);
	});
}


module.exports = {
  sendTelegramNotification,
};

