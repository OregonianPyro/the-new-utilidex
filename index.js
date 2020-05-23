const { Client } = require('discord.js-commando')
const path = require('path')
const Enmap = require('enmap');

const client = new Client({
    commandPrefix: '$',
    owner: '312358298667974656',
    invite: 'https://discord.gg/yARepUw',
    commandEditableDuration: 90,
    unknownCommandResponse: false,
});

client.registry
.registerDefaultTypes()
.registerGroups([
    ['misc', 'Misc commands.'],
    ['moderator', 'Moderation commands.'],
    ['moderator-fun', 'Fun commands for moderators to use.'],
    ['fun', 'fun commands'],
    ['config-admin', 'configuration and administrator commands.'],
    ['custom commands', 'custom commands for your server.'],
    ['tags', 'tag commands.']
])
.registerDefaultGroups()
.registerDefaultCommands()
.registerCommandsIn(path.join(__dirname, 'commands'))

client.db = {
    guild:{
        moderationCases: new Enmap({ name: 'moderationCasesGuild' }),
        customCommands: new Enmap({ name: 'customCommandsGuild' }),
        tags: new Enmap({ name: 'tagsGuild'})
    },
    user:{
        moderationCases: new Enmap({ name: 'moderationCasesUser' })
    },
    client:{
        settings: new Enmap({ name: 'settings' }),
        activeMutes: new Enmap({ name: 'activeMutes' })
    }
}
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}(${client.user.id})`);
});

client.on('error', console.error)

client.on('guildCreate', (guild) => {
   // client.db.client.settings.set(guild.id, require('./functions/defaultSettings.js'));
    client.db.guild.customCommands.set(guild.id, []);
    client.db.guild.tags.set(guild.id, []);
    client.db.guild.moderationCases.set(guild.id, []);
    guild.members.forEach(m => client.db.user.moderationCases.set(m.user.id, []));
});

client.login('')
