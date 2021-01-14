const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;

const client = new CommandoClient({
	commandPrefix: prefix,
	owner: '501479798036758549',
	invite: 'https://discord.gg/YRtWaZRyDF',
});

client.registry
		.registerDefaultTypes()
		.registerGroups([
			['general', 'Основные команды'],
			['roles', 'Команды ролей'],
		])
		.registerDefaultGroups()
		.registerDefaultCommands()
		.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('Pandora Saga');
});


client.on('error', console.error);
client.login(process.env.BOT_TOKEN);

