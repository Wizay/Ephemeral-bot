module.exports = {
	task(msg, prefix, helpCmd) {

		if (msg.content.includes(prefix + "takerole")) {
			var args = msg.content.split(" ");
			if (msg.mentions.members.first() && args[2] && msg.member.hasPermission(8)) {
				var role = msg.content.slice(prefix.length + 13 + msg.mentions.members.first().user.id.length).toLowerCase();
				var roleID = msg.guild.roles.find(x => x.name.toLowerCase() == role);
				msg.mentions.members.first().removeRole(roleID.id).then(r => {
					msg.channel.send({embed:
						new Discord.RichEmbed()
							.setDescription(`<@${msg.author.id}> removed role \`${roleID}\` to <@${msg.mentions.members.first().user.id}>`)
							.setColor(0x229e8f)
					});
				}).catch(err => msg.channel.send("Hm.. i can't remove a role that is above me, so.."));
			} else {
				helpCmd("takerole", msg);
			}
		}

	}
}