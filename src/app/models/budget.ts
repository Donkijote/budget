export interface IBudget {
  type: number;
  title: string;
  amount: number;
  date: Date;
}

export class Budget {
  constructor(
    public id: string,
    public userId: string,
    public type: number,
    public title: string,
    public amount: number,
    public date: Date
  ) {}
}
