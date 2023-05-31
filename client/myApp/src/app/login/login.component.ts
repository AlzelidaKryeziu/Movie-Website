import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private route:Router, private authService:AuthService) {
  }
  email:any
  password:any
  ngOnInit(): void {
    if(localStorage.getItem('token') !== null){
      this.route.navigateByUrl('/dashboard')
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data));
        sessionStorage.setItem('token', JSON.stringify(data));
        this.route.navigateByUrl('/dashboard');
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
