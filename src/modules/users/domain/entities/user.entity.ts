export class User {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public password: string,
    public role: 'admin' | 'user' = 'user',
  ) {}

  static create(name: string, email: string, password: string) {
    return new User(null, name, email, password, 'user');
  }
}
