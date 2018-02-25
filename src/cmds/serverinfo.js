module.exports = {
	task(msg, prefix, moment, Discord) {

		if (msg.content == prefix + "serverinfo") {
			var online = 0;
			var roles  = 0;
            var textChannels = 0;
            var voiceChannels = 0;
			msg.guild.members.forEach(function(value) {
                if (value.presence.status == "online" || value.presence.status == "idle" || value.presence.status == "dnd") online++;
            });
			msg.guild.roles.forEach(function () {roles++});
            msg.guild.channels.forEach(function (value) {
                if (value.type == "text") textChannels++;
                if (value.type == "voice") voiceChannels++;
            });
			msg.channel.send({embed:
                new Discord.RichEmbed()
                    .setAuthor("About " + msg.guild.name, msg.guild.iconURL)
                    .setThumbnail(msg.guild.iconURL)
                    .setColor(0x229e8f)
                    .addField(":necktie: Owner", "<@" + msg.guild.ownerID + ">", true)
                    .addField(":wrench: Created At", moment(msg.guild.createdAt).format('ll'), true)
                    .addField(":busts_in_silhouette: Members", online + "/" + msg.guild.memberCount, true)
                    .addField(":map: Server region", msg.guild.region, true)
                    .addField(":hash: Text Channels" , textChannels, true)
                    .addField(":sound: Voice Channels", voiceChannels, true)
                    .addField(":medal: Number of roles", roles, false)
            }); 
		}

	}
}