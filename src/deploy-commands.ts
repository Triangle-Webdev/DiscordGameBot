import { REST, Routes } from 'discord.js';
import { clientId, guildId, token } from '../config';
import { Ping } from './commands/ping';
import { RegisterGame } from './commands/registerGame';

const commands = [Ping.data.toJSON(), RegisterGame.data.toJSON()]
const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
