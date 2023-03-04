const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mostra seu ping atual'),
    async execute(interaction) {
        await interaction.reply('pong!');
    },

   
};