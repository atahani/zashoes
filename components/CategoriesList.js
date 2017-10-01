import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import CategoryLabel from './CategoryLabel';

const Container = styled.ScrollView `
  padding: 8px 0px 8px 8px;
`;

const CategoriesList = ({ categories, onPressCategory }) => (
  <Container horizontal showsHorizontalScrollIndicator={false}>
    {Object
      .keys(categories)
      .map((key) => (<CategoryLabel
        title={categories[key].name}
        key={categories[key].cid}
        onPress={() => onPressCategory(key, categories[key].name, categories[key].childKeys.length !== 0)} 
      />))}
  </Container>
);

CategoriesList.protoType = {
  parentCategory: PropTypes.string,
  onPressCategory: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.object),
};

CategoriesList.defaultProps = {
  categories: {},
};

const mapStateToProps = (state, ownProps) => ({
  categories: state.category[ownProps.parentCategory]
    ? state.category[ownProps.parentCategory]
    : {},
});

export default connect(mapStateToProps)(CategoriesList);
