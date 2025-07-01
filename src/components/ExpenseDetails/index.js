import './index.css'

const GetMoney = props => {
  const {theDetails} = props
  const {displayText, value, className, imgUrl} = theDetails

  return (
    <li className={className}>
      <img className="image" src={imgUrl} alt={displayText} />
      <div className="value-box">
        <p>Your <span>{displayText}</span></p>
        <p>Rs <span>{value}</span></p>
      </div>
    </li>
  )
}

const ExpenseDetails = props => {
  const {balance, income, expenses} = props

  const balanceDetails = {
    displayText: 'Balance',
    value: balance,
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    className: 'balanceClass',
  }

  const incomeDetails = {
    displayText: 'Income',
    value: income,
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    className: 'incomeClass',
  }

  const expensesDetails = {
    displayText: 'Expenses',
    value: expenses,
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    className: 'expensesClass',
  }

  return (
    <ul className="money-details-container">
      <GetMoney theDetails={balanceDetails} />
      <GetMoney theDetails={incomeDetails} />
      <GetMoney theDetails={expensesDetails} />
    </ul>
  )
}

export default ExpenseDetails
