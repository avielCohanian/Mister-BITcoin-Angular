import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Move } from 'src/app/models/user.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy {
  contact: Contact;
  subscription: Subscription;
  userSubscription: Subscription;
  moves: Move[];
  loggingUser;
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.params.subscribe(async (params) => {
      const contact = await this.contactService
        .getContactById(params.id)
        .toPromise();
      this.contact = contact;
    });
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.setMoves();
    });
  }

  async setMoves() {
    this.loggingUser = await this.userService.getUser().toPromise();
    this.moves = this.loggingUser.moves.filter(
      (m) => m.to === this.contact.name
    );
  }
  onEdit() {
    this.router.navigateByUrl('/contact/edit/' + this.contact._id);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addMove(move) {
    this.userService.addMove(move);
  }
}
