
const { Client, Events, GetwayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GetwayIntentBits.guilds]});
client.once(Events.ClientReady, c=> {
    console.log('Pronto! Loguin por: ${c.user.tag}')
});

client.login(token);