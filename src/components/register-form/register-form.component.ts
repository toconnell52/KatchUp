import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  account = {} as Account;
  profilePic: string;
  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthService) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    try {
      const result = await this.auth.createUserWithEmailAndPassword(this.account);
      this.registerStatus.emit(result);
      console.log(result);
    } 
    catch(e) {
      console.error(e);
      this.registerStatus.emit(e);
    }
  }

}
