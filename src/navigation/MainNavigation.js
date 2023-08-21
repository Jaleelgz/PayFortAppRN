import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../screens/Home";
import Cards from "../screens/Cards";
import AddCard from "../screens/AddCard";
import SuccessPage from "../screens/SuccessPage";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Cards"
        component={Cards}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddCard"
        component={AddCard}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Success"
        component={SuccessPage}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
