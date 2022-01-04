import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, observable } from 'rxjs';
import { Move, User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_KEY: string = 'yami';
  constructor(private storageService: StorageService) {}

  //mock the server
  private _userDb: User = {
    name: 'Ochoa Hyde',
    coins: 100,
    password: '',
    moves: [],
    img: '',
  };
  private _user$ = new BehaviorSubject<User>(this._userDb);
  public user$ = this._user$.asObservable();

  getUser() {
    // return of({ ...this._userDb });
    const user = this.storageService.loader(this.USER_KEY);
    return user ? of(JSON.parse(user)) : null;
    // this._user$.next(this._userDb);
  }

  signup({ name, password, imgData }) {
    if (!this.storageService.loader(name)) {
      const user: User = {
        _id: this._makeId(),
        name: name,
        password,
        coins: 100,
        img: imgData,
        moves: [],
      };
      this.storageService.store(this.USER_KEY, user);
    }
    const user = JSON.parse(this.storageService.loader(this.USER_KEY));
    this._user$.next(user);
    return JSON.parse(this.storageService.loader(this.USER_KEY));
  }
  logOut() {
    this.storageService.remove(this.USER_KEY);
  }

  async addMove({ contact, amount }) {
    const user = await this.getUser().toPromise();
    if (user.coins - amount < 0) return;
    user.coins = user.coins - amount;
    const move: Move = {
      userId: user._id,
      to: contact,
      at: Date.now(),
      amount: amount,
    };
    user.moves.unshift(move);
    this.storageService.store(this.USER_KEY, user);
    this._user$.next(user);
    return user;
  }
  private _makeId(length = 5) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
