import { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  const [transactions, setTransactions] = useState();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: '',
  });

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    setFormData({ ...formData, [event.target.name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    await api.post('/transactions/', formData);
    fetchTransactions();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: '',
    });
  };

  return (
    <div>
      <nav>
        <div>
          <a href="#">Finance app</a>
        </div>
      </nav>

      <div>
        <form onSubmit={handleFormSubmit} action="">
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              onChange={handleInputChange}
              value={formData.amount}
            />
          </div>

          <div>
            <label htmlFor="category">category</label>
            <input
              type="text"
              id="category"
              name="category"
              onChange={handleInputChange}
              value={formData.category}
            />
          </div>

          <div>
            <label htmlFor="description">description</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
            />
          </div>

          <div>
            <label htmlFor="is_income">income?</label>
            <input
              type="checkbox"
              id="income"
              name="is_income"
              onChange={handleInputChange}
              value={formData.is_income}
            />
          </div>

          <div>
            <label htmlFor="date">date</label>
            <input
              type="text"
              id="date"
              name="date"
              onChange={handleInputChange}
              value={formData.date}
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income?</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
