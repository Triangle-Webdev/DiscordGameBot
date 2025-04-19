import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import { token } from '../config';
import { Ping } from './commands/ping';
import { RegisterGame } from './commands/registerGame';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands: Collection<unknown, any> = new Collection()

commands.set(Ping.data.name, Ping);
commands.set(RegisterGame.data.name, RegisterGame);

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error("Command not found")
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "", flags: MessageFlags.Ephemeral })
    } else {
      await interaction.reply({ content: "There was an error", flags: MessageFlags.Ephemeral })
    }
  }
});

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
