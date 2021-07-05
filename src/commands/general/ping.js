const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const msg = await message.channel.send('Pong');
    const embed = new Discord.MessageEmbed()
    .setColor('#0077ff')
    .setTitle('Bot Ping')
    .addField('Discord', `\`${client.ws.ping}\` ms`, false)

    const ping = msg.createdTimestamp - message.createdTimestamp;

    embed.addField('Edit', `\`${ping}\` ms`, false);

    await msg.edit(null, embed);
}

module.exports.config = {
  name: 'ping',
  description: 'Check the bot ping',
  category: 'general',
  usage: ' ',
  example: ' ',

  ownerOnly: false,
  guildOnly: false
}
