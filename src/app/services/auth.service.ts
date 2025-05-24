import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private helper = new JwtHelperService();
  apiURL: string = 'http://localhost:5000/users';
  token: string | null = null;  // Make sure token can be null

  public loggedUser: string | null = null;  // user can be null initially
  public isloggedIn: boolean = false;
  public roles: string[] = [];  // Ensure roles is always initialized
  public regitredUser : User = new User();

  constructor(private router: Router, private http: HttpClient) {}

  // Login method to authenticate the user
  login(user: User) {
    return this.http.post<User>(`${this.apiURL}/login`, user, { observe: 'response' });
  }

  

  // Save the JWT token in local storage and decode it
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  // Get the JWT token
  getToken(): string | null {
    return this.token;
  }

  // Decode the JWT token and set the logged user and roles
  decodeJWT() {
    if (!this.token) return;  // Don't attempt to decode if token is null
    const decodedToken = this.helper.decodeToken(this.token);
    if (decodedToken) {
      this.roles = decodedToken.roles || [];  // Default to empty array if no roles
      this.loggedUser = decodedToken.sub || null;  // Handle missing sub value
    }
  }

  // Check if the user has 'ADMIN' role
  isAdmin(): boolean {
    if (!this.roles || this.roles.length === 0) return false;
     console.log("isAdmin called - returning", this.roles.includes('ADMIN'));
    return this.roles.indexOf('ADMIN') >= 0;
  }
  

  // Logout the user by clearing all data and redirecting to the login page
  logout() {
    this.loggedUser = null;  // Set to null instead of undefined
    this.roles = [];  // Reset roles to empty array
    this.token = null;  // Set to null instead of undefined
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  // Set logged user details from local storage
  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
  }

  // Load the JWT token from local storage and decode it
  loadToken() {
    // Check if we're in the browser (client-side) before accessing localStorage
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const storedToken = localStorage.getItem('jwt');
      if (storedToken) {
        this.token = storedToken;
        this.decodeJWT();
      }
    } else {
      console.warn('localStorage is not available.');
    }
  }

  // Check if the JWT token has expired
  isTokenExpired(): boolean {
    if (!this.token) return true;  // If there's no token, it's expired
    return this.helper.isTokenExpired(this.token);  // Check expiration
  }

  registerUser(user :User){
return this.http.post<User>(this.apiURL+'/register', user,
{observe:'response'});
}

setRegistredUser(user : User){
this.regitredUser=user;
}
getRegistredUser(){
return this.regitredUser;
}
validateEmail(code : string){
return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
}
}