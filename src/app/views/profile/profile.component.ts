import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  header = 'Profile'
  profileForm: FormGroup;

  constructor(
    // private userService: UserService
  ) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      status: new FormControl(''),
      roles: new FormControl(''),
    });

    this.myProfile();
  }

  myProfile() {
    // this.userService.myProfile().then((resp: any) => {
    //   if (resp.status == 200) {
    //     if (resp['body']['responseCode'] == 200) {
    //       const response = resp['body']['responseObject'];
    //       this.profileForm.controls['userName'].setValue(response.userName)
    //       this.profileForm.controls['email'].setValue(response.email)
    //       this.profileForm.controls['address'].setValue(response.address)
    //       this.profileForm.controls['status'].setValue(response.status.description)
    //       this.profileForm.controls['roles'].setValue(response.roles[0].name)
    //       console.log('Profile', resp['body']['responseObject'])
    //     }
    //   }
    // })
  }

}
