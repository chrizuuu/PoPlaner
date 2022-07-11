import React, { useState } from "react"
import { StyleSheet, Pressable } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Icon from "react-native-vector-icons/MaterialIcons"
import { format } from "date-fns"
import { strings } from "../../translations/translations"
import { TextReg } from "../Text/Text"

const DateTimeInput = ({
  value,
  onChange,
  typeValue,
  formatValue,
  displayMode,
  style,
  iconSize,
  displayValue = true,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false)

  const styles = StyleSheet.create({
    wrapper: {
      height: 35,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    text: {
      marginLeft: 5,
    },
  })
  const iconName = typeValue === "date" ? "today" : "access-time"

  return (
    <Pressable
      style={[styles.wrapper, { ...style }]}
      onPress={() => setPickerVisible(true)}
    >
      <Icon name={iconName} size={iconSize ?? 18} color="#484848" />

      {displayValue && (
        <TextReg style={styles.text}>
          {value
            ? format(value, formatValue)
            : strings(typeValue === "date" ? "taskInputDate" : "taskInputTime")}
        </TextReg>
      )}
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode={typeValue}
        onConfirm={date => {
          onChange(date)
          setPickerVisible(false)
        }}
        onCancel={() => setPickerVisible(false)}
        display={displayMode}
      />
    </Pressable>
  )
}

export default DateTimeInput
