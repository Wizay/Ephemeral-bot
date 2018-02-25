// Libraries
const Discord = require("discord.js");
const _       = require("underscore");
const fs      = require("fs");
const events  = require("events");
const moment  = require("moment");

// Json
const config   = require("./config.json");
const cmdsData = require("./src/data/cmds.json");
const ids      = require("./src/data/ids.json");

// Constructor
const bot = new Discord.Client();
const log = new events();

// Config
const token           = config.token;
const prefix          = config.prefix;

// Help
const helpCmd = function(cmd, msg) {
	var cmdjson = cmdsData[_.findKey(cmdsData, {name: cmd})];
	var icon    = "http://downloadicons.net/sites/default/files/command-prompt-icon-76336.png";
	if (cmdjson == undefined) return msg.channel.send("That command doesn't exist!");
	msg.channel.send({embed:
		new Discord.RichEmbed()
			.setAuthor(`How to use "${prefix + cmd}"`, icon)
			.setDescription(`${cmdjson.info}\n\n[**Syntax:**]() **${cmdjson.syntax}**\n[**Example:**]() **${cmdjson.example}**`)
			.setColor(0x229e8f)
	});
}

// ON ready
bot.on('ready', () => {
	console.log("[LOG] » I'm ready!");
	bot.user.setPresence({game: {name: config.game}});
	var logs = require("./src/log/main.js").task(log, Discord);
});

// ON message
bot.on('message', async (msg) => {
	try {
		// Step-checks
		if (!msg.guild) return;
		if (msg.author.bot) return;
	    if (msg.content[0] !== prefix) return;
	    // Commands
	    var ban        = require("./src/cmds/ban.js").task(msg, prefix, helpCmd, log);
	    var kick       = require("./src/cmds/kick.js").task(msg, prefix, helpCmd, log);
	    var addrole    = require("./src/cmds/addrole.js").task(msg, prefix, helpCmd);
	    var takerole   = require("./src/cmds/takerole.js").task(msg, prefix, helpCmd);
	    var bulk       = require("./src/cmds/bulk.js").task(msg, prefix, helpCmd);
	    var help       = require("./src/cmds/help.js").task(Discord, bot, msg, prefix, helpCmd, cmdsData);
	    var buy        = require("./src/cmds/buy.js").task(Discord, msg, prefix, helpCmd);
	    var mute       = require("./src/cmds/mute.js").task(Discord, msg, prefix, helpCmd, log);
	    var setgame    = require("./src/cmds/setgame.js").task(bot, msg, prefix, helpCmd, Discord, config, fs);
	    var ping       = require("./src/cmds/ping.js").task(bot, msg, prefix, Discord);
	    var hackban    = require("./src/cmds/hackban.js").task(msg, prefix, Discord, ids, helpCmd);
	    var serverinfo = require("./src/cmds/serverinfo.js").task(msg, prefix, moment, Discord);
	    // Eval
	    if (msg.content.includes(prefix + "eval") && msg.author.id == "224625959158939649") {
	    	var args = msg.content.split(" ");
	    	if (args[1] !== prefix + "eval") return;
	        var evalMsg = msg.content.slice(prefix.length + 5);
	        msg.delete();
	        try {
	            msg.channel.sendEmbed(new Discord.RichEmbed()
	                .setAuthor("Eval")
	                .setColor(0x74f442)
	                .addField("Input", "```" + evalMsg + "```", false)
	                .addField("Output", "```" + eval(evalMsg) + "```", false)
	            );
	        } catch (err) {
	            msg.channel.sendEmbed(new Discord.RichEmbed()
	                .setAuthor("Eval")
	                .setColor(0xff1900)
	                .addField("Input", "```" + evalMsg + "```", false)
	                .addField("Output", "```" + err.message + "```", false)
	            );
        	}
      	}
	} catch (err) {
		console.log(err);
	}
});

// Bot for only 1 guild (DE2OR Menu)
bot.on("guildCreate", (guild) => {
	if (guild.id !== "356349627328364544") guild.leave();
});

bot.on("guildMemberAdd", (member) => {
	var roleID = member.guild.roles.find(x => x.name.toLowerCase() == "member");
	member.addRole(roleID.id);
});

// Login
bot.login(token);