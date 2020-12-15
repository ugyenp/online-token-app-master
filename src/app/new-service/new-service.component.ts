import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpModel } from '../model/otp-model';
import { Tokendetails } from '../model/tokendetails';
import { ApiServicesService } from '../services/api-services.service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent implements OnInit {

  @ViewChild('pdfTable',{static: false}) pdfTable: ElementRef;
  public downloadAsPDF() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
   
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    
  }

  service_type: any;
  select_search: any;
  cid_or_permit_no: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile_number: string;
  medical_certificate: any;
  identity_number: string;
  cid_copy: any;
  bio_data: any;
  pass_photo: any;
  valid_ll: any;
  document_checked: string;
  invoice_reciept: any;
  tokenDetailModel: Tokendetails;
  emission_certificate: any;
  intd_certificate: any;
  driving_training: any;
  ll_initial: string;
  ll_number: string;
  expiry_date: any;
  customer_type: any;
  cid_form: boolean = false;
  ll_no_form: boolean = false;
  service_card: boolean = true;
  learner_license_card: boolean = false;
  driving_license_card: boolean = false;
  vehicle_registration_card: boolean = false;
  personal_details_not_exist: boolean = true;
  personal_details_exist: boolean = false;
  token_details_card: boolean = false;
  otpVerifiedAlert: boolean = false;
  counter: number;
  closeResult: string;
  showModal: boolean;
  otpModel: OtpModel;
  otpNumber: number;
  organisation_card: boolean = false;
  personal_card: boolean = false;
  verifiedDate: Date;
  id: number;
  rstaRegionMaster: string;
  serviceDetails: boolean = true;
  regionId: number;
  responseregion: string;
  tokenDate: string;
  tokenDateFromRes: any;
  TimesDisplay: Array<string>;
  slot: number;
  tokenId: number;
  appointmentTime: string;
  appointmentTimeFrom: any;
  appointmentTimeTo: any;
  tokenNumber: number;
  ServiceName: string;
  serviceId: number
  alert_modal: any;
  errorMsg: string;
  successMsg: string;
  counter_api_response:any;
  user_id:number;
  counter_number:number;
  counterPerson:string;
  test_attend:any;
  ownerTypeResponse:any;
  pvtOrgResponse:any;
  govOrgResponse:any;
  royaResponse:any;
  royalResponse:any;
  diplomatResponse:any;
  departmentResponse:any;
  dipType:boolean = false;
  pvtType:boolean = false;
  govtType:boolean = false;
  royalType:boolean = false;
  deptType:boolean = false;
  organisationTypeId:number;
  organisationId:number;
  organisationName:string;
 
 

  constructor(private modalService: NgbModal, private apiService: ApiServicesService) {
    this.otpModel = new OtpModel();
    this.tokenDetailModel = new Tokendetails();
  }

  ngOnInit() {
    this.ownerType();
  }

  goToLink(url: string){
    window.open(url, "_blank");
}
  cancealCurrentPage() {
    this.token_details_card = false;
    this.service_card = true;
    this.driving_license_card = false;
    this.learner_license_card = false;
    this.vehicle_registration_card = false;
  }

  rstaRegion() {
    this.apiService.getRstaRegion().subscribe(response => {
      this.rstaRegionMaster = response;
    });
  }

  getTokenDetails(regionId) {
    this.apiService.getTokenDetailsByJurisId(regionId).subscribe(response => {
      this.responseregion = response;
    });

    this.apiService.getCounterDetails(regionId).subscribe(counterResponse => {
      this.counter_api_response = counterResponse;
      console.log(counterResponse)
    });
  }

  ownerType(){
    this.apiService.ownerType().subscribe(response => {
      this.ownerTypeResponse = response;
    });
  }

  privateCompanies(){
    this.apiService.privateCompanies().subscribe(response => {
      this.pvtOrgResponse = response;
    });
  }

  governmnetOrganisation(){
    this.apiService.govtOrganisation().subscribe(response => {
      this.govOrgResponse = response;
     });
  }

  royalHighness(){
    this.apiService.royalHighness().subscribe(response => {
      this.royalResponse = response;
    })
  }

  diplomat(){
    this.apiService.diplomat().subscribe(response => {
      this.diplomatResponse = response;
      console.log(this.diplomatResponse)
    });
  }

  selectDepartment(organisationId){
    this.apiService.departmentById(organisationId).subscribe(response => {
      this.deptType = true;
      this.departmentResponse = response;
      this.first_name = this.organisationName;
    });
  }
  

  selectedOwner(organisationTypeId){
    if(organisationTypeId == 2){
      this.privateCompanies();
      this.pvtType = true;
      this.govtType = false;
      this.royalType = false;
      this.dipType = false;
      this.deptType = false;
      this.first_name = this.organisationName;
    } else if(organisationTypeId == 3){
      this.pvtType = false;
      this.royalType = false;
      this.govtType = true;
      this.dipType = false;
      this.deptType = false;
      this.governmnetOrganisation()
    } else if(organisationTypeId == 5){
      this.pvtType = false;
      this.royalType = true;
      this.govtType = false;
      this.dipType = false;
      this.first_name = this.organisationName;
      //this.deptType = false;
      this.royalHighness();
    } else if(organisationTypeId == 6){
      this.pvtType = false;
      this.royalType = false;
      this.govtType = false;
      this.dipType = true;
      this.deptType = false;
      this.first_name = this.organisationName;
      this.diplomat();
    }

  }

  getCounterDetails(counter_details){
    if(counter_details !== undefined){
      let str1 = counter_details.split(" - ");
      this.user_id = str1[0];
      this.counter_number = str1[1];
    }
  }

  selectedCustomerType(customer_type) {
    if (customer_type === "1") {
      this.organisation_card = false;
      this.personal_card = true;
    } else if (customer_type === "2") {
      this.organisation_card = true;
      this.personal_card = false;
    }
  }

  getPersonalDetailsByLearnerLicense(ll_initial, ll_number) {
    this.apiService.getPersonalDetailsByLearnerLicense(ll_initial, ll_number).subscribe(response => {
      console.log("DL response", response);
      this.first_name = response[0].First_Name;
      this.middle_name = response[0].Middle_Name;
      this.last_name = response[0].Last_Name;
      this.expiry_date = response[0].Expiry_Date;
      this.identity_number = ll_initial + "/LL-" + ll_number;
    });
  }

  getPersonalDetailsByCidOrPermit(cid_or_permit_no) {
    this.apiService.getPersonalDetailsFromErailis(cid_or_permit_no).subscribe(eralis_response => {
      if (eralis_response !== null) {
        console.log(eralis_response, "eralis res")
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

  selectedService(service_type) {
    switch (true) {
      case service_type === "Driving License":
        this.driving_license_card = true;
        this.learner_license_card = false;
        this.vehicle_registration_card = false;
        this.otpVerifiedAlert = false;
        break;

      case service_type === "Learner License":
        this.driving_license_card = false;
        this.learner_license_card = true;
        this.vehicle_registration_card = false;
        this.otpVerifiedAlert = false;
        break;

      case service_type === "Vehicle Registration":
        this.driving_license_card = false;
        this.learner_license_card = false;
        this.vehicle_registration_card = true;
        this.otpVerifiedAlert = false;
        break;

      default:
        this.driving_license_card = false;
        this.learner_license_card = false;
        this.vehicle_registration_card = false;
        this.otpVerifiedAlert = false;
    }
  }

  selectedSearch(select_search) {
    if (select_search == "C") {
      this.cid_form = true;
      this.ll_no_form = false;
    } else if (select_search == "L") {
      this.cid_form = false;
      this.ll_no_form = true;
    }
  }

  applyForVehicleRegistrationToken() {
    if (this.service_type !== undefined && this.customer_type !== undefined && (this.cid_or_permit_no !== undefined || this.first_name !== undefined)
      && this.mobile_number !== undefined && this.valid_ll !== undefined &&
      this.invoice_reciept !== undefined && this.emission_certificate !== undefined && this.cid_copy !== undefined) {
      this.rstaRegion();
      this.errorMsg = "";
      this.token_details_card = true;
      this.driving_license_card = false;
      this.learner_license_card = false;
      this.vehicle_registration_card = false;
      this.service_card = false;
      this.document_checked = "Yes";
    } else {
      this.errorMsg = "Cannot proceed, Please fill up the required field";
    }
  }

  applyForLearnerLicenseToken() {
    if (this.service_type !== undefined && this.cid_or_permit_no !== undefined &&
      this.first_name !== undefined && this.mobile_number !== undefined && this.bio_data !== undefined &&
      this.medical_certificate !== undefined && this.pass_photo !== undefined && this.cid_copy !== undefined) {
      this.rstaRegion();
      this.errorMsg = "";
      this.token_details_card = true;
      this.driving_license_card = false;
      this.learner_license_card = false;
      this.vehicle_registration_card = false;
      this.service_card = false;
      this.document_checked = "Yes";
    } else {
      this.errorMsg = "Cannot proceed, Please fill up the required field";
    }
  }

  applyForDrivingLicenseToken() {
    if (this.service_type !== undefined && (this.cid_or_permit_no !== undefined || this.ll_initial !== undefined || this.ll_number !== undefined) &&
      this.first_name !== undefined && this.mobile_number !== undefined  &&
      this.valid_ll !== undefined && this.intd_certificate !== undefined && this.driving_training !== undefined
      && this.pass_photo !== undefined
      ) {
      this.rstaRegion();
      this.errorMsg = "";
      this.token_details_card = true;
      this.driving_license_card = false;
      this.learner_license_card = false;
      this.vehicle_registration_card = false;
      this.service_card = false;
      this.document_checked = "Yes";
    } else {
      this.errorMsg = "Cannot proceed, Please fill up the required field";
    }
  }

  getTokenTime(tokenDate) {
    this.apiService.getTokenDetailsByDate(tokenDate).subscribe(response => {
      this.slot = response.time_slot;
      this.tokenId = response.id;
      var times = [];
      //var start_break_time = response.start_break_time;
      // var end_break_time = response.end_break_time;
      var start_time = parseInt(response.start_time) * 60;
      var end_time = parseInt(response.end_time) * 60;
      var start_time_to = ((parseInt(response.start_time) * 60) + this.slot);
      var ap = ['AM', 'PM'];
      for (var i = 0; start_time <= end_time - this.slot; i++) {
        var hh = Math.floor(start_time / 60);
        var hh1 = Math.floor(start_time_to / 60);
        var mm = (start_time % 60);
        var mm1 = (start_time_to % 60);
        times[i] = ("0" + (hh)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)] + " to " + ("0" + (hh1)).slice(-2) + ':' + ("0" + mm1).slice(-2) + ap[Math.floor(hh / 12)];
        start_time = start_time + this.slot;
        start_time_to = start_time_to + this.slot;
      }
      this.TimesDisplay = times;
    });
  }

  appointmentTimeSplit(appointmentTime) {
    let str1 = appointmentTime.split(" to ");
    this.appointmentTimeFrom = str1[0].slice(0, 5);
    this.appointmentTimeTo = str1[1].slice(0, 5);
    console.log(this.appointmentTimeFrom.slice(0, 5) + "++" + this.appointmentTimeTo.slice(0, 5));
  }

  openAlert(alert_modal) {
    this.modalService.open(alert_modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    if (this.regionId !== undefined && this.tokenDate !== undefined && this.appointmentTime !== undefined) {
      this.generateOtp();
      this.timeCountDown();
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.errorMsg = "Please select the required option";
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  timeCountDown() {
    this.counter = 80;
    const interval = setInterval(() => {
      this.counter--;
      if (this.counter < 0) {
        this.modalService.dismissAll();
        clearInterval(interval);
      }
    }, 1000);
  }

  generateOtp() {
    this.apiService.getOtpNumber().subscribe((response) => {
      this.otpNumber = parseInt(response);
      this.otpModel.otp_number = this.otpNumber;
      this.otpModel.cid_number = this.cid_or_permit_no;
      this.otpModel.phone_number = this.mobile_number;
      if (this.mobile_number != "") {
        this.apiService.saveOtp(this.otpModel).subscribe((response) => {
          console.log("successfully updated");
        });
      } else { console.log("update failed"); }
    });
  }

  saveTokenDetails() {
    this.apiService.getmaxToken(this.tokenId, this.appointmentTimeFrom, this.appointmentTimeTo).subscribe(token_response => {
      if (token_response[0] === null) {
        this.tokenNumber = 1;
      } else {
        this.tokenNumber = parseInt(token_response[0]) + 1;
      }
      console.log("max", token_response);
      debugger;
      this.tokenDetailModel.token_no = this.tokenNumber;
      this.tokenDetailModel.appointment_time_from = this.appointmentTimeFrom;
      this.tokenDetailModel.appointment_time_to = this.appointmentTimeTo;
      this.tokenDetailModel.identity_number = this.identity_number;
      this.tokenDetailModel.service_type = this.service_type;
      this.tokenDetailModel.service = "New";
      this.tokenDetailModel.first_name = this.first_name;
      this.tokenDetailModel.middle_name = this.middle_name;
      this.tokenDetailModel.last_name = this.last_name;
      this.tokenDetailModel.document_checked = this.document_checked;
      this.tokenDetailModel.token_id = this.tokenId;
      this.tokenDetailModel.mobile_number = this.mobile_number;
      this.tokenDetailModel.cid_passport_no = this.cid_or_permit_no;
      this.tokenDetailModel.user_id = this.user_id;

      this.apiService.saveTokenDetailsForNewRegistration(this.tokenDetailModel).subscribe(response => {
        this.errorMsg = "";
        this.successMsg = "Token Details:";
        this.tokenNumber;
        this.counter_number;
        this.counterPerson;
      });
    });
  }

  verifyOtp(otp) {
    this.apiService.getOtpNumberFromDb().subscribe((response) => {
      for (let i = 0; i < response.length; i++) {
        if (otp == response[i].otp_number && this.mobile_number == response[i].phone_number) {
          this.errorMsg = "";
          this.id = response[i].id;
          this.apiService.updateverifiedtime(this.id).subscribe((response) => {
            console.log("successfully verified");
          });
          this.saveTokenDetails();
          this.modalService.dismissAll();
          this.otpVerifiedAlert = true;
        } else {
          this.errorMsg = "Invalid OTP. Please enter valid OTP";
        }
      }
    });
    this.cancealCurrentPage()
  }

}
