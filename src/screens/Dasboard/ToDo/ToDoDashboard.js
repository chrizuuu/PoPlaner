import React from 'react';
import { View,Text,StyleSheet, Button, Vibration, TextInput,AsyncStorageStatic} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {strings,setI18Config} from '../../../translations/translations';

const ToDoForm = (props) => {
    const [todo, addToDo] = useState({
        title: '',
        completed: false,
    })
}