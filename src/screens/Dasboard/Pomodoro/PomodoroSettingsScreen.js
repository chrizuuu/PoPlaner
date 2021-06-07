import React from 'react';
import { TouchableOpacity,Text} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {strings,setI18Config} from '../../../translations/translations'
import HeaderBar from '../../../components/Header/HeaderBar';
import {Icon} from 'react-native-elements';

export default class PomodoroSettingsScreen extends React.Component {
    constructor(props) {
        super(props)
        setI18Config();

    }
    render() {
        return (
            <FlexLayout>
                <HeaderBar screenName = 'Pomodoro Timer' leftIcon = 'arrow-back' leftFunc = {() => this.props.navigation.navigate('Pomodoro')}> 
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Pomodoro')}>
                    <Icon name='arrow-back' size={28} />
                </TouchableOpacity>
            </HeaderBar>            
        </FlexLayout>
        )
    }
}