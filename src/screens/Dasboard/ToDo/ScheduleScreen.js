/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native"
import {
  startOfDay,
  endOfDay,
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addWeeks,
  isSameDay,
} from "date-fns"
import { Icon } from "react-native-elements"
import FlexLayout from "../../../components/Layouts/FlexLayout"
import sharedStyles from "../../../styles/shared"
import colors from "../../../styles/colorsLightTheme"
import { strings } from "../../../translations/translations"
import database from "../../../Database/Database"
import TaskItem from "../../../components/components/TaskItem"
import TaskInput from "../../../components/Inputs/TaskInput"

const pl = require("date-fns/locale/pl")

const ScheduleScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState()
  const [days, setDays] = useState()
  const [startWeek, setStartWeek] = useState()
  const [endWeek, setEndWeek] = useState()
  const [currentDay, setCurrentDay] = useState(new Date())
  const [taskInputBackdrop, setTaskInputBackdrop] = useState(false)
  const inputTaskRef = useRef(null)

  const ondatabaseChange = () => {
    setTasksHandler(currentDay)
  }

  useEffect(() => {
    setDaysHandler()
    setTasksHandler(currentDay)
    return () => {
      database.removeAllListeners()
    }
  }, [navigation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.header}>
          {format(currentDay, "EEEE, d LLLL yyyy", { locale: pl })}
        </Text>
      ),
    })
    return () => {
      navigation.setOptions({
        headerTitle: () => null,
      })
    }
  }, [currentDay, navigation])

  useEffect(() => {
    setTasksHandler(currentDay)
    if (currentDay <= startWeek || currentDay >= endWeek) {
      setDaysHandler()
    }
    database.addListener("change", ondatabaseChange)
    return () => database.removeListener("change", ondatabaseChange)
  }, [currentDay])

  const setTasksHandler = (date) => {
    setTasks(
      database
        .objects("Task")
        .filtered(
          "deadlineDate >= $0 && deadlineDate <= $1",
          startOfDay(date),
          endOfDay(date)
        )
    )
  }

  const changeWeek = (amount) => {
    const start = addWeeks(startWeek, amount)
    const end = addWeeks(endWeek, amount)
    if (amount === 1) setCurrentDay(start)
    else setCurrentDay(end)
  }

  const setDaysHandler = () => {
    const start = startOfWeek(currentDay, { locale: pl })
    const end = endOfWeek(currentDay, { locale: pl })

    setStartWeek(start)
    setEndWeek(end)
    setDays(
      eachDayOfInterval({
        start,
        end,
      })
    )
  }

  const showTaskInput = () => {
    inputTaskRef.current.addFormSetVisible()
  }

  const styles = StyleSheet.create({
    header: {
      textAlign: "center",
      fontSize: 16,
      fontFamily: "OpenSansBold",
    },
    footer: {
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      backgroundColor: colors.primeColor,
    },
    calendarMenu: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.primeColor,
      borderBottomColor: colors.secondColor,
      borderBottomWidth: 1,
      borderTopColor: colors.secondColor,
      borderTopWidth: 1,
    },
    calendarListItem: {
      padding: 10,
    },
    todayBtn: {
      fontFamily: "OpenSansBold",
      fontSize: 14,
      padding: 5,
      marginLeft: 5,
      borderRadius: 5,
    },
    backdropPressable: {
      position: "absolute",
      width: 900,
      height: 900,
      top: 60,
      opacity: 0.5,
    },
  })

  return (
    <FlexLayout>
      <FlatList
        keyboardShouldPersistTaps="always"
        ListHeaderComponent={
          <TaskInput
            priority={false}
            project={null}
            date={currentDay}
            addFormSetVisible={(value) => setTaskInputBackdrop(value)}
            ref={inputTaskRef}
          />
        }
        data={tasks}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
            <TaskItem
              // provideModalVisibleStatus={provideModalVisibleStatus}
              item_id={item._id}
              displayProjectProperty
            />
          )}
      />
      {taskInputBackdrop ? (
        <Pressable
          onPress={() => inputTaskRef.current.backdropHandler()}
          style={styles.backdropPressable}
        />
      ) : null}
      <View style={styles.calendarMenu}>
        <Icon
          type="ionico"
          name="arrow-back"
          containerStyle={{ padding: 10 }}
          onPress={() => changeWeek(-1)}
        />
        <FlatList
          horizontal
          keyboardShouldPersistTaps="always"
          data={days}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setCurrentDay(item)}>
                <View
                  style={[
                    styles.calendarListItem,
                    {
                      backgroundColor: isSameDay(item, currentDay)
                        ? "#53D3AF"
                        : colors.primeColor,
                    },
                  ]}
                >
                  <Text style={{ fontFamily: "OpenSansReg", fontSize: 15 }}>
                    {format(item, "d/MM")}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
        />
        <Icon
          type="ionico"
          name="arrow-forward"
          containerStyle={{ padding: 10 }}
          onPress={() => changeWeek(1)}
        />
      </View>
      <View style={[styles.footer, sharedStyles.padding10]}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => setCurrentDay(new Date())}
        >
          <Icon type="ionicon" name="today-outline" />
          <Text style={styles.todayBtn}>{strings("calendarToday")}</Text>
        </TouchableOpacity>
        <Icon
          type="ionicon"
          name="add-outline"
          size={28}
          onPress={showTaskInput}
        />
      </View>
    </FlexLayout>
  )
}

export default ScheduleScreen
