import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import ShoesItem from './ShoesItem';

const ShoesList = styled.FlatList `
  flex: 1;
  padding: 5px;
`;

const ShoesItems = ({ items, onEndReached, navigation }) => {
  // screen sizing
  const { width, height } = Dimensions.get('window');
  // orientation must fixed
  const SCREEN_WIDTH = width < height
    ? width
    : height;
  // orientation must fixed const SCREEN_HEIGHT = width < height ? height : width;
  const isSmallDevice = SCREEN_WIDTH <= 414;
  const numColumns = isSmallDevice
    ? 2
    : 3;
  // item size
  const PRODUCT_ITEM_HEIGHT = 270;
  const PRODUCT_ITEM_OFFSET = 7;
  const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;
  const _renderItem = ({ item }) => (<ShoesItem
    id={item.id}
    brandName={item.brand.name}
    title={item.name}
    width={((SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns) - PRODUCT_ITEM_MARGIN}
    height={PRODUCT_ITEM_HEIGHT}
    margin={PRODUCT_ITEM_OFFSET}
    price={item.units[0].price}
    originalPrice={item.units[0].originalPrice}
    imagePath={item.media.images[0].mediumHdUrl}
    onPress={() => navigation
      .navigate('ShoesItem', {
        shoes: item,        
      })}
  />);
  const _keyExtractor = (item) => item.id;
  const _getItemLayout = (data, index) => {
    const productHeight = PRODUCT_ITEM_HEIGHT + PRODUCT_ITEM_MARGIN;
    return {
      length: productHeight,
      offset: productHeight * index,
      index,
    };
  };
  return (<ShoesList
    numColumns={numColumns}
    keyExtractor={_keyExtractor}
    data={items}
    renderItem={_renderItem}
    getItemLayout={_getItemLayout}
    onEndReachedThreshold={1}
    onEndReached={onEndReached}
    showsVerticalScrollIndicator={false}
  />);
};

ShoesItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onEndReached: PropTypes.func,
  navigation: PropTypes.object,
};

export default ShoesItems;
