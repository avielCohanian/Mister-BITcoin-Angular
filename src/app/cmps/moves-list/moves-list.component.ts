import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/user.model';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss'],
})
export class MovesListComponent implements OnInit {
  @Input() moves: Move[];
  @Input() title: string;
  constructor() {}

  ngOnInit(): void {}
}
