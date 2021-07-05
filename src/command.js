const { readdirSync } = require('fs');

module.exports = (client) => {
  readdirSync(__dirname + '/commands/').forEach(dir => {
    const commands = readdirSync(__dirname + `/commands/${dir}/`).filter(file => file.endsWith('.js'));

    for (let file of commands) {
      let pull = require(__dirname + `/commands/${dir}/${file}`);

      if (pull.conf.name) {
        client.commands.set(pull.conf.name, pull);
      }

      if (pull.conf.aliases && Array.isArray(pull.conf.aliases)) pull.conf.aliases.forEach(alias => client.aliases.set(alias, pull.conf.name));
    }
  });
}