import React from "react"
import { View, Button } from "react-native"

const ChangeTypeButton = ({ types, functionHandle }) => (
    <View>
      {types.map((type) => (
        <Button
          key={type.name}
          onPress={() => functionHandle(type)}
          title={type.name}
         />
      ))}
    </View>
  )

export default ChangeTypeButton
