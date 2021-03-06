const rssBraider = require('rss-braider');
const path = require('path');

// Creates a RSS feed from the configuration provided
function createRSSFeed(config) {
  if (config.rss.enabled === true) {
    const AlertHubFeeds = {
      alertHub: {
        feed_name: 'AlertHub',
        default_count: 1,
        no_cdata_fields: [], // Don't wrap these fields in CDATA tags
        plugins: ['addReleaseNameToTitle'],
        meta: {
          title: config.rss.title,
          description: config.rss.description,
          generator: 'AlertHub',
          site_url: config.rss.site_url,
          feed_url: config.rss.feed_url,
        },
        sources: [], // this will be filled below
      },
    };

    config.repositories.releases.forEach((feed) => {
      AlertHubFeeds.alertHub.sources.push({
        name: `r-${feed}`, // this is actually the user/repo string
        count: config.rss.includeFromEachRepository,
        feed_url: `https://github.com/${feed}/releases.atom`,
      });
    });

    config.repositories.tags.forEach((feed) => {
      AlertHubFeeds.alertHub.sources.push({
        name: `t-${feed}`, // this is actually the user/repo string
        count: config.rss.includeFromEachRepository,
        feed_url: `https://github.com/${feed}/tags.atom`,
      });
    });

    config.repositories.commits.forEach((feed) => {
      AlertHubFeeds.alertHub.sources.push({
        name: `c-${feed}`, // this is actually the user/repo string
        count: config.rss.includeFromEachRepository,
        feed_url: `https://github.com/${feed}/commits.atom`,
      });
    });

    config.extras.forEach((feed) => {
      AlertHubFeeds.alertHub.sources.push({
        name: Math.random().toString(26).slice(2), // Well, there's no name, so here goes randomness
        count: config.rss.includeFromEachRepository,
        feed_url: feed,
      });
    });

    const braiderOptions = {
      feeds: AlertHubFeeds,
      indent: '    ',
      date_sort_order: 'desc', // Newest first
      log_level: 'info',
      plugins_directories: [path.join(__dirname, '..', 'plugins', 'rss-braider')],
    };

    const rssClient = rssBraider.createClient(braiderOptions);

    // Override logging level (debug, info, warn, err, off)
    rssClient.logger.level('info');

    // Let's make a promise
    const process = new Promise((resolve, reject) => {
      rssClient.processFeed('alertHub', 'rss', (err, data) => {
        if (err) {
          // console.log(err);
          reject(err);

          return;
        }
        // console.log(data);
        resolve(data);
      });
    });

    return process;
  }

  // If RSS output is disabled, empty string will be returned
  return Promise.resolve('');
}

module.exports = {
  createRSSFeed,
};
