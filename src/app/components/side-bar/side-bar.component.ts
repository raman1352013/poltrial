import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Event } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service'
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements AfterViewInit, OnInit {
  userRoles = false;
  enableChest = false;
  enableHeight = false;
  enableRace = false;
  enableHighJump = false;
  enableBroadJump = false;
  enablePst = false;
  enablePet = false;
  enableDriver = false;
  enableRegistration = false;
  enableSp = false;
  enableAdmin = false;
  enableGenAdmitCard = false;
  enablePstPetDetails = false;
  enableApplicationDetails = false;
  enableHome = false;
  enableResult = false;
  enableReport = false;
  enableSportsRegistration = false;
  enableAppeal = false;
  individualResult = false;
  dailySummary = false;
  reportUser = false;
  individualProfileUpdate = false;
  writtenExam = false;
  uploadDocument = false;
  enableRegisterCandidate = false;
  enable16 = false;
  enable17 = false;
  enable18 = false;
  enable19 = false;
  enable20 = false;
  enable14User = false;
  enable21 = false;
  enable22: boolean = false;
  constructor(
    // private event: Event,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.getLocalStorageItem('userType').then((res: any) => {
      if (res) {
        if (res.id == 10) {
          this.enableDriver = true;
          this.dailySummary = true;
        } else if (res.id == 9) {
          this.enableHighJump = true;
          this.dailySummary = true;
        } else if (res.id == 8) {
          this.enableBroadJump = true;
          this.dailySummary = true;
        } else if (res.id == 7) {
          this.enableRace = true;
          this.dailySummary = true;
        } else if (res.id == 6) {
          this.enableChest = true;
          this.dailySummary = true;
        } else if (res.id == 5) {
          this.enableHeight = true;
          this.dailySummary = true;
        } else if (res.id == 4) {
          this.enableRegistration = true;
          this.enableSportsRegistration = true;
          this.dailySummary = true;
        } else if (res.id == 2) {
          this.reportUser = false;
          this.enableSp = true;
          this.enableResult = false;
          this.enableReport = false;
          this.individualResult = false;
          this.dailySummary = false;
          this.individualProfileUpdate = false;
          // this.enableSportsRegistration = true;
        } else if (res.id == 3) {
          this.reportUser = true;
          this.enableAppeal = true;
          this.enableAdmin = true;
          this.enableResult = true;
          this.enableReport = true;
          this.individualResult = true;
          this.enableSportsRegistration = true;
          this.individualProfileUpdate = true;
          this.uploadDocument = true;
          this.enableDriver = true;
          // this.dailySummary = true;
        } else if (res.id == 12) {
          this.enableAppeal = true;
        } else if (res.id == 14) {
          this.reportUser = true;
          this.individualResult = true;
          this.enableResult = true;
          this.enableReport = true;
          this.enable14User = true;

          this.enableApplicationDetails = true;

        } else if(res.id == 15) {
          this.enableRegisterCandidate = true;
        }

        if (this.enableHeight || this.enableChest) {
          this.enablePst = true;
        }
        if (this.enableHighJump || this.enableBroadJump || this.enableRace) {
          this.enablePet = true;
        }
        if (this.enableAdmin == true) {
          this.enableChest = true;
          this.enableHeight = true;
          this.enableRace = true;
          this.enableHighJump = true;
          this.enableBroadJump = true;
          this.enablePst = true;
          this.enablePet = true;
          this.enableRegistration = true;
          this.enablePstPetDetails = true;
          this.enableApplicationDetails = true;
          this.enableHome = true;
          this.enableResult = true;
          this.enableReport = true;
          this.enableSportsRegistration = true;
          this.dailySummary = true;
          this.individualProfileUpdate = true;
          this.uploadDocument = true;
          this.enableDriver = true;
        }

        if (this.enableSp == true) {
          // this.enable21 = true;
          // this,enableApplicationDetails = true;
          this.individualProfileUpdate = true;
          this.enableGenAdmitCard = false;
          this.enablePstPetDetails = false;
          this.enableApplicationDetails = true;
          this.enableHome = true;
          this.dailySummary = false;
          this.writtenExam = true;
        }

        
        this.enable17 = false;
        this.enable18 = false;
        this.enable19 = false;
        

        if(res.id == 17) {
          this.enable17 = true;
        }

        if(res.id == 18) {
          this.enable18 = true;
        }

        if(res.id == 19) {
          this.enable19 = true;
        }

        if(res.id == 20) {
          this.enable20 = true;
        }

        if(res.id == 21) {
          this.enable21 = true;
        }

        if(res.id == 16) {
          this.enable16 = true;
        }

        if(res.id == 22) {
          this.enable22 = true;
        }
        console.log('this.enableAdmin ' , this.enableAdmin)


      } 
    })

  }



  ngAfterViewInit() {
    this.sharedService.getLocalStorageItem('roles').then((resp: any) => {
      if (resp && resp.length > 0) {
        this.userRoles = true;
      }
    });
  }

  changeNavigation() {
    console.log('changeNavigation')
    this.sharedService.setValue(undefined);
  }

}
