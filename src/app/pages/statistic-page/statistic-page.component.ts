import { Component, OnInit } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
})
export class StatisticPageComponent implements OnInit {
  constructor(private bitcoinService: BitcoinService) {}
  marketPrice;
  confirmedTransactions;

  async ngOnInit(): Promise<void> {
    // this.marketPrice = await this.bitcoinService.getMarketPrice().toPromise();
    // this.confirmedTransactions = await this.bitcoinService
    //   .getConfirmedTransactions()
    //   .toPromise();
  }
}
