const {Command} = require('discord.js-commando');

module.exports = class SetServerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'server',
			aliases: ['сервер', 'сменить-сервер', 'указать-сервер'],
			group: 'roles',
			memberName: 'server',
			description: 'Меняет сервер.',
			args: [
				{
					key: 'server',
					prompt: 'Какую нацию выбрать?',
					type: 'string',
				},
			],
		});
	}

	run(message, {server}) {
		const servers = ['Legacy', 'Remake'];
		let member = message.member;

		if (servers.indexOf(server) === -1) {
			return message.say(`${member}, такого сервера не существует`)
		}

		servers.forEach((item) => {
			let role = message.guild.roles.cache.find(role => role.name === item);
			if (item === server) {
				member.roles.add(role)
			} else {
				member.roles.remove(role)
			}
		});

		return message.say(`${member} исследует мир ${server}`)
	}
};
