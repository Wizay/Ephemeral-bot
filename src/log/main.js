module.exports = {
	task(log, Discord) {

		log.on("mute", (msg, prop) => {
			msg.guild.channels.find(x => x.id == "384100830061789184").send({embed:
				new Discord.RichEmbed()
					.setDescription(`<@${prop.author.id}> **muted the** <@${prop.victim.id}>`)
					.setColor(0x229e8f)
			});
		});

		log.on("kick", (msg, prop) => {
			msg.guild.channels.find(x => x.id == "384100830061789184").send({embed:
				new Discord.RichEmbed()
					.setDescription(`<@${prop.victim.id}> **was kicked by** <@${prop.author.id}>`)
					.setColor(0x229e8f)
			});
		});

		log.on("ban", (msg, prop) => {
			msg.guild.channels.find(x => x.id == "384100830061789184").send({embed:
				new Discord.RichEmbed()
					.setDescription(`<@${prop.victim.id}> **was banned by** <@${prop.author.id}>`)
					.setColor(0x229e8f)
			});
		});

		log.on("hackban", (member) => {
			member.guild.channels.find(x => x.id == "384100830061789184").send({embed:
				new Discord.RichEmbed()
					.setDescription(`${member.user.tag} **was automatically banned by HackBan system.**`)
					.setColor(0x229e8f)
			});
		});

	}
}