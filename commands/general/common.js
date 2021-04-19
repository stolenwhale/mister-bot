const { Command } = require('discord.js-commando');

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

module.exports = class ballCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8ball ',
			aliases: ['погадай', 'шар', 'ответь', 'шарик', 'скажи', 'скажи,'],
			group: 'general',
			memberName: '8ball ',
			description: 'Возвращает случайное значение - либо да, либо нет.',
			args: [
				{
					key: 'question',
					prompt: 'Какие вопросы, молодой?',
					type: 'string',
				},
			],
		});
	}

	run(message, {question}) {
		let random = Math.floor(Math.random() * 100);
		const agreeSmiles = [':nerd:', ':face_with_raised_eyebrow:', ':lying_face:', ':smiling_imp:', ':kissing_heart:'];
		const disagreeSmiles = [':fearful:', ':slight_frown:', ':pensive:', ':clown:', ':thinking:'];

		function randomIntFromInterval(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		if(random >= 50) {
			let smile = agreeSmiles[randomIntFromInterval(0, agreeSmiles.length)] ?  agreeSmiles[randomIntFromInterval(0, agreeSmiles.length)] : '';
			return message.say(`${message.author}, ага ${smile}`)
		} else {
			let smile = disagreeSmiles[randomIntFromInterval(0, disagreeSmiles.length)] ?  disagreeSmiles[randomIntFromInterval(0, disagreeSmiles.length)] : '';
			return message.say(`${message.author}, неа ${smile}`)
		}
	}
};

