export class User {
  constructor(
    public id: string,
    public email: string,
    private TOKEN: string,
    private TOKEN_EXPIRANTION_DATE: Date
  ) {}

  get token() {
    if (
      !this.TOKEN_EXPIRANTION_DATE ||
      this.TOKEN_EXPIRANTION_DATE <= new Date()
    ) {
      return null;
    }

    return this.TOKEN;
  }
}
