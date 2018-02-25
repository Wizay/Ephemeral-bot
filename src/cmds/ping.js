module.exports = {
	task(bot, msg, prefix, Discord) {

		if (msg.content == prefix + "ping") {
			msg.channel.send({embed:
				new Discord.RichEmbed()
					.setDescription(`**API Ping:** [**${bot.ping}**]()\n**Time response:** [**${Date.now() - msg.createdTimestamp}**]()`)
					.setColor(0x229e8f)
			});
		}

	}
}