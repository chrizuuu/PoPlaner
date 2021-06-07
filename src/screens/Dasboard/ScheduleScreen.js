import React from 'react';
import { View,Text,StyleSheet, Button, Vibration, TextInput,AsyncStorageStatic} from 'react-native';
import FlexLayout from '../../components/Layouts/FlexLayout';
import {strings,setI18Config} from '../../translations/translations'

export default class ScheduleScreen extends React.Component {
    constructor(props) {
        super(props)
        setI18Config();
    }

    render() {
        return (
            <FlexLayout>
                <Text>Kalendarz</Text>
            </FlexLayout>
        )
    }
}