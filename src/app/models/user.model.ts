export interface User {
  _id?: string;
  name: string;
  coins: number;
  password: string;
  moves: Move[];
  img: string;
}
export interface Move {
  userId: string;
  to: string;
  at: number;
  amount: number;
}

// export class User {
//   constructor(
//     public name: string = '',
//     public coins: number = 0,
//     public moves: string[] = ['']
//   ) {}

// setId?() {
//     // Implement your own set Id
//     this._id = 'hkjgbjhb '
// }
// }
