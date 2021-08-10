import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet, Button, Vibration, TextInput,AsyncStorageStatic} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {strings,setI18Config} from '../../../translations/translations';

function ToDoForm() {
    const [input,setInput] = useState('')

    return (
        <form>
            <label>
            Imię:
            <input type="text" name="name" />
            </label>
            <input type="submit" value="Wyślij" />
        </form>
    )
}