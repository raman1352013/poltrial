import { Component, OnInit, ViewChild, ViewEncapsulation, Renderer2, ElementRef } from '@angular/core';
// import { QrScannerComponent } from 'angular2-qrscanner';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  // @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;
  @ViewChild("img") img: ElementRef;
  log = [];
  showQRCode = true;
  qrResultString: string;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // const _Qr: any = this.qrScannerComponent;
    // this.startScanning(_Qr);
    // _Qr.capturedQr
    //   .subscribe((result) => {
    //     this.log.unshift(result);
    //     this.img.nativeElement.setAttribute('src', _Qr.qrCanvas.nativeElement.toDataURL(_Qr.stream));
    //     setTimeout(() => { this.img.nativeElement.src = ''; }, 1000);
    //   });
  }

  // startScanning(_Qr: any) {
  //   _Qr.foundCameras
  //     .subscribe((devices) => {
  //       const videoDevices: MediaDeviceInfo[] = [];
  //       for (const device of devices) {
  //         if (device.kind.toString() === 'videoinput') {
  //           videoDevices.push(device);
  //         }
  //       }

  //       if (videoDevices.length > 0) {
  //         this.log.unshift(videoDevices);
  //         const constraints = {
  //           audio: false,
  //           video: {
  //             facingMode: 'environment',
  //             width: { ideal: 480 },
  //             height: { ideal: 360 }
  //           }
  //         }

  //         if (!_Qr.videoElement) {
  //           _Qr.videoElement = this.renderer.createElement('video');
  //           _Qr.videoElement.setAttribute('muted', 'true');
  //           _Qr.videoElement.setAttribute('autoplay', 'true');
  //           _Qr.videoElement.setAttribute('playsinline', 'true');
  //           // _Qr.videoWrapper.nativeElement.setAttribute('class', 'mirrored');
  //           this.renderer.appendChild(_Qr.videoWrapper.nativeElement, _Qr.videoElement);
  //         }

  //         navigator.mediaDevices.getUserMedia(constraints)
  //           .then(stream => {
  //             _Qr.setStream(stream);
  //           });
  //       }
  //     });
  // }

  // callback(event) {
  //   alert('Hi SID' + JSON.stringify(event))
  // }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

}
