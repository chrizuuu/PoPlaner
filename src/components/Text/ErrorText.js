import React from "react";
import {Text} from 'react-native';
import sharedStyles from "../../styles/shared";

const ErrorText = ({errorValue}) => {
    return (
        <Text style={sharedStyles.errorText}>
            {errorValue}
        </Text>
    )
}

export default ErrorText;