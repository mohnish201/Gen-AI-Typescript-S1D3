interface Transaction {
  type: string;
  amount: number;
  timestamp: Date;
}

class BankAccount {
  private accountNumber: string;
  private accountHolder: string;
  private balance: number;
  private transactions: Transaction[];

  constructor(
    accountNumber: string,
    accountHolder: string,
    initialBalance: number = 0
  ) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
    this.transactions = [];
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      this.transactions.push({
        type: "deposit",
        amount,
        timestamp: new Date(),
      });

      console.log(`Deposited ₹${amount}. New balance: ₹${this.balance}`);
    } else {
      console.log(`Invalid deposit amount. Please deposit a positive amount.`);
    }
  }

  withdraw(amount: number): void {
    if (amount > 0) {
      if (amount <= this.balance) {
        this.balance -= amount;
        this.transactions.push({
          type: "withdraw",
          amount,
          timestamp: new Date(),
        });
        console.log(`Withdraw ₹${amount}. New balance: ₹${this.balance}`);
      } else {
        console.log(`Insufficient funds for withdrawl.`);
      }
    } else {
      console.log(
        "Invalid withdrawal amount. Please withdraw a positive amount."
      );
    }
  }

  getBalance(): number {
    console.log(`Account balance for ${this.accountHolder}: ₹${this.balance}`);
    return this.balance;
  }

  getTransactionHistory(): Transaction[] {
    return this.transactions;
  }
}


//Using;

const myAccount = new BankAccount("12345", 'Mohnish', 1000);
myAccount.deposit(500);
myAccount.withdraw(200);
myAccount.getBalance();

const transactionHistory = myAccount.getTransactionHistory();
console.log('Transaction History: ')
console.log(transactionHistory)
