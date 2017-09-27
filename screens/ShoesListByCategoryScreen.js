import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

const TestText = styled.Text ``;

class ShoesListByCategory extends Component {
  render() {
    return (
      <ScrollView>
        <TestText>product list by category goes here</TestText>
      </ScrollView>
    );
  }
}

export default ShoesListByCategory;
