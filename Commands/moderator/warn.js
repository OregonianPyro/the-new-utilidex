const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class Warn extends Command {
	constructor(client) {
		super(client, {
            name: 'warn',
            aliases: ['w'],
            group: 'moderator',
            memberName: 'warn',
            description: 'Issues a warning to a user.',
            format: '<prefix>warn @user reason',
            examples: ['$warn @User#1234 spam'],
            guildOnly: true,
            ownerOnly: false,
            clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
            userPermissions: ['KICK_MEMBERS'],
            args: [{
                key: 'member',
                prompt: 'Mention the user you would like to warn.',
                type: 'member'
            }, {
                key: 'reason',
                prompt: 'Please provide a reason for the warning',
                type: 'string'
            }]
		});
    };
    
    async run(message, { member, reason} ) {
        await message.delete();
        const embed = new RichEmbed()
            .setColor('BLUE')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('User Warned')
            .setDescription(`**${member.user.username}** has been issued a warning by ${message.author.username}`)
            .addField('Reason', reason)
            .setFooter(member.user.username, member.user.displayAvatarURL)
            .setTimestamp()
        message.channel.send(member.user, embed);
    };
};