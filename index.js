const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, DiscordAPIError} = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const { ActivityType } = require('discord.js');
const { type } = require('node:os');

client.on('ready', () => {
    client.user.setActivity(`${client.guilds.cache.size} Servidores.`, { type: ActivityType.Competing });
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Nenhum comando com o nome ${interaction.commandName} foi encontrado.`);
        return;
    }

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'Houve um erro ao executar este comando.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'Houve um erro ao executar este comando.', ephemeral: true });
		}
	}
});

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[ERRO!] o comando em ${filePath} está faltando uma propriedade derequerimento "data" ou "execute"...`);
    }
}

client.once(Events.ClientReady, c=> {
    console.log(`Pronto! Login por: ${c.user.tag}`)
});


client.login(token);