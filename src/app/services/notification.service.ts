import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /*
   * Author: Ugyen Penjor
   * Designation: Software Engineer
   * NGN Technologies Pvt Ltd @ 2020
   */

  constructor() { }

  public tokenNumberErrorNotification() {
    var message = "Invalid token number. Please try again!";
    return message;
  }

  public tokenDetailsPullErrorNotification() {
    var message = "Token details cannot be pulled. Please try again!";
    return message;
  }

  public incorrectCidNotification(){
    var message = "Invalid CID Number. Please try again!";
    return message;
  }

  public incorrectLearnerLicenseNoNotification(){
    var message = "Invalid Learner License Number. Please try again!";
    return message;
  }

  public learnerLicenseNoPullErrorNotification(){
    var message = "Learner License details could not be pulled . Please try again!";
    return message;
  }

  public incorrectDrivingLicenseNoNotification(){
    var message = "Invalid Driving License Number. Please try again!";
    return message;
  }

  public drivingLicenseNoPullErrorNotification(){
    var message = "Driving License details could not be pulled . Please try again!";
    return message;
  }

  public incorrectVehicleNoNotification(){
    var message = "Invalid Vehicle Number. Please try again!";
    return message;
  }

  public vehicleNoPullErrorNotification(){
    var message = "Vehicle details could not be pulled . Please try again!";
    return message;
  }

  public invalid(){
    var message = "Vehicle details could not be pulled . Please try again!";
    return message;
  }
}
