let userGameList = [];

export const database = {
  getUser: (userId) => userGameList.find(e => e.id === userId),
  saveUser: (userData) => updateGameList(userData)
}

const updateGameList = (updatedUserData) => {
  const index = userGameList.indexOf(e => e.id === updatedUserData.id)
  if (!!index) {
    let updatedList = userGameList.filter(e => e.id !== updatedUserData.id)
    updatedList.push(updatedUserData)
    userGameList = updatedList
  } else {
    userGameList.push(updatedUserData)
  }
}

