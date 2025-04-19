import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { database } from '../database'

export const RegisterGame = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registers game for the server')
    .addStringOption(opt => {
      return opt.setName("game")
        .setDescription("The name of the game")
        .setRequired(true)
    }),
  async execute(interaction: CommandInteraction) {
    const game = interaction.options.get('game')
    const { id, username } = interaction.member!!.user
    const currentUserData = database.getUser(id)
    const userData = currentUserData ? currentUserData : {
      id,
      username,
      games: []
    }
    const updatedUserData = addGameToUser(userData, game)
    database.saveUser(updatedUserData)
    await interaction.reply('Game Successfully Added!');
  },
}

const addGameToUser = (user, game) => ({
  ...user,
  games: [...user.games, game]
})
