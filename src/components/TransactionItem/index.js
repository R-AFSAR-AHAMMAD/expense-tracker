import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props
  const {id, title, amount, type, failed} = transactionDetails

  return (
    <li className={`transaction-item ${failed ? 'failed' : ''}`}>
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <img
        className="delete"
        alt="delete"
        src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        onClick={() => onDeleteTransaction(id)}
      />
    </li>
  )
}

export default TransactionItem
