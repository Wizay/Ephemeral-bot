module.exports = {
	task(Discord, msg, prefix, helpCmd, log) {

		if (msg.content.includes(prefix + "mute")) {
			if (msg.member.hasPermission(8) && msg.mentions.members.first()) {
				var role = msg.content.slice(prefix.length + 12 + msg.mentions.members.first().user.id.length).toLowerCase();
				var roleID = msg.guild.roles.find(x => x.name.toLowerCase() == "Muted".toLowerCase());
				msg.mentions.members.first().addRole(roleID.id).then(r => {
					var props = {
						"author": msg.author,
						"victim": msg.mentions.members.first()
					}
					log.emit("mute", msg, props);
					msg.channel.send({embed:
						new Discord.RichEmbed()
							.setDescription(`<@${msg.author.id}> muted <@${msg.mentions.members.first().user.id}>`)
							.setColor(0x229e8f)
					});
				}).catch(err => {msg.channel.send("Hm.. that user is above me, i can't do it!"); console.log(err)});
			} else {
				helpCmd("mute", msg)
			}
		}

	}
}