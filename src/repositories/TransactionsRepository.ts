import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0, outcome = 0, total = 0;
    this.transactions.forEach(transaction => {
      if(transaction.type === "income"){
        income += transaction.value;
      }else{
        outcome += transaction.value;
      }
    })
    total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transactionCreated = new Transaction({ title, value, type });
    const balance = this.getBalance();
    if(transactionCreated.type === "outcome" 
       && transactionCreated.value > balance.total){
        throw new Error("Outcome greater than income!");
    }
    this.transactions.push(transactionCreated);
    return transactionCreated;
  }
}

export default TransactionsRepository;
