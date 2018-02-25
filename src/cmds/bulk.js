module.exports = {
	task(msg, prefix, helpCmd) {

		if (msg.content.includes(prefix + "prune")) {
			var args = msg.content.split(" ");
			if (parseInt(args[1]) > 0 && msg.member.hasPermission(8)) {
				if (parseInt(args[1]) > 100) return msg.channel.send("Max value is **100**");
				msg.channel.bulkDelete(parseInt(args[1]));
				msg.channel.send(`<@${msg.author.id}> deleted \`${parseInt(args[1])}\` messages from this guild.`).then(msg => {
					setTimeout(function () {
						msg.delete();
					}, 5000);
				});
			} else {
				helpCmd("prune", msg);
			}
		}

	}
}