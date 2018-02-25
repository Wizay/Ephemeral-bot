module.exports = {
	task(msg, prefix, helpCmd, log) {

		if (msg.content.includes(prefix + "kick")) {
			if (msg.mentions.members.first() && msg.member.hasPermission(8)) {
				msg.guild.members.get(msg.mentions.members.first().user.id).kick().then(r => {
					var props = {
						"author": msg.author,
						"victim": msg.mentions.members.first()
					}
					log.emit("kick", msg, props);
					msg.channel.send(`\`${msg.mentions.members.first().user.tag}\` was kicked from this server by <@${msg.author.id}>`);
				}).catch(err => {msg.channel.send("My superior don't let me do it!"); console.log(err)});
			} else {
				helpCmd("kick", msg);
			}
		}

	}
}