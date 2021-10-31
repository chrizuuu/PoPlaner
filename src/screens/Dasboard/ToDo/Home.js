import React, { useState, useRef, useEffect } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import realm from "../../../Database/Database";
import { useFocusEffect } from "@react-navigation/native";
import TaskItem from "../../../components/components/TaskItem";
import TaskInput from "../../../components/Inputs/TaskInput";
import ToDoSTyles from "./style";
import FooterList from "../../../components/components/FooterList";

const Home = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate("Stack");
    })
  );

  return <View></View>;
};

export default Home;
