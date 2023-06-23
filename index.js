const express = require('express');
const { Client, Intents, MessageEmbed } = require('discord.js-light');
const fetch = require('@replit/node-fetch');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello Express app!');
});
app.listen(3000, () => {
  console.log('server started');
});

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Event triggered when the bot is ready and connected to Discord
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  // Start fetching and posting news periodically
  setInterval(postNews, 24 * 60 * 60 * 1000); // Fetch news once per day
});

// Function to fetch news from the API and post it in the channel
async function postNews() {
  try {
    // Get the bot token, channel ID, and news API URL from environment variables
    const token = process.env.BOT_TOKEN;
    const channelId = process.env.CHANNEL_ID;
    const newsApiUrl = process.env.NEWS_API_URL;
    const roleIdToPing = 'ROLE_ID'; // Replace 'ROLE_ID' with the actual role ID to ping

    // Fetch news from the API
    const response = await fetch(newsApiUrl);
    const newsData = await response.json();

    // Check if there are any news articles available
    if (newsData.articles && newsData.articles.length > 0) {
      // Select a random news article
      const randomIndex = Math.floor(Math.random() * newsData.articles.length);
      const article = newsData.articles[randomIndex];

      // Create the embedded message
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(article.title)
        .setURL(article.url)
        .setDescription(article.description)
        .setThumbnail(article.image)
        .addField('Source', article.source)
        .setFooter('DOS News');

      // Find the channel where the bot will post the news
      const channel = client.channels.cache.get(channelId);

      // Get the role to ping
      const role = channel.guild.roles.cache.get(roleIdToPing);

      if (role) {
        // Mention the role in the embedded message
        embed.addField('Attention', role.toString());

        // Send the embedded message in the channel
        channel.send(embed);
      } else {
        console.log('Role not found.');
      }
    } else {
      console.log('No news articles found.');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

// Log in to Discord using the bot token
client.login(process.env.BOT_TOKEN);
