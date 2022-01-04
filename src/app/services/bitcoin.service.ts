import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, observable, map } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getRate(coins) {
    // if (!storageService.load('btc') || storageService.load('dollar') !== coins) {
    const data = this.http
      .get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
      .pipe(map((res) => res));
    // storageService.store('btc', data);
    // storageService.store('dollar', coins);
    // }
    // return storageService.load('btc');
    return data;
  }

  getMarketPrice() {
    // let chartData = storageService.load(marketPriceKEY);

    // if (!chartData.length) {
    const data = this.http
      .get<{ values: [x: number, y: number] }>(
        `https://api.blockchain.info/charts/market-price`,
        {
          params: {
            timespan: '5months',
            format: 'json',
            cors: true,
          },
        }
      )
      .pipe(map((res) => res.values));
    //   chartData = data.values;
    //   storageService.store(marketPriceKEY, chartData);
    //   chartData = JSON.stringify(data.values);
    // }
    // return chartData;
    return data;
  }

  getConfirmedTransactions() {
    // let chartData = storageService.load(tradeVolumeKEY);

    // if (!chartData.length) {
    const data = this.http
      .get<{ values: [x: number, y: number] }>(
        `https://api.blockchain.info/charts/trade-volume`,
        {
          params: {
            timespan: '5months',
            format: 'json',
            cors: true,
          },
        }
      )
      .pipe(map((res) => res.values));

    // chartData = data.values;
    // storageService.store(tradeVolumeKEY, chartData);
    // chartData = JSON.stringify(data.values);
    // }
    return data;
  }
}
