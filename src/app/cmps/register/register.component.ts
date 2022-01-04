import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() signup = new EventEmitter();

  isCameraVisible: boolean = true;
  isProcessing: boolean = false;
  anonymousImg: string = '../../assets/imgs/anonymous.png';
  user = {
    name: '',
    password: '',
    imgData: '',
  };
  constructor() {}

  ngOnInit(): void {}

  get imgData() {
    return this.user.imgData || this.anonymousImg;
    return this.user.imgData;
  }
  get isValid() {
    // console.log(this.user);

    return this.user.name && this.user.password;
  }

  showCamera() {
    this.isCameraVisible = true;
  }
  capturePhoto(imgData) {
    this.user.imgData = imgData;
    this.isCameraVisible = false;
  }

  register() {
    if (this.user.name && this.user.password) {
      this.isProcessing = true;
      this.user.imgData = this.user.imgData
        ? this.user.imgData
        : this.anonymousImg;

      setTimeout(() => {
        this.signup.emit(this.user);
      }, 1200);
    }
  }
}
