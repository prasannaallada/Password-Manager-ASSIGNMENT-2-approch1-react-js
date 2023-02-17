import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchInput: '',
    userDetailsList: [],
    isActive: false,
    showImage: true,
    count: 0,
  }

  onEnteredWebsiteName = event => {
    this.setState({website: event.target.value})
  }

  onEnteredUserName = event => {
    this.setState({username: event.target.value})
  }

  onEnteredUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})

    const {userDetailsList, searchInput} = this.state

    const filteredUserDetailsList = userDetailsList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (searchInput === '') {
      return this.setState(
        this.setState(prevState => ({
          userDetailsList: prevState.userDetailsList,
          count: prevState.userDetailsList.length,
        })),
      )
    }
    return this.setState(prevState => ({
      userDetailsList: filteredUserDetailsList,
      count: prevState.userDetailsList.length,
      showImage: filteredUserDetailsList.length === 0,
    }))
  }

  noPasswordShownImage = () => (
    <div className="no-password-shown-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-image"
      />
      <p className="title">No Passwords</p>
    </div>
  )

  onAddUserDetails = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()

    const newUserDetails = {
      id: v4(),
      websiteName: website,
      userName: username,
      password,
      profile: initial,
    }

    this.setState(prevState => ({
      userDetailsList: [...prevState.userDetailsList, newUserDetails],
      website: '',
      username: '',
      password: '',
      showImage: false,
      count: prevState.count + 1,
    }))
  }

  onDeleteUserDetails = id => {
    const {userDetailsList} = this.state

    const filteredUserList = userDetailsList.filter(
      eachUser => eachUser.id !== id,
    )

    this.setState(prevState => ({
      userDetailsList: filteredUserList,
      showImage: prevState.userDetailsList.length === 0,
      count: prevState.userDetailsList.length,
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isActive: true})
    } else {
      this.setState({isActive: false})
    }
  }

  onShowUserDetails = () => {
    const {userDetailsList, isActive} = this.state
    return (
      <ul className="ul-container">
        {userDetailsList.map(eachDetails => (
          <PasswordItem
            key={eachDetails.id}
            userDetails={eachDetails}
            onDeleteUserDetails={this.onDeleteUserDetails}
            showUserPassword={isActive}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      website,
      username,
      password,
      searchInput,
      userDetailsList,
      showImage,
      isActive,
      count,
    } = this.state
    console.log(website, username, password, searchInput, isActive)
    console.log(userDetailsList)

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="top-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-below768px"
          />

          <form className="form-container" onSubmit={this.onAddUserDetails}>
            <h1 className="title">Add New Password</h1>
            <div className="logo-input-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logo"
              />
              <hr className="hr" />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.onEnteredWebsiteName}
                value={website}
              />
            </div>
            <div className="logo-input-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="logo"
              />
              <hr className="hr" />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.onEnteredUserName}
                value={username}
              />
            </div>
            <div className="logo-input-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logo"
              />
              <hr className="hr" />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.onEnteredUserPassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn" data-testid="delete">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-above768px"
          />
        </div>
        <div className="bottom-section">
          <div className="nav-container">
            <div className="count-container">
              <h1 className="title">Your Passwords</h1>
              <p className="count"> {count}</p>
            </div>

            <div>
              <div className="logo-input-element-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                  alt="search"
                  className="logo"
                  data-testid="delete"
                />
                <hr className="hr" />
                <input
                  type="search"
                  className="input-element"
                  placeholder="Search"
                  onChange={this.onSearchInput}
                  data-testid="delete"
                />
              </div>
            </div>
          </div>
          <hr className="hr2" />
          <div className="show-password">
            <input
              type="checkbox"
              className="check-box"
              id="checkbox"
              onChange={this.showPassword}
            />
            <label className="label" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          {showImage && this.noPasswordShownImage()}
          {!showImage && this.onShowUserDetails()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
