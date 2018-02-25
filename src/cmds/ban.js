module.exports = {
	task(msg, prefix, helpCmd, log) {

		if (msg.content.includes(prefix + "ban")) {
			if (msg.mentions.members.first() && msg.member.hasPermission(8)) {
				msg.guild.members.get(msg.mentions.members.first().user.id).ban().then(r => {
					var props = {
						"author": msg.author,
						"victim": msg.mentions.members.first()
					}
					log.emit("ban", msg, props);
					msg.channel.send(`\`${msg.mentions.members.first().user.tag}\` was banned from this server by <@${msg.author.id}>`);
				}).catch(err => {msg.channel.send("My superior don't let me do it!"); console.log(err)});
			} else {
				helpCmd("ban", msg);
			}
		}

	}
}