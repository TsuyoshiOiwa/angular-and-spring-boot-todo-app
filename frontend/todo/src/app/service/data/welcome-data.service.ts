import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constant';

export class HelloWorldBean {
  constructor(public message: string){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    // console.log("Execute Hello World Bean Service")
    return this.http.get<HelloWorldBean>(API_URL + '/hello-world-bean')
  }

  executeHelloWorldServiceWithPahVariable(name) {
    // console.log("Execute Hello World Bean Service")
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader()

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<HelloWorldBean>(API_URL + `/hello-world/path-variable/${name}`, {headers})
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'user'
    let password = 'password'
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    return basicAuthHeaderString
  }

}
