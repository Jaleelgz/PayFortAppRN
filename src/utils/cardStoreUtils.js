

export const AddCardsToStore = async (cards) => {
  // await SecureStore.setItemAsync("cards", JSON.stringify(cards));
};

export const GetCardsFromStore = async () => {
  const cards = [];

  if (cards) {
    return JSON.parse(cards);
  } else {
    return [];
  }
};
