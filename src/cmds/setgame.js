module.exports = {
	task(bot, msg, prefix, helpCmd, Discord, config, fs) {

		if (msg.content.includes(prefix + "setgame")) {
			var args = msg.content.split(" ");
			if (args[1] && msg.member.hasPermission(8)) {
				bot.user.setPresence({game: {name: msg.content.slice(prefix.length + 8)}});
				config.game = msg.content.slice(prefix.length + 8);
				msg.channel.send({embed:
					new Discord.RichEmbed()
						.setDescription(`**My new game is \`${msg.content.slice(prefix.length + 8)}\`**`)
						.setColor(0x229e8f)
				});
				fs.writeFileSync("./config.json", JSON.stringify(config));
			}
		}

	}
}