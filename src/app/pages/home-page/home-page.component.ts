import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Move, User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  user: User;
  bitcoin;
  moves: Move[];
  title: string;
  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUser().toPromise();
    const bitcoin = await this.bitcoinService
      .getRate(this.user.coins)
      .toPromise();
    this.bitcoin = bitcoin;
    this.moves = this.user.moves.filter((move, idx) => idx <= 2);
    this.title =
      this.user.moves.length === 1
        ? `Your last ${this.user.moves.length} Move:`
        : this.user.moves.length < 3
        ? `Your last ${this.user.moves.length} Moves:`
        : `Your last 3 Moves:`;
  }

  logOut() {
    this.userService.logOut();
    this.router.navigateByUrl('signup');
  }
}
