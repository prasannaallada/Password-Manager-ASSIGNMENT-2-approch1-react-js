import './index.css'

const PasswordItem = props => {
  const {userDetails, onDeleteItem, isShowOrHide} = props
  const {
    id,
    initialValue,
    websiteName,
    userName,
    password,
    bgColor,
  } = userDetails

  const onDelete = () => {
    onDeleteItem(id)
  }

  return (
    <li className="item-list">
      <p className={`initial ${bgColor}`}>{initialValue}</p>
      <div className="list-content">
        <p className="website">{websiteName}</p>
        <p className="website">{userName}</p>
        {!isShowOrHide && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            className="stars-image"
            alt="stars"
          />
        )}
        {isShowOrHide && <p className="website">{password}</p>}
      </div>
      <button
        type="button"
        className="del-btn"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="del-image"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
