import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferFundComponent implements OnInit {
  @Input() currUserName;
  @Output() addMove = new EventEmitter();
  amount: string = '';

  constructor() {}

  ngOnInit(): void {}

  transfer() {
    const move = { contact: this.currUserName, amount: this.amount };
    this.addMove.emit(move);
    this.amount = '';
  }
}
