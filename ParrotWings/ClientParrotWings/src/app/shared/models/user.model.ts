export class User {
  constructor(
    public email: string,
    public password: string,
    public Name: string,
    public BalancePW?: string,
    public Id?: string
  ) {}
}
