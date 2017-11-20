import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import * as API from './utils/api.js'
import { timeConverter } from './utils/helpers.js'

import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaClose from 'react-icons/lib/fa/close'
import FaCommentingO from 'react-icons/lib/fa/commenting-o'
import FaCommenting from 'react-icons/lib/fa/commenting'
import FaEdit from 'react-icons/lib/fa/edit'
import FaPlus from 'react-icons/lib/fa/plus'
import FaSort from 'react-icons/lib/fa/sort'

import { udpateCategoryList } from './actions/categoryAction.js'
import { udpatePostsList } from './actions/postAction.js'

import PostInList from './components/postInList.js'

class App extends Component {
  state ={
    category_populated: false,
    post_populated: false,
    categoryTree : {},
    posts : []
  }

  componentDidMount(){
    if(this.state.category_populated === false) {
      this.fetchStartCategories()
    }
    if(this.state.post_populated === false) {
      this.fetchStartPosts()
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
          category_populated : true,
        }))
      }
    )
  }

  fetchStartPosts() {
    API.getAllPosts().then( (posts) => {
        this.props.udpatePostsList({posts: posts})
      }
    )
  }

  sort = (event) => {
    console.error("sorting");
  }

  render() {

    // console.log("API test");
    console.error('2');
    console.error(Object.keys(this.props.categoryTree));
    // var catTree = this.props.categoryTree;
    console.error('3');
    console.error((this.state));
    // const categoryTree = API.getAllCategories();
    // console.log(categoryTree);
//    API.getAllCategories().then( (categoryTree) => {
//      this.setState({categoryTree})
//    })
    let date = new Date();

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
            Posts <br/>
            <div className="categoryHeader">
              <div className="addNewPostdiv">
                <FaPlus size={25} /> create new post
              </div>
              <div className="sortingNav">
                <FaSort size={25} />
                <select value="default" onChange={(event) => this.sort(event)}>
                  <option value="default" disabled>default...</option>
                  <option value="voteScoreAsc">voteScore asc</option>
                  <option value="voteScoreDesc">voteScore desc</option>
                  <option value="timestampAsc">timestamp asc</option>
                  <option value="timestampDesc">timestamp desc</option>
                </select>
              </div>
            </div>
            {Object.values(this.props.posts).map((post) => (
              <PostInList post={post} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    categoryTree: state.categoryTree,
    posts: state.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    udpateCategoryList: (data) => dispatch(udpateCategoryList(data)),
    udpatePostsList: (data) => dispatch(udpatePostsList(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
