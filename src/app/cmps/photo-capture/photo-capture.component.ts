import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'photo-capture',
  templateUrl: './photo-capture.component.html',
  styleUrls: ['./photo-capture.component.scss'],
})
export class PhotoCaptureComponent implements OnInit {
  @Output() onDone = new EventEmitter();

  showVideo: boolean = true;
  pickImage: boolean = false;
  picture: string | ArrayBuffer;
  videoPlayer: any;
  canvasElement;
  EVENTS = {
    ON_DONE: 'done',
    ON_CLEAR: 'clear',
  };
  enableCamera: boolean = true;
  userImgData: string;

  constructor() {}
  @ViewChild('player') player: any;
  @ViewChild('canvas') canvas: any;

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.stopVideoStream();
  }
  ngAfterViewInit() {
    this.videoPlayer = this.player.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.streamUserMediaVideo();
  }
  get imgData() {
    const img = '../../assets/imgs/anonymous.png';
    return this.userImgData || img;
  }
  streamUserMediaVideo() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.pickImage = true;
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (this.videoPlayer.srcObject = stream))
      .catch((err) => {
        this.pickImage = true;
        console.error('could not open the camera', err);
      });
  }

  capture() {
    this.showVideo = false;
    this.canvasElement.width = this.videoPlayer.videoWidth;
    this.canvasElement.height = this.videoPlayer.videoHeight;

    var context = this.canvasElement.getContext('2d');

    context.translate(this.canvasElement.width, 0);
    context.scale(-1, 1);
    context.drawImage(this.player.nativeElement, 0, 0);

    this.stopVideoStream();
    this.picture = this.canvas.nativeElement.toDataURL();
    this.showVideo = false;
  }
  stopVideoStream() {
    if (!(this.player && this.player.srcObject)) return;
    this.player.nativeElement.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });
  }

  upload(ev) {
    var reader = new FileReader();
    reader.onload = (event) => (this.picture = event.target.result);
    reader.readAsDataURL(ev.target.files[0]);
  }
  done() {
    this.onDone.emit(this.picture);
  }
  cancel() {
    this.showVideo = true;
    this.streamUserMediaVideo();
    // this.$emit(EVENTS.ON_CLEAR);
  }
}
