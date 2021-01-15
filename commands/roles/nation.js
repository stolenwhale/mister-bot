const {Command} = require('discord.js-commando');

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

	run(message, {nation}) {
		const nations = ['Империя', 'Королевство', 'Союз'];
		let member = message.member;
		let currentRolesCollection = member.roles.cache;
		let lastNation = null;

		if (nations.indexOf(nation) === -1) {
			return message.say(`${member}, такой нации не существует`)
		}

		currentRolesCollection.each(function (role) {
			if (nations.indexOf(role.name) >= 0) {
				lastNation = role.name;
			}
		});

		if (lastNation === nation) {
			return message.say(`${member}, вы уже состоите в этой нации`)
		}

		nations.forEach((item) => {
			let role = message.guild.roles.cache.find(role => role.name === item);
			if (item === nation) {
				member.roles.add(role)
			} else {
				member.roles.remove(role)
			}
		});

		const nationsDecl = {
			'Империя': {
				from: 'Империи',
				to: 'Империю',
				where: 'Империи',
			},
			'Королевство': {
				from: 'Королевства',
				to: 'Королевство',
				where: 'Королевстве',
			},
			'Союз': {
				from: 'Союза',
				to: 'Союз',
				where: 'Союзе',
			}
		};

		const phrasesLastNation = [
			`Прощай, ${lastNation}! ${member} уходит в ${nationsDecl[nation].to}`,
			`${member} уходит в ${nationsDecl[nation].to}. Обратно 50 рублей на свиток надо.`,
			`${member} ушел в ${nationsDecl[nation].to}. Если что твина оставил в ${nationsDecl[lastNation].where}.`,
			`Собаки лают, караван идет. А ${member} идет в ${nationsDecl[nation].to}.`,
			`Расставашки всегда печалька. ${member} уходит из ${nationsDecl[lastNation].from}`,
			`${member} сменил знамена`
		];

		const phrases = [
			`${member} идет в ${nationsDecl[nation].to}`,
			`${member} ушел в ${nationsDecl[nation].to}.`,
			`Собаки лают, караван идет. А ${member} идет в ${nationsDecl[nation].to}.`,
		];

		let phrase = '';

		if (lastNation) {
			phrase = phrasesLastNation[Math.floor(Math.random() * items.length)];
		} else {
			phrase = phrases[Math.floor(Math.random() * items.length)];
		}
		return message.say(phrase)
	}
};
