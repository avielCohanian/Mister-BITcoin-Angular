import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact: Contact;
  @Output() remove = new EventEmitter();
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {}
  removeContact() {
    this.remove.emit(this.contact._id);
  }
}
