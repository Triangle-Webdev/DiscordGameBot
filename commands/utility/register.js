const { SlashCommandBuilder } = require('discord.js');
import { database } from '../../database';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registers game for the server')
    .addStringOption(opt => {
      return opt.setName("game")
        .setDescription("The name of the game")
        .setRequired(true)
    }),
  async execute(interaction) {
    const game = interaction.options.getString('game')
    const { id, username } = interaction.member.user
    const currentUserData = database.getUser(id)
    const userData = currentUserData ? currentUserData : {
      id,
      username,
      games: []
    }
    const updatedUserData = addGameToUser(userData, game)
    database.saveUser(updatedUserData)
    console.log(userGameList)
    await interaction.reply('Game Successfully Added!');
  },
};

const addGameToUser = (user, game) => ({
  ...user,
  games: [...user.games, game]
})
