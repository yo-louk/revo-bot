const Discord = require('discord.js');
const { guild } = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(guildMember, client) {
		let welcomeMessage = null;
		if (guildMember.guild.id !== guild.id) return;
		if (guildMember.user.bot) return;

		let welcomeEmbed = new Discord.MessageEmbed()
			.setAuthor(guildMember.displayName, guildMember.user.displayAvatarURL())
			.setColor(guild.color);
		welcomeEmbed = Object.assign(welcomeEmbed, guild.welcomeEmbed);
		welcomeMessage = await client.channels.cache.get(guild.mainChannelID).send({ content: `||${guildMember.toString()}||`, embeds: [welcomeEmbed] });

		const createdAt = guildMember.user.createdTimestamp;
		const joinEmbed = new Discord.MessageEmbed()
			.setAuthor(guildMember.user.tag, guildMember.user.displayAvatarURL(), welcomeMessage.url)
			.setDescription(`${guildMember.user.toString()} joined \n**Created:** <t:${createdAt}:d>\n**ID:** ${guildMember.user.id}`)
			.setColor('GREEN');
		client.channels.cache.get(guild.inviteChannelID).send({ embeds: [joinEmbed] });
	},
};