import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { filterShoes } from '../actions/shoes';
import { getCategoriesByParent } from '../actions/category';
import CategoriesList from '../components/CategoriesList';

const Container = styled.ScrollView `
  flex: 1;
  background-color: white;
`;

const TestText = styled.Text ``;

class ShoesListByCategory extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return ({
      headerTitle: title || '',
    });
  }

  constructor(props) {
    super(props);
    this.onPressCategory = this
      .onPressCategory
      .bind(this);
  }

  componentDidMount() {
    const { category } = this.props.navigation.state.params;
    const { dispatch } = this.props;
    dispatch(filterShoes({ category: [category] }));
    dispatch(getCategoriesByParent(category));
  }

  onPressCategory(key, title) {
    this
      .props
      .navigation
      .navigate('ShoesList', {
        category: key,
        title,
      });
  }

  render() {
    const { category } = this.props.navigation.state.params;
    return (
      <Container>
        <CategoriesList
          parentCategory={category}
          onPressCategory={this.onPressCategory} 
        />
        <TestText>product list by category goes</TestText>
      </Container>
    );
  }
}

ShoesListByCategory.protoType = {
  dispatch: PropTypes.func,
};

export default connect()(ShoesListByCategory);
