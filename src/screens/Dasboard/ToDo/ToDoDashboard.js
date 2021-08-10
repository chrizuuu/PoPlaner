import React, { useState } from 'react';
import { View,Text,StyleSheet, Button, Vibration, TextInput,AsyncStorageStatic,FlatList} from 'react-native';
import realm, {getAllBooks,addBook} from '../../../components/Helpers/Database';

const ToDoDashboard = () => {
    const [data, setData] = useState(getAllBooks());

    return (
        <>

        </>
    );
};

export default ToDoDashboard;