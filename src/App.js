import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import './App.css';
import * as API from './utils/api.js'
import Modal from 'react-modal'

import FaPlus from 'react-icons/lib/fa/plus'
import FaSort from 'react-icons/lib/fa/sort'

import { udpateCategoryList } from './actions/categoryAction.js'
import { udpatePostsList, addPost } from './actions/postAction.js'

import DetailedPostPage from './components/detailedPostPage.js'
import PostWithoutComments from './components/postWithoutComments.js'

class App extends Component {
  state ={
    category_populated: false,
    post_populated: false,
    posts : [],
    editOrCreatePostOpen: false,
    postForModal: null,
    sortOrder: 'default'
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
        const tree = []
        categoryTree.forEach( category =>
          { tree.push(category) }
        )
        this.props.udpateCategoryList({categoryList: tree})
        this.setState(() => ({
          category_populated : true
        }))
      }
    )
  }

  fetchStartPosts() {
    API.getAllPosts().then( (posts) => {
        this.props.udpatePostsList({posts: posts})
        this.setState(() => ({
          post_populated : true,
          posts: posts
        }))
      }
    )
  }

  sort = (event) => {
    const val = event.target.value
    this.setState(() => ({
      sortOrder: val
    }))
  }

  createNewPost = (e) => {
    const uuidv4 = require('uuid/v4');

    if (!this.authorInput.value ||
      !this.titleInput.value ||
      !this.postBodyTextarea.value) {
      return
    }

    e.preventDefault()

    let post = {}
    post['id'] = uuidv4()
    post['timestamp'] = Date.now()
    post['title'] = this.titleInput.value
    post['body'] = this.postBodyTextarea.value
    post['author'] = this.authorInput.value
    post['category'] = this.catSelect.value

    console.log(post)
    API.createNewPost(post).then( (newPost) => {
        this.closePostModal()
        console.log(newPost)
        this.props.addPost(newPost)
    })
  }

  openModalPost = (post) => {
    this.setState((post) => ({
      editOrCreatePostOpen: true,
      postForModal: post
    }))
  }
  closePostModal = () => {
    this.setState(() => ({
      editOrCreatePostOpen: false,
      postForModal: null
    }))
  }

  render() {

    // console.log("API test");
    console.error('2');
    console.error(Object.keys(this.props.categoryTree));
    console.error('3');
    console.error((this.state));

    const sortOrderState = this.state.sortOrder
    const { editOrCreatePostOpen } = this.state

    return (
      <div className="App">
        <div>
          <Link key={'home'} to={"/"}>home</Link><br/>
        </div>
        <div id="wrapper">
          <div id="categories">
            Categories

            <hr/>

            {this.props.categoryTree.map((cat) => (
              <div key={cat.path + '_div'} className="category-link-wrapper">
                <Link key={cat.path + '_href'} className="category-link" to={"/cat/" + cat.path}>{cat.name}</Link>
              </div>
            ))}

          </div>
          <Route exact path='/' render={() => (
            <div id="posts">
              Posts <br/>
              <div className="categoryHeader">
                <div className="addNewPostdiv" onClick={() => this.openModalPost()}>
                  <FaPlus size={25} /> create new post
                </div>
                <div className="sortingNav">
                  <FaSort size={25} />
                  <select value={this.state.sortOrder} onChange={(event) => this.sort(event)}>
                    <option value="default" disabled>default...</option>
                    <option value="voteScoreAsc">voteScore asc</option>
                    <option value="voteScoreDesc">voteScore desc</option>
                    <option value="timestampAsc">timestamp asc</option>
                    <option value="timestampDesc">timestamp desc</option>
                  </select>
                </div>
              </div>
              {this.props.posts.sort(function(a, b) {
                                    switch (sortOrderState) {
                                      case 'default' :
                                        return a.timestamp - b.timestamp
                                      case 'voteScoreAsc' :
                                        return a.voteScore - b.voteScore
                                      case 'voteScoreDesc' :
                                        return b.voteScore - a.voteScore
                                      case 'timestampAsc' :
                                        return a.timestamp - b.timestamp
                                      case 'timestampDesc' :
                                        return b.timestamp - a.timestamp
                                      default :
                                        return 0
                                      }
                                    })
                                  .map((post) => (
                <PostWithoutComments key={post.id} post={post} />
              ))}
            </div>
          )}/>
          <Route path='/cat/:path' render={ props => (
            <div id="posts">
              Posts for category {props.match.params.path}<br/>
              <div className="categoryHeader">
                <div className="addNewPostdiv" onClick={() => this.openModalPost()}>
                  <FaPlus size={25} /> create new post
                </div>
                <div className="sortingNav">
                  <FaSort size={25} />
                  <select value={this.state.sortOrder} onChange={(event) => this.sort(event)}>
                    <option value="default" disabled>default...</option>
                    <option value="voteScoreAsc">voteScore asc</option>
                    <option value="voteScoreDesc">voteScore desc</option>
                    <option value="timestampAsc">timestamp asc</option>
                    <option value="timestampDesc">timestamp desc</option>
                  </select>
                </div>
              </div>
              {this.props.posts.filter((post) => (post.category === props.match.params.path))
                               .sort(function(a, b) {
                                  switch (sortOrderState) {
                                    case 'default' :
                                      return a.timestamp - b.timestamp
                                    case 'voteScoreAsc' :
                                      return a.voteScore - b.voteScore
                                    case 'voteScoreDesc' :
                                      return b.voteScore - a.voteScore
                                    case 'timestampAsc' :
                                      return a.timestamp - b.timestamp
                                    case 'timestampDesc' :
                                      return b.timestamp - a.timestamp
                                    default :
                                      return 0
                                    }
                                  })
                                .map((post) => (
                <PostWithoutComments key={post.id} post={post} />
              ))}
            </div>
          )} />
          <Route path='/post/:id' render={ props => (
            <DetailedPostPage {...props} />
          )} />


          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={editOrCreatePostOpen}
            onRequestClose={this.closePostModal}
            contentLabel='Modal'>
            <div>
              <h3 className='subheader'>
                Add new post
              </h3>
              <div className='postForm'>
                <div style={{width: '90%', padding: '10px', margin: '5px', outline: 'none',}}>
                  choose category <select ref={(select) => this.catSelect = select}>
                  {this.props.categoryTree.map((cat) => (
                    <option value={cat.path} key={cat.path}>{cat.name}</option>
                  ))}
                </select>
                </div>
                <input
                  className='author-input'
                  type='text'
                  placeholder='enter your name'
                  ref={(input) => this.authorInput = input}
                />
                <input
                  className='title-input'
                  type='text'
                  placeholder='title of the post'
                  ref={(input) => this.titleInput = input}
                />
                <textarea
                  className='textarea-input'
                  type='text'
                  placeholder='text of the post'
                  ref={(textarea) => this.postBodyTextarea = textarea}
                /><br />
                <button
                  className=''
                  onClick={this.createNewPost}>Save
                </button>
              </div>
            </div>
          </Modal>

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
    addPost: (data) => dispatch(addPost(data)),
    udpatePostsList: (data) => dispatch(udpatePostsList(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App))
