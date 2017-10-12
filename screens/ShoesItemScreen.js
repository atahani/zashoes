import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { Platform, Linking } from 'react-native';
import { Button, Text, ActionSheet } from 'native-base';
import _Gallery from 'react-native-image-gallery';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../icon_font_config.json';
import Colors from '../constants/Colors';

const ScrollView = styled.ScrollView `
  flex: 1;
  background-color: ${Colors.white};
  padding-top: 5px;
  padding-bottom: 10px;
`;

const Gallery = styled(_Gallery)`
  height: 240px;
`;

const Content = styled.View `
  padding: 0px 15px;
  margin-top: 5px;
  margin-bottom: 14px;
`;

const BrandName = styled.Text `
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Title = styled.Text `
  font-size: 12px;
  margin-bottom: 10px;
`;

const PriceNote = styled.View `
  flex-direction: row;
  margin-bottom: 15px;
`;

const OriPrice = styled.Text `
font-size: 10px;
${props => (props.isOnSell
    ? 'text-decoration-line: line-through;'
    : 'font-weight: bold;')}
`;

const DisPrice = styled.Text `
  font-size: 10.5px;
  font-weight: bold;
  color: red;
  margin-left: 6px;
`;

const DisRate = styled
  .Text `
  position: absolute;
  top: 8px;
  right: 20px;
  color: red;
  font-size: 11px;
  font-weight: bold;
  border: 1px solid red;
  z-index: 999;
  height: 38px;
  text-align: center;
  text-align-vertical: center;
  width: 38px;
  border-radius: 19px;
  background-color: transparent;
  ${Platform
    .select({
      ios: css `line-height: 38px;` })};
`;

const ChSizeBtn = styled(Button)`
    margin-bottom: 10px;
`;

const ChSizeBtnText = styled(Text)`
    color: ${Colors.tintColor};
`;

const DesHeaderText = styled.Text `
    margin-top: 20px;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 6px;
`;

const DesContent = styled.View `
    padding: 5px 5px;
    margin-bottom: 15px;
`;

const AttrText = styled.Text `
    font-size: 12.5px;
    margin-top: 6px;
`;

const Icon = createIconSetFromFontello(fontelloConfig, 'zashoes-fontello');

class ShoesItemScreen extends React.Component {
  constructor(props) {
    super(props);
    const { shoes } = this.props.navigation.state.params;
    const images = [];
    /**
     * the shoes.media.image model
     * {
     *  type:"",
     *  orderNumber: 1
     *  largeHdUrl:"",
     *  largeUrl: "",
     *  mediumHdUrl: "",
     *  mediumUrl: "",
     *  smallHdUrl: "",
     *  smallUrl: "",
     *  thumbnailHdUrl: ""
     * }
     */
    for (let i = 0; i < shoes.media.images.length; i++) {
      const element = shoes.media.images[i];
      if (element.type === 'NON_MODEL') {
        images.push({
          source: {
            // can change it by network connection speed
            uri: element.mediumUrl,
          },
        });
      }
    }
    const sizes = shoes
      .units
      .map(item => item.size);
    // add cancel option to sizes
    sizes.push('Cancel');
    this.state = {
      images,
      shoes,
      chSizeText: 'Choose Your Size',
      sizes,
      selectedUnitId: undefined,
    };
    this.onChSizeBtnPress = this
      .onChSizeBtnPress
      .bind(this);
  }

  onChSizeBtnPress() {
    const { sizes, shoes } = this.state;
    ActionSheet.show({
      options: sizes,
      cancelButtonIndex: sizes.length - 1,
      title: 'Choose Your Size',
    }, buttonIndex => {
      if (buttonIndex !== sizes.length - 1) {
        const unit = shoes.units[buttonIndex];
        if (unit) {
          this.setState({ selectedUnitId: unit.id, chSizeText: `Size ${unit.size}` });
        }
      }
    });
  }

  render() {
    const {
      attributes,
      brand,
      color,
      name,
      season,
      shopUrl,
      units,
    } = this.state.shoes;
    const { chSizeText, selectedUnitId } = this.state;
    const price = units[0].price;
    const originalPrice = units[0].originalPrice;
    const isOnSell = price.value < originalPrice.value;
    const disRate = isOnSell
      ? Math.round(((originalPrice.value - price.value) / originalPrice.value) * 100)
      : 0;
    const priceNote = () => {
      if (isOnSell) {
        return (
          <PriceNote>
            <OriPrice isOnSell={isOnSell}>{originalPrice.formatted}</OriPrice>
            <DisPrice adjustsFontSizeToFit>{price.formatted}
                  VAT include</DisPrice>
          </PriceNote>
        );
      }
      return (
        <PriceNote>
          <OriPrice>{originalPrice.formatted}
                VAT include</OriPrice>
        </PriceNote>
      );
    };
    return (
      <ScrollView>
        {isOnSell
          ? <DisRate>-{disRate}%</DisRate>
          : null}
        <Gallery images={this.state.images} />
        <Content>
          <BrandName>{brand.name}</BrandName>
          <Title>{name}</Title>
          {priceNote()}
          <ChSizeBtn
            onPress={this.onChSizeBtnPress}
            transparent
            block
            iconLeft
            accessibilityLabel="choose your size"
          >
            <ChSizeBtnText>{chSizeText}</ChSizeBtnText>
          </ChSizeBtn>
          <Button
            color={Colors.tintColor}
            block
            iconLeft
            accessibilityLabel="add shoes to bag"
            disabled={selectedUnitId === undefined}
          >
            <Icon color={Colors.white} size={20} name='shopping-bag' />
            <Text>Add To Bag</Text>
          </Button>
          <DesHeaderText>Description</DesHeaderText>
          <DesContent>
            <AttrText>Color: {color}</AttrText>
            <AttrText>Season: {season}</AttrText>
            {attributes.map((item) => (<AttrText key={item.name}>{item.name}: {item
              .values
              .join(',')}</AttrText>))}
          </DesContent>
          <Button block bordered onPress={() => Linking.openURL(shopUrl)}>
            <Text>Shop from Zalando</Text>
          </Button>
        </Content>
      </ScrollView>
    );
  }
}

ShoesItemScreen.propType = {
  navigation: PropTypes.object,
};

export default ShoesItemScreen;
