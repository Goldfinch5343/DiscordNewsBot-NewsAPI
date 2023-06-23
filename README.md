# DiscordNewsBot-NewsAPI
This is a Discord bot that fetches news articles from a News API and posts them in a specified channel.
The bot uses the `discord.js-light` library for interacting with Discord and `express` library to set up a simple web server.

# Prerequisites
Before running the bot, make sure you have the following installed:
- Node.js: You can download and install Node.js from the official website: https://nodejs.org

# Installation

1. Clone the repository or download the code as a ZIP file and extract it to a directory of your choice.
2. Open a terminal or command prompt and navigate to the project's root directory.
3. Install the required dependencies by running the following command:

**Shell**

```npm install```

# Configuration
Before running the bot, you need to configure the following environment variables:
- `BOT_TOKEN`: Your Discord bot token. You can obtain this token by creating a new bot application in the Discord Developer Portal: https://discord.com/developers/applications
- `CHANNEL_ID`: The ID of the channel where the bot will post the news articles. Make sure the bot has the necessary permissions to send messages in that channel. You can enable Developer Mode in Discord to obtain the channel ID: https://support.discord.com/hc/en-us/articles/206346498
- `NEWS_API_URL`: The URL of the News API you want to fetch news articles from. You need to sign up for a News API account and obtain the API URL. Visit the News API website for more information: https://newsapi.org

# Usage
To start the bot, run the following command in the project's root directory:

**Shell**

```node index.js```

The bot will log in to Discord using the provided bot token and start fetching news articles periodically. By default, it fetches news once per day.

When a news article is fetched, the bot will create an embedded message with the article's title, description, source, and a link to the full article. It will also include a thumbnail image if available. The bot will then send the embedded message in the specified channel.

To customize the bot's behavior or add additional functionality, you can modify the code in the ``index.js`` file.


# License
This project is licensed under the [MIT License](LICENSE.md).
