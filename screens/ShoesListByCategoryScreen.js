import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { filterShoes } from '../actions/shoes';
import { getCategoriesByParent } from '../actions/category';

const TestText = styled.Text ``;

class ShoesListByCategory extends Component {
  componentDidMount() {
    const { type } = this.props.navigation.state.params;
    const { dispatch } = this.props;
    switch (type) {
      case 'women':
        dispatch(filterShoes({
          category: ['womens-shoes'],
        }));
        dispatch(getCategoriesByParent('womens-shoes'));
        break;
      case 'men':
        dispatch(filterShoes({ category: ['mens-shoes'] }));
        dispatch(getCategoriesByParent('mens-shoes'));
        break;
      case 'kids':
        dispatch(filterShoes({ category: ['childrens-shoes'] }));
        dispatch(getCategoriesByParent('childrens-shoes'));
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <ScrollView>
        <TestText>product list by category goes here</TestText>
      </ScrollView>
    );
  }
}

ShoesListByCategory.protoType = {
  dispatch: PropTypes.func,
};

export default connect()(ShoesListByCategory);
