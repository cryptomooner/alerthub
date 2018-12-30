module.exports = {
  interval: 60000, // Feed check interval, in miliseconds
  notifications: {
    telegram: {
      enabled: true
    },
      pushbullet: {
      enabled: false,
      accessToken: 'XXX',
    },
    smtp: {
      enabled: false,
      config: { // Nodemailer configuration
        host: 'smtp.service.com',
        port: 465,
        secure: true,
        auth: {
          user: 'smtp@user.com',
          pass: 'password',
        },
      },
      mailOptions: {
        from: '"AlertHub" <smtp@user.com>', // from field, can be pure e-mail or "Name" <e-mail> format
        to: 'slava@eosdetroit.io', // Your Email, can add more e-mails by commas
        subjectPrefix: 'New GitHub Release', // Subject prefix
      },
    },
  },
  rss: {
    enabled: true,
    port: 3444,
    title: 'AlertHub RSS', // Feed Title
    description: 'My Awesome GitHub Release Aggregator', // Feed Description
    includeFromEachRepository: 10, // How many releases/items will be fetched from each repository
    count: 50, // How many elements will be there in the feed
    site_url: 'https://github.com/cryptomooner/alerthub', // Site url shown on the feed
    feed_url: null, // Fills: <atom:link href="feedurl" rel="self" type="application/rss+xml"/>
  },
  repositories: {
    releases: [
      'eosio/eos', 
      'EOS-Mainnet/eos',
      'Telos-Foundation/telos',
      'worbli/worbli',
      'GolosChain/cyberway',
      'UOSnetwork/uos'
    ],
    tags: [
	'eosio/eos'
    ],
    commits: [
      'eosnewyork/eoslists'
    ],
  },
  extras: [
    // direct rss links from other sources if you want to watch with this tool
  ],
};
