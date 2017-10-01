import React, { Component } from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { filterShoes, clearShoesItems } from '../actions/shoes';
import { getCategoriesByParent } from '../actions/category';
import CategoriesList from '../components/CategoriesList';
import ShoesItems from '../components/ShoesItems';

const Container = styled.View `
  background-color: white;
  flex: 1;
`;

const Header = styled.View `
  height: 56px;
`;

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
    this.onEndReached = this
      .onEndReached
      .bind(this);
  }

  componentDidMount() {
    const { category, shouldGetCategory } = this.props.navigation.state.params;
    const { dispatch } = this.props;
    dispatch(clearShoesItems());
    dispatch(filterShoes({ category: [category] }));
    // get categories if have child or if it's top
    if (shouldGetCategory || category.split('-').length === 2) {
      dispatch(getCategoriesByParent(category));
    }
  }

  onPressCategory(key, title, shouldGetCategory) {
    this
      .props
      .navigation
      .navigate('ShoesList', {
        category: key,
        title,
        shouldGetCategory,
      });
  }

  onEndReached() {
    const { dispatch, articlesParameters, resultAttr } = this.props;
    if (resultAttr.page < resultAttr.totalPages) {
      dispatch(filterShoes(articlesParameters, resultAttr.page + 1));
    }
  }

  render() {
    const { category, shouldGetCategory } = this.props.navigation.state.params;
    const { shoesItems } = this.props;
    const header = () => {
      if (shouldGetCategory || category.split('-').length === 2) {
        return (
          <Header>
            <CategoriesList
              parentCategory={category}
              onPressCategory={this.onPressCategory} 
            />
          </Header>
        );
      }
    };
    return (
      <Container>
        {header()}
        <ShoesItems items={values(shoesItems)} onEndReached={this.onEndReached} />
      </Container>
    );
  }
}

ShoesListByCategory.protoType = {
  shoesItems: PropTypes.object,
  articlesParameters: PropTypes.object,
  resultAttr: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({ shoesItems: state.shoes, articlesParameters: state.app.articles_parameters, resultAttr: state.app.result_attr });

export default connect(mapStateToProps)(ShoesListByCategory);
