const Telegram = require('telegram-node-bot')
const config = require('../../etc/config');
const striptags = require('striptags');


async function sendTelegramNotification(feedData) {
	const tg = new Telegram.Telegram(config.notifications.telegram.accessToken, {
	    webAdmin: {
		port: 1234,
		host: 'localhost'
	    }
	});
	tg.api.sendMessage(config.notifications.telegram.chatId, striptags(feedData.title));
	tg.api.sendMessage(config.notifications.telegram.chatId, striptags(feedData.description));
}

module.exports = {
  sendTelegramNotification,
};
