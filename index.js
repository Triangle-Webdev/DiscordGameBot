import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import { token } from './config.js';
import { Ping } from './commands/utility/ping.js';
import { RegisterGame } from './commands/utility/register.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection()

client.commands.set(Ping.data.name, Ping);
client.commands.set(RegisterGame.data.name, RegisterGame);

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  // console.log(interaction)

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error("BOOM!!")
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
