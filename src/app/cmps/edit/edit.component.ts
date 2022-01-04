import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  currContact: Contact;
  title: string;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async ({ id }) => {
      this.currContact = id
        ? await this.contactService.getContactById(id).toPromise()
        : (this.contactService.getEmptyContact() as Contact);
      this.title = this.currContact._id ? 'Edit Contact' : 'Add Contact';
    });
  }

  async onSubmit(form: NgForm) {
    this.currContact = { ...this.currContact, ...form.value };
    await this.contactService.saveContact(this.currContact).toPromise();
    this.router.navigateByUrl('contact');
    // form.reset();
  }
}
