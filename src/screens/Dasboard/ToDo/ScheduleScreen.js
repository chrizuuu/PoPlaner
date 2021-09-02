import React from 'react';
import { View,Text,StyleSheet, Button, Vibration, TextInput,AsyncStorageStatic} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';


export default class ScheduleScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <FlexLayout>
                <Text>Kalendarz</Text>
            </FlexLayout>
        )
    }
}