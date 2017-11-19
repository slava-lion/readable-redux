import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import * as API from './utils/api.js'

import { udpateCategoryList } from './actions/categoryAction.js'

class App extends Component {
  state ={
    populated: false,
    categoryTree : {},
    posts : []
  }

  componentDidMount(){
    if(this.state.populated === false) {
      console.error('4');
      this.fetchStartCategories()
    }
  }

  fetchStartCategories() {
    API.getAllCategories().then( (categoryTree) => {
        const tree = {}
        categoryTree.map( category =>
          { tree[category.path] = category.name; }
        )
        this.props.udpateCategoryList({categoryList: tree})
        this.setState(() => ({
          populated : true,
        }))
      }
    )
  }

  render() {

    return (
      <div className="App">
        <div id="wrapper">
          <div id="categories">
            Categories

            <hr/>

            {Object.keys(this.props.categoryTree).map((key) => (
              <div key={key + '_div'} className="category-link-wrapper">
                <Link key={key + '_href'} className="category-link" to={this.props.categoryTree[key]}>{key}</Link>
              </div>
            ))}

          </div>
          <div id="posts">
            Post
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    categoryTree: state.categoryTree
  }
}

function mapDispatchToProps (dispatch) {
  return {
    udpateCategoryList: (data) => dispatch(udpateCategoryList(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
