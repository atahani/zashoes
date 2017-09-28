import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { darken } from 'polished';
import Colors from '../constants/Colors';

const TouchArea = styled.TouchableOpacity `
  flex: 1;
  padding: 10px 12px;
  margin-right: 8px;
  background-color: ${Colors.white};
  border: 2px solid ${Colors.grayColor};
  border-radius: 10px;
`;

const Title = styled.Text `
  font-size: 14px;
  font-weight: 700;
  color: ${darken(0.3, Colors.grayColor)};
`;

const CategoryLabel = ({ title, onPress }) => (
  <TouchArea onPress={onPress}>
    <Title>{title}</Title>
  </TouchArea>
);

CategoryLabel.protoType = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export default CategoryLabel;
