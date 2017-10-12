import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

const Container = styled.TouchableOpacity `
  display: flex;
  justify-content: space-between;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  margin: ${props => `${props.margin}px`};
  margin-bottom: ${props => `${props.margin + 14}px`};
  margin-top: ${props => `${props.margin - 4}px`};
`;

const Image = styled.Image `
  width: 100%;
  height: 200px;
`;

const BrandName = styled.Text `
font-size: 13.5px;
font-weight: bold;
`;

const Name = styled.Text `
  font-size: 11px;
`;

const PriceNote = styled.View `
  flex-direction: row;
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

const DisRate = styled.Text`
    position: absolute;
    top: 5px;
    right: 15;
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
    ${Platform.select({ ios: css`line-height: 38px;` })};
`;

const ShoesItem = ({
  className,
  width,
  height,
  margin,
  brandName,
  title,
  price,
  originalPrice,
  imagePath,
  onPress,
}) => {
  const isOnSell = price.value < originalPrice.value;
  const priceNote = () => {
    if (isOnSell) {
      return (
        <PriceNote>
          <OriPrice isOnSell={isOnSell}>{originalPrice.formatted}</OriPrice>
          <DisPrice adjustsFontSizeToFit>{price.formatted}</DisPrice>
        </PriceNote>
      );
    }
    return (
      <PriceNote>
        <OriPrice>{originalPrice.formatted}</OriPrice>
      </PriceNote>
    );
  };
  return (
    <Container className={className} width={width} height={height} margin={margin} onPress={onPress}>
      {isOnSell ? <DisRate>-{Math.round(((originalPrice.value - price.value) / originalPrice.value) * 100)}%</DisRate> : null}
      <Image source={{
        uri: imagePath,
      }} 
      />
      <BrandName>{brandName}</BrandName>
      <Name numberOfLines={2} ellipsizeMode="tail">{title}</Name>
      {priceNote()}
    </Container>
  );
};

ShoesItem.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  id: PropTypes.string,
  brandName: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.object,
  originalPrice: PropTypes.object,
  imagePath: PropTypes.string,
  onPress: PropTypes.func,
};

export default ShoesItem;
