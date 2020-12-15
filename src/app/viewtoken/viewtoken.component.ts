import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-viewtoken',
  templateUrl: './viewtoken.component.html',
  styleUrls: ['./viewtoken.component.scss']
})
export class ViewtokenComponent implements OnInit {
  cidForm: boolean = false;
  vehicleNoForm: boolean = false;
  drivingLicenseNumberForm: boolean = false;
  learnerLicenseNumberForm: boolean = false;
  viewDetails: boolean = false;
  cidNumber: string;
  cidViewTokenResponse: any;
  token_number: number;
  appointmentTimeFrom: any;
  appointmentTimeTo: any;
  appointmentTime: any;

  constructor(private apiService: ApiServicesService) { }

  ngOnInit() {
  }

  getDetailsBy(searchBy) {
    if (searchBy === "1") {
      this.cidForm = true;
      this.vehicleNoForm = false;
      this.drivingLicenseNumberForm = false;
      this.learnerLicenseNumberForm = false;
    } else if (searchBy === "2") {
      this.cidForm = false;
      this.vehicleNoForm = true;
      this.drivingLicenseNumberForm = false;
      this.learnerLicenseNumberForm = false;
    }
    else if (searchBy === "3") {
      this.cidForm = false;
      this.vehicleNoForm = false;
      this.drivingLicenseNumberForm = true;
      this.learnerLicenseNumberForm = false;
    }
    else if (searchBy === "4") {
      this.cidForm = false;
      this.vehicleNoForm = false;
      this.drivingLicenseNumberForm = false;
      this.learnerLicenseNumberForm = true;
    }
    else { return null; }
  }

  viewTokenByCidNumber() {
    this.apiService.viewTokenByCidNumber(this.cidNumber).subscribe(response => {
      debugger;
      for (var i = 0; i < response.length; i++) {
        if (response[i].token_no === response[i + 1].token_no) {
          this.token_number = response[i].token_no;
          this.appointmentTimeFrom = response[i].appointment_time_from;
          this.appointmentTimeTo = response[i].appointment_time_to;
          this.cidViewTokenResponse = response;
          this.appointmentTime = this.appointmentTimeFrom
          this.viewDetails = true;
          console.log("res", this.cidViewTokenResponse);
          break;
        } else {
          this.viewDetails = false;
        }
      }
    });
  }


}
