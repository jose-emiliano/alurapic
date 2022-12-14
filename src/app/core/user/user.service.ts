import { Injectable } from '@angular/core';
import  jwt from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser | null>(null)
  private userName: string = ''

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify()
  }

  setToken(token: string) {
    this.tokenService.setToken(token)
    this.decodeAndNotify()
  }

  getUser() {
    return this.userSubject.asObservable()
  }

  logout() {
    this.tokenService.removeToken()
    this.userSubject.next(null)
  }

  isLogged() {
    return this.tokenService.hasToken()
  }

  getUserName() {
    return this.userName
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken()
    const user = jwt(<string>token) as IUser
    this.userName = user.name
    this.userSubject.next(user)
  }
}
