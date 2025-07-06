import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import ExpenseDetails from '../ExpenseDetails'
import TransactionItem from '../TransactionItem'

class ExpenseTracker extends Component {
  state = {
    title: '',
    amount: '',
    type: 'Income',
    balance: 0,
    income: 0,
    expenses: 0,
    stateHistory: [],
    errorMsg:''
  }

onSubmitFunc = event => {
  event.preventDefault()

  try {
    const {title, amount, type, balance} = this.state

    if (title.trim() === '') {
      this.setState({errorMsg: 'Title is required'})
      return
    }

    const parsedAmount = parseInt(amount)

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      this.setState({errorMsg: 'Amount must be a valid positive number'})
      return
    }

    const isFailed = type === 'Expenses' && parsedAmount > balance

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parsedAmount,
      type: isFailed ? 'Failed Transaction' : type,
      failed: isFailed,
    }

    // Only update balance if not failed
    this.setState(prevState => {
      const updatedIncome = !isFailed && type === 'Income'
        ? prevState.income + parsedAmount
        : prevState.income

      const updatedExpenses = !isFailed && type === 'Expenses'
        ? prevState.expenses + parsedAmount
        : prevState.expenses

      const updatedBalance = !isFailed && type === 'Income'
        ? prevState.balance + parsedAmount
        : !isFailed && type === 'Expenses'
        ? prevState.balance - parsedAmount
        : prevState.balance

      return {
        stateHistory: [...prevState.stateHistory, newTransaction],
        income: updatedIncome,
        expenses: updatedExpenses,
        balance: updatedBalance,
        title: '',
        amount: '',
        errorMsg: '',
      }
    })
  } catch (err) {
    console.error('Unexpected error:', err)
    window.alert('Something went wrong. Please try again.')
  }
}



  deleteTransaction = id => {
    this.setState(prevState => {
      const transactionToDelete = prevState.stateHistory.find(
        item => item.id === id
      )

      const {amount, type} = transactionToDelete

      let updatedIncome = prevState.income
      let updatedExpenses = prevState.expenses
      let updatedBalance = prevState.balance

      if (type === 'Income') {
        updatedIncome -= amount
        updatedBalance -= amount
      } else {
        updatedExpenses -= amount
        updatedBalance += amount
      }

      const updatedHistory = prevState.stateHistory.filter(
        item => item.id !== id
      )

      return {
        stateHistory: updatedHistory,
        income: updatedIncome,
        expenses: updatedExpenses,
        balance: updatedBalance,
      }
    })
  }

  updateTitle = event => this.setState({title: event.target.value})
  updateAmount = event => this.setState({amount: event.target.value})
  updateOption = event => this.setState({type: event.target.value})

  render() {
    const {title, amount, balance, income, expenses, stateHistory} = this.state

    return (
      <div className="bg-container">
        <div className="mm-bg">
          <h1 className="name">Expense Tracker</h1>
          <p className="welcome">
            Welcome back to your{' '}
            <span className="color-mm">Expense Tracker</span>
          </p>
        </div>

        <ExpenseDetails balance={balance} income={income} expenses={expenses} />
  <div className='transaction-history'>
        <form onSubmit={this.onSubmitFunc} className="transaction-container">
          <h2 className="form-heading">Add Transaction</h2>
          <label className="input-label" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={this.updateTitle}
            className="input-field"
            placeholder="Enter title"
          />

          <label className="input-label" htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={this.updateAmount}
            className="input-field"
            placeholder="Enter amount"
          />

          <label className="input-label" htmlFor="type">Type</label>
          <select
            id="type"
            value={this.state.type}
            onChange={this.updateOption}
            className="input-field"
          >
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>

          <button type="submit" className="submit-button">Add</button>
        </form>
        <div className="trans-history-container">
          <h4>History</h4>
          <ul className="head-history">
            <li>Title</li>
            <li>Amount</li>
            <li>Type</li>
            <li></li>
          </ul>
          <ul className="transaction-list">
            {stateHistory.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transactionDetails={transaction}
                onDeleteTransaction={this.deleteTransaction}
              />
            ))}
          </ul>
        </div>
        </div>
        
      </div>
    )
  }
}

export default ExpenseTracker
