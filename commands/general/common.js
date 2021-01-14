const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			aliases: ['parrot', 'copy', 'скажи'],
			group: 'general',
			memberName: 'say',
			description: 'Повторяет за вами.',
			args: [
				{
					key: 'text',
					prompt: 'Что мне повторить?',
					type: 'string',
				},
			],
		});
	}

	run(message, { text }) {
		return message.say(text);
	}
};

module.exports = class RandomCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'random',
			aliases: ['подбрось-монетку'],
			group: 'general',
			memberName: 'random',
			description: 'Возвращает рандомное значение - либо да, либо нет.',
		});
	}

	run(message, { text }) {
		message.say('Монета подбрасывается...')

		const random = Math.floor(Math.random() * 4) + 1;

		if (random === 1) {
			return	message.say(message.author + ', :full_moon: Орёл!')
		} else if (random === 2) {
			return message.say( + ', :new_moon: Решка!')
		} else if (random === 3) {
			return message.say(message.author + ', :last_quarter_moon: Монета упала ребром!')
		}
	}
};

module.exports = class RollCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			aliases: ['заролль', 'ролл'],
			group: 'general',
			memberName: 'roll',
			description: 'Возвращает случайное число до 100.',
		});
	}

	run(message) {
		const random = Math.floor(Math.floor(Math.random() * 100));
		message.say(`${message.author}, ${random}`)
	}
};

