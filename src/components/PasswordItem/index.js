import './index.css'

const profileColorsList = [
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
  '#0ea5e9',
]

const PasswordItem = props => {
  const {userDetails, onDeleteUserDetails, showUserPassword} = props
  const bgColor = profileColorsList[Math.floor(Math.random() * 5)]
  console.log(userDetails)
  const {id, websiteName, userName, password, profile} = userDetails

  const onDelete = () => {
    onDeleteUserDetails(id)
  }

  const renderPassword = () => {
    if (password.length >= 1) {
      return <p className="text">{password}</p>
    }
    return <p className="text">No Passwords</p>
  }

  const renderHidePassword = () => {
    if (password === '') {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="no Passwords"
          className="stars"
        />
      )
    }
    return (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="stars"
      />
    )
  }

  return (
    <li className="user-list-item">
      <div className={`profile ${bgColor}`}>
        <p>{profile}</p>
      </div>
      <div className="text-container">
        <p className="text">{websiteName}</p>
        <p className="text">{userName}</p>

        {showUserPassword ? renderPassword() : renderHidePassword()}
      </div>
      <button className="delete-btn" type="button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
          onClick={onDelete}
          data-testid="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
