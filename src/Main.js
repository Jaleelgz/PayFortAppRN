import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import MainNavigation from "./navigation/MainNavigation";
import { useDispatch } from "react-redux";
import { GetCardsFromStore } from "./utils/cardStoreUtils";
import { setCards } from "./store/slices/cardsSlice";

const Main = () => {
  const dispatch = useDispatch();

  const getCards = async () => {
    const cards = await GetCardsFromStore();

    dispatch(setCards(cards));
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <View style={styles.container}>
      <MainNavigation />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
});
