export class Transaction {
    constructor(
      public UserFromId: string,
      public TypeOperation: string,
      public UserToId: string,
      public SumPw: string,
      public TransactionTime: Date,
      public ResultPw?: string,
      public TransactionId?: number
    ) {}
  }