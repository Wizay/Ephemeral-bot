module.exports = {
	task(Discord, bot, msg, prefix, helpCmd, cmdsData) {

		if (msg.content.includes(prefix + "help")) {
			var args = msg.content.split(" ");
			if (args[1]) helpCmd(args[1].toLowerCase(), msg);
			else {
				var data = "";
				for (var n = 0; n < cmdsData.length; n++) data += `[**${cmdsData[n].syntax}**]()\n`;
				msg.author.send({embed:
					new Discord.RichEmbed()
						.setAuthor("Epheral bot commands", bot.user.avatarURL)
						.setDescription(data)
						.setColor(0x229e8f)
						.setFooter("Use '" + prefix + "help [cmd-name]' to show you information about the command")
				}).then(message => {
					msg.channel.send({embed:
						new Discord.RichEmbed()
							.setDescription(`<@${msg.author.id}> sent to your PM!`)
							.setColor(0x229e8f)
					});
				});
			}
		}

	}
}