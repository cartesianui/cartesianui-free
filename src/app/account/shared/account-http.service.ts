import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, POST, GET, Body, DefaultHeaders, Adapter, AppConstants } from '@cartesianui/core';
import { LoginForm, UserRegistrationForm } from '../models';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class AccountHttpService extends HttpService {
  /**
   * Submits login form to the server
   *
   * @param LoginForm form AuthUser login form
   */
  @POST(null, 'login')
  public login(@Body form: LoginForm): Observable<any> {
    return null;
  }

  /**
   * Submits login form to the server
   *
   */
  @GET('/profile')
  public fetchUser(): Observable<any> {
    return null;
  }

  /**
   * Submits register form to the server
   *
   * @param RegisterForm form AuthUser registration form
   */
  @POST('/register')
  public register(@Body form: UserRegistrationForm): Observable<any> {
    return null;
  }

  /**
   * Logs out current user
   */
  @POST('/account/logout')
  public logout(): Observable<any> {
    return null;
  }
}
