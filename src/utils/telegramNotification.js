const Telegram = require('telegram-node-bot')
const config = require('../../etc/config');

async function sendTelegramNotification(feedData) {
	const tg = new Telegram.Telegram(config.notifications.telegram.accessToken, {
	    workers: 1,
	    webAdmin: {
		port: 1234,
		host: 'localhost'
	    }
	});
	tg.onMaster(() => {
	    tg.api.sendMessage(config.notifications.telegram.chatId, feedData.title);
	});
}


module.exports = {
  sendTelegramNotification,
};

