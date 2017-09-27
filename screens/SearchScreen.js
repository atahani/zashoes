import React from 'react';
import styled from 'styled-components/native';

const ScrollView = styled.ScrollView`
  flex:1;
  padding-top: 20px;
`;

const TestText = styled.Text``;

export default class SearchScreen extends React.Component {
  
  render(){
    return (
      <ScrollView>
        <TestText>Search Screen</TestText>
      </ScrollView>
    )
  }
}