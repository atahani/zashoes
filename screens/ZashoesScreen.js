import React, { Component } from 'react';
import styled from 'styled-components/native';
import { lighten } from 'polished';
import Colors from '../constants/Colors';

const ScrollView = styled
  .ScrollView
  .attrs({
    // it's required since in scroll view should have height 100%
    contentContainerStyle: {
      height: '100%',
    },
  })`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TouchArea = styled.TouchableHighlight `
  flex:1 ;
  align-self: center;
  width: 100%;
  height: 100%;
`;

const Item = styled.View `
  position: relative;
  display: flex;
  flex: 1;
  align-self: center;
  width: 100%;
  height: 100%; 
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text `
  color: white;
  display: flex;
  font-size: 50px;
  font-weight: bold;
  position: absolute;
  background-color: transparent;
  z-index: 999;
`;

const Overlay = styled.View `
  display: flex;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-color: ${lighten(0.1, Colors.primaryColor1)};
  position: absolute;
`;

const Image = styled.Image `
  flex: 1;
  width: 100%;
`;

class ZashoesScreen extends Component {
  // we don't need header for this screen
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <TouchArea
          onPress={() => navigate('ShoesList', {
            title: 'Women\'s Shoes',
            category: 'womens-shoes',
          })}
        >
          <Item>
            <Title>Women</Title>
            <Image source={require('../assets/images/women.jpg')} />
            <Overlay />
          </Item>
        </TouchArea>
        <TouchArea
          onPress={() => navigate('ShoesList', {
            title: 'Men\'s Shoes',
            category: 'mens-shoes',
          })}
        >
          <Item>
            <Title>Men</Title>
            <Image source={require('../assets/images/men.jpg')} />
            <Overlay />
          </Item>
        </TouchArea>
        <TouchArea
          onPress={() => navigate('ShoesList', {
            title: 'Kids\'s Shoes',
            category: 'childrens-shoes',
          })}
        >
          <Item>
            <Title>Kids</Title>
            <Image source={require('../assets/images/kids.jpg')} />
            <Overlay />
          </Item>
        </TouchArea>
      </ScrollView>
    );
  }
}

export default ZashoesScreen;
