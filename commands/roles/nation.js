const { Command } = require('discord.js-commando');

module.exports = class SetNationCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'nation',
			aliases: ['нация', 'сменить-нацию', 'указать-нацию'],
			group: 'roles',
			memberName: 'nation',
			description: 'Меняет нацию.',
			args: [
				{
					key: 'nation',
					prompt: 'Какую нацию выбрать?',
					type: 'string',
				},
			],
		});
	}

	run(message, { nation }) {
		const nations = ['Империя', 'Королевство', 'Союз'];
		let member = message.member;
		let currentRolesCollection = member.roles.cache;
		let lastNation = null;

		if(nations.indexOf(nation) === -1) {
			return message.say(`${member}, такой нации не существует`)
		}

		currentRolesCollection.each(function (role) {
			if(nations.indexOf(role.name) >= 0) {
				lastNation = role.name;
			}
		});

		if(lastNation === nation) {
			return message.say(`${member}, вы уже состоите в этой нации`)
		}

		nations.forEach((item) => {
			let role = message.guild.roles.cache.find(role => role.name === item);
			if(item === nation) {
				member.roles.add(role)
			} else {
				member.roles.remove(role)
			}
		});

		if(lastNation === 'Империя') {
			message.say(`Прощай, Империя! ${member} уходит в ${nation}`)
		}

		if(lastNation === 'Королевство') {
			return message.say(`Король грустит. Из его королевства сбежал ${member}. Привет, ${nation}`)
		}

		if(lastNation === 'Союз') {
			return	message.say(`${member}, голубой цвет вам не к лицу. Привет, ${nation}`)
		}

		if(!lastNation) {
			return message.say(`Привет, ${nation}. ${member} теперь с вами`)
		}
	}
};
