//package web

//import org.springframework.boot.SpringApplication;
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

// @ComponentScan(
//   value = "com.in28minutes.springboot.web"
// )
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
//public class SpringBootFirstWebApplication implements OnInit
export class WelcomeComponent implements OnInit {

  name = ''
  message : string = 'Some Welcome Message'
  welcomeMessageFromService : string = ''

  //public WelcomeComponent(){}
  //ActivatedRoute
  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService) { }

  ngOnInit() {
    //Compilation error this.message = 5
    console.log(this.message)
    console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessage() {
    console.log(this.service.executeHelloWorldBeanService())
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    )
    console.log("last line of getWelcomeMessage()")
  }

  getWelcomeMessageWithParameter() {
    console.log(this.service.executeHelloWorldServiceWithPahVariable(this.name))
    this.service.executeHelloWorldServiceWithPahVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    )
    console.log("last line of getWelcomeMessage()")
  }

  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message
    console.log(response.message)
  }

  handleErrorResponse(error) {
    this.welcomeMessageFromService = error.error.message
  }
}
