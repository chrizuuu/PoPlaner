import React from 'react';
import { View,Text,StyleSheet, Button, Vibration, TextInput,AsyncStorageStatic} from 'react-native';
import FlexLayout from '../../components/Layouts/FlexLayout';
import {strings,setI18Config} from '../../translations/translations'
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import {formatTime} from '../../components/Helpers/helpers';

export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props)
        setI18Config();
        this.state = {
            time: 1500,
        }

    }
    render() {
        const width = 100;
        const height = 100;
        const size = width < height ? width - 32 : height - 16;
        const strokeWidth = 25;
        const radius = (size - strokeWidth) / 2;
        const circunference = radius * 2 * Math.PI;
        return (
            <FlexLayout>
                                <Svg width='100%' height='100%' viewBox="0 0 100 100">
                    <SvgText
                    stroke="purple"
                    fontSize="15"
                    x='50'
                    y='50'
                    textAnchor="middle"
                    >
                    Hey
                    </SvgText>
                    <Circle
                    stroke="#2162cc"
                    fill="none"
                    cx="50"
                    cy="50"
                    r='45'
                    
                    />
                </Svg>
            </FlexLayout>
        )
    }
}