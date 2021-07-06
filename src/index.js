const Discord = require('discord.js');
const config = require('../config');

const { Client, Collection } = require('discord.js');

const client = new Client({ disableMentions: 'everyone' });

['command'].forEach(handler => {
    require(`./${handler}`)(client);
});

client.on('ready', () => {
    console.log(`\x1b[31m%s\x1b[0m', '[SERVER]', '\x1b[34m[DISCORD]\x1b[0m', 'Connected as ${client.user.tag}.`);
});

client.on('message', async message =>{
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
  
    if (cmd.length === 0) return;
  
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        try {
          if (command.ownerOnly && !config.owners.includes(message.author.id)) return message.channel.send('❌ | This command is restricted to the owners.');
          if (!message.guild && command.guildOnly) return message.channel.send('❌ | You can only use this command in a server!');
    
        } catch (err) {
          message.channel.send(`An error occured while trying to run \`${command.conf.name}\`, if this happens multiple times please notify the developers!`);
          console.log(`An error occured while trying to run \`${command.conf.name}\`!`);
          console.log(err);
        }
      }
});


client.login(config.token);