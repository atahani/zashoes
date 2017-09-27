import React from 'react';
import styled from 'styled-components/native';

const ScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 20px;
`;

const TestText = styled.Text``;

export default class MyAccountScreen extends React.Component {
  render(){
    return (
      <ScrollView>
          <TestText>SignUp & SingIn Forms / Related to user account</TestText>
      </ScrollView>
    )
  }
}