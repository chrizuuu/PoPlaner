import React, { useState } from 'react';
import {View,Image} from 'react-native';
import sharedStyles from '../../styles/shared';
import FlexLayout from '../../components/Layouts/FlexLayout';
import {HeaderTx,SubHeaderTx} from '../../components/Text/index';
import {AuthInputLabel,AuthInput} from '../../components/Inputs/authInput';
import {LinkButton,SubmitButton} from '../../components/Buttons/index';
import {strings,setI18Config} from '../../translations/translations';
import styles from './style';

  export default class LoginScreen  extends React.Component {
    constructor(props) {
      super(props);
      setI18Config();
    }
     render(){
    return(
      <FlexLayout>
            <HeaderTx>{strings("loginHeader")}</HeaderTx>
              <SubHeaderTx> {strings("loginSubHeader")}</SubHeaderTx>
              <AuthInputLabel style={sharedStyles.marginBottom5}>{strings("authLabelEmail")}</AuthInputLabel>
              <AuthInput 
              type='email'
              autoComplete = 'email'
              style = {styles.input}
              />
             
             <AuthInputLabel style={sharedStyles.marginBottom5}>{strings("authLabelPassword")}</AuthInputLabel>     
              <AuthInput 
              type='password'
              autoComplete = 'password'
              secureTextEntry
              style = {styles.input}
              />
  
              <LinkButton style={styles.resetPwdBT}>
                      {strings("loginResPWD")}
              </LinkButton>
              
              <View style={styles.submitContainer}>
                <SubmitButton style={styles.submit}>
                        {strings("loginSubmit")}
                </SubmitButton>
              </View>
  
              <LinkButton style = {sharedStyles.marginBottom25} onPress={() => this.props.navigation.navigate('Register')}>      
                {strings("loginSignUp")}
              </LinkButton>
                
              <Image source = {require('../../assets/signup.png')}/>
        </FlexLayout>
  );
  }
};

