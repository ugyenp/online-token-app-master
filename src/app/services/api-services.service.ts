import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ONLINETOKEN_API_URL } from '../app.constant';
import { ERALIS_API_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  /*
   * Author: Ugyen Penjor
   * Designation: Software Engineer
   * NGN Technologies Pvt Ltd @ 2020
   */

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  getTransactionList(): Observable<any> {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "get-transaction", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getServiceListBasedOnTransaction(id): Observable<any> {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "get-services" + "/" + `${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getServicesByServiceId(id): Observable<any> {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "get-service-id" + '/' + `${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getOtpNumber(): Observable<any> {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "generate-otp", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveOtp(item): Observable<any> {
    return this.http
      .post<any>(`${ONLINETOKEN_API_URL}` + "save-otp-number", JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getOtpNumberFromDb(): Observable<any> {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "get-otp-number", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateverifiedtime(id): Observable<any> {
    return this.http
      .put<any>(`${ONLINETOKEN_API_URL}` + "update-verified" + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getRstaRegion(): Observable<any> {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getRegion", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTokenDetailsByJurisId(jusris_id) {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "tokendetails/" + `${jusris_id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTokenDetailsByDate(token_date) {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "tokendate/" + `${token_date}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  getmaxToken(token_id, appointment_time_from, appointment_time_to) {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "maxToken/" + `${token_id}` + "/" + `${appointment_time_from}` + "/" + `${appointment_time_to}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  updatelastTokenSequence(id, item): Observable<any> {
    return this.http
      .put<any>(`${ONLINETOKEN_API_URL}` + "updateTokenSequence/" + `${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTokendetailsByTokenNumber(tokenNo) {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "getTokenDetails/" + `${tokenNo}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  drvingLicenseDetailsByDlNumber(dlNumber) {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "drivingLicense/" + `${dlNumber}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  drvingLicenseDetailsByCustomerId(customer_id) {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "drivingLicenseDetails/" + `${customer_id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  vehicleDetails(fprefix, mprefix, lprefix, digit) {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "vehicle/" + `${fprefix}` + "/" + `${mprefix}` + "/p=" + `${lprefix}` + "/" + `${digit}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  learrnerLicenseDtailsByCustomerId(customer_id) {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "learnerLicenseDetails/" + `${customer_id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  vehicleDetailsByCustomerId(customer_id) {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getVehicleDetailsByCusId/" + `${customer_id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  viewTokenByDrivingLicense(transaction_type,service_type,identity_number){
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "drivingLicenseTokenView/" + `${transaction_type}` + "/" + `${service_type}` + "/" + `${identity_number}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //from here
  getDrivingLicenseDetails(customer_id){
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getDrivingLicenseDetailsByCusId/" + `${customer_id}`,  this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getLearnerLicenseDetails(customer_id){
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getLearnerLicenseDetailsByCusId/" + `${customer_id}`,  this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getVehicleDetails(customer_id){
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getVehicleDetailsByCusId/" + `${customer_id}`,  this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // from here new
  getAllDetailsByCidNumber(cid_number){
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getAllDetailsByCidNumber/" + `${cid_number}`,  this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getPersonalDetailsFromDrc(cidNumber) {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "getcitizendetails/" + `${cidNumber}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getPersonalDetailsFromErailis(cid_number): Observable<any> {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "personalDetails/" + `${cid_number}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getPersonalDetailsByLearnerLicense(ll_prefix, ll_no) {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "learnerLicense/" + `${ll_prefix}` + "/" + `${ll_no}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveTokenDetails(item) {
    return this.http
      .post<any>(`${ONLINETOKEN_API_URL}` + "savetokenDetails", item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveTokenDetailsForNewRegistration(item) {
    return this.http
      .post<any>(`${ONLINETOKEN_API_URL}` + "saveNewRegistrationTokenDetails", JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getRegionOffice() {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getRegion" , this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getBaseOffice() {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getBase" , this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getOfficalForAppointment() {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "getOfficial" , this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  makeAppointment(item) {
    return this.http
      .post<any>(`${ONLINETOKEN_API_URL}` + "makeAppointment", JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getCounterDetails(juris_id){
    return this.http
    .get<any>(`${ONLINETOKEN_API_URL}` + "getCounterDetailsByJurisId/" + `${juris_id}`,  this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  viewTokenByCidNumber(cid_number){
    return this.http
    .get<any>(`${ONLINETOKEN_API_URL}` + "viewToken/" + `${cid_number}`,  this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getAllVehicleType(): Observable<any> {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getVehicleType/", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAllDetailsByVehicleNumber(vehicle_number,vehicle_type_id): Observable<any> {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getDetailsByVehicleNo/" + `${vehicle_number}` + "/" + `${vehicle_type_id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAllDetailsByDrivingLicenseNumber(licenseNo): Observable<any> {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "getDetailsByLicenseNo/" + `${licenseNo}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAppointmentAvaliablityTime(): Observable<any> {
    return this.http
      .get<any>(`${ONLINETOKEN_API_URL}` + "appointmentTime", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  ownerType(): Observable<any> {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "ownerType", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  privateCompanies(): Observable<any> {
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "pravateCompanies", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  govtOrganisation(){
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "govtOrganisation", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  royalHighness(){
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "royal", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  diplomat(){
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "diplomat", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  departmentById(minister_id){
    return this.http
      .get<any>(`${ERALIS_API_URL}` + "department/" + `${minister_id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  serviceList(){
    return this.http
    .get<any>(`${ERALIS_API_URL}` + "service/", this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

}
