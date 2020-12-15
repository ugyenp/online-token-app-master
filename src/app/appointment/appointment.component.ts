import { Component, OnInit } from '@angular/core';
import { Appointment } from '../model/appointment';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  selected: any;
  cid_or_permit_no: string;
  official_id: number;
  reason: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile_number: string;
  juris_id: number;
  juris_type_id: number;
  personal_details_not_exist: boolean = true;
  personal_details_exist: boolean = false;
  officialAppointmentResponse: any;
  baseLocationReponse: any;
  regionLocationResponse: any;
  appointment_model: Appointment;
  juris_or_juristype_id: string;
  successMsg: string;
  errorMsg: string;
  successMsgCard: boolean = false;
  avaliableResponse:string[] = [];

  constructor(private apiService: ApiServicesService) {
    this.appointment_model = new Appointment();
  }

  ngOnInit() {
    this.getOfficailForAppointment();
    this.getBaseOfficeLocation();
    this.getRegionOfficeLocation();
  }

  getBaseOfficeLocation() {
    this.apiService.getBaseOffice().subscribe(response => {
      this.baseLocationReponse = response;
    });
  }

  getRegionOfficeLocation() {
    this.apiService.getRegionOffice().subscribe(response => {
      this.regionLocationResponse = response;
    });
  }

  getOfficailForAppointment() {
    this.apiService.getOfficalForAppointment().subscribe(response => {
      this.officialAppointmentResponse = response;
    });
  }

  getPersonalDetailsByCidOrPermit(cid_or_permit_no) {
    this.apiService.getPersonalDetailsFromErailis(cid_or_permit_no).subscribe(eralis_response => {
      console.log("Eralis", eralis_response);
      if (eralis_response !== null) {
        this.first_name = eralis_response.first_Name;
        this.middle_name = eralis_response.middle_Name;
        this.last_name = eralis_response.last_Name;
        this.personal_details_exist = true;
        this.personal_details_not_exist = false;
      } else {
        this.apiService.getPersonalDetailsFromDrc(cid_or_permit_no).subscribe(drc_response => {
          if (drc_response !== null) {
            this.first_name = drc_response.firstName;
            this.middle_name = drc_response.middleName;
            this.last_name = drc_response.lastName;
            this.personal_details_exist = true;
            this.personal_details_not_exist = false;
          } else {
            this.personal_details_exist = false;
            this.personal_details_not_exist = true;
          }
        });
      }
    });
  }

  clearData() {
    this.juris_or_juristype_id = "";
    this.cid_or_permit_no = "";
    this.first_name = "";
    this.middle_name = "";
    this.last_name = "";
    this.reason = "";
  }

  selectedAppointment(juris_or_juristype_id) {
    this.apiService.getAppointmentAvaliablityTime().subscribe(response => {
      debugger;
      let str1 = juris_or_juristype_id.split("-");
      this.juris_id = str1[0].slice(0, 5);
      this.juris_type_id = str1[1].slice(0, 5);
      console.log("Juris id", this.juris_id);
      console.log("Juris type id", this.juris_type_id);
      for (var i = 0; i < response.length; i++) {
        if (this.juris_id == response[i].juris_id && this.juris_type_id == this.juris_type_id) {
          this.avaliableResponse.push(response[i]);
          console.log(this.avaliableResponse, "res")
        }
      }
      return this.avaliableResponse;
    });
  }

  bookAppointment() {
    debugger;
    if (this.juris_or_juristype_id !== undefined) {
      const str = this.juris_or_juristype_id.split(" - ");
      this.juris_id = parseInt(str[0]);
      this.juris_type_id = parseInt(str[1]);
    } else {
      this.juris_id = 0;
      this.juris_type_id = 0;
    }
    if (this.cid_or_permit_no !== undefined && this.first_name !== undefined && this.mobile_number !== undefined
      && this.reason != undefined && this.juris_id !== undefined && this.juris_type_id !== undefined) {
      this.appointment_model.cid_number = this.cid_or_permit_no;
      this.appointment_model.jusris_id = this.juris_id;
      this.appointment_model.juris_type_id = this.juris_type_id;
      this.appointment_model.first_name = this.first_name;
      this.appointment_model.middle_name = this.middle_name;
      this.appointment_model.last_name = this.last_name;
      this.appointment_model.reason = this.reason;
      this.appointment_model.mobile_number = this.mobile_number;
      this.appointment_model.official_id = this.official_id;
      this.apiService.makeAppointment(this.appointment_model).subscribe(response => {
        this.successMsg = "You have successfully booked the appointment";
        this.successMsgCard = true;
        this.errorMsg = "";
        this.clearData();
      }, error => {
        this.errorMsg = error;
        this.successMsgCard = false;
      });
    } else {
      this.errorMsg = "Please fill up all the required form";
      this.successMsgCard = false;
    }
  }

}
