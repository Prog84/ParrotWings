import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {User} from '../../shared/models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null
  serverTokenPath ='/token';

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/Account/Register', user)
  }

  login(user: User): Observable<any> {
    var data = "username=" + user.email+ "&password=" + user.password + "&grant_type=password";
    return this.http.post(this.serverTokenPath, data);
  }
    
  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }

}