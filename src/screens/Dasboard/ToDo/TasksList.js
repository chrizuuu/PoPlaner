import React, { useState, useRef } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import realm from "../../../Database/Database";
import { useFocusEffect } from "@react-navigation/native";
import TaskItem from "../../../components/components/TaskItem";
import TaskInput from "../../../components/Inputs/TaskInput";
import ToDoSTyles from "./style";
import FooterList from "../../../components/components/FooterList";

const TasksList = ({
  navigation,
  tasksType,
  priority,
  displayProjectProperty,
}) => {
  const [tasks, setTasks] = useState(tasksType);
  const [taskInputBackdrop, setTaskInputBackdrop] = useState(false);
  const inputTaskRef = useRef(null);

  function onRealmChange() {
    setTasks(tasksType);
  }

  useFocusEffect(
    React.useCallback(() => {
      setTasks(tasksType);
      realm.addListener("change", onRealmChange);
      return () => realm.removeListener("change", onRealmChange);
    }, [navigation])
  );

  const showTaskInput = () => {
    inputTaskRef.current.addFormSetVisible();
  };

  const styles = StyleSheet.create({
    backdropPressable: {
      position: "absolute",
      width: 900,
      height: 900,
      top: 60,
      opacity: 0.5,
    },
  });

  return (
    <>
      <View style={ToDoSTyles.tasksListContainer}>
        <FlatList
          style={{ flex: 1 }}
          keyboardShouldPersistTaps={"handled"}
          ListHeaderComponent={
            <TaskInput
              priority={priority}
              project={null}
              date={null}
              addFormSetVisible={(value) => setTaskInputBackdrop(value)}
              ref={inputTaskRef}
            />
          }
          data={tasks}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => {
            return (
              <TaskItem
                // provideModalVisibleStatus={provideModalVisibleStatus}
                item_id={item._id}
                displayProjectProperty={displayProjectProperty}
              />
            );
          }}
        />
        <FooterList leftIcon="add-outline" leftIconOnPress={showTaskInput} />
      </View>
      {taskInputBackdrop ? (
        <Pressable
          onPress={() => inputTaskRef.current.backdropHandler()}
          style={styles.backdropPressable}
        />
      ) : null}
    </>
  );
};

export default React.memo(TasksList);
