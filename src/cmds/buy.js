module.exports = {
	task(Discord, msg, prefix, helpCmd) {

		if (msg.content == prefix + "buy") {
			msg.channel.send({embed:
				new Discord.RichEmbed()
					.setDescription("Menu is still under construction.")
					.setColor(0x229e8f)
			});
		}

	}
}