import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const balance = transactionsRepository.getBalance();
    const transactions = transactionsRepository.all();
    return response.json({ transactions, balance })
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type }: Transaction = request.body;

    const transactionService = new CreateTransactionService(transactionsRepository);
    const transactionCreated = transactionService.execute({ title, value, type });

    return response.json(transactionCreated)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
