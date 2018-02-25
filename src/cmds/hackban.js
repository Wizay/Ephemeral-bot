module.exports = {
	task(msg, prefix, Discord, ids, helpCmd) {

		if (msg.content.includes(prefix + "hackban")) {
			var args = msg.content.split(" ");
			if (args[1] && msg.member.hasPermission(8)) {
				ids.ids += args[1];
				msg.channel.send({embed:
					new Discord.RichEmbed()
						.setDescription(`\`${args[1]}\` was added to HackBan system.`)
						.setColor(0x229e8f)
				});
			} else {
				helpCmd("hackban", msg);
			}
		}

	}
}