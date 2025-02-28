import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { LoginFormComponent } from "../../components/auth-page/login-form/login-form.component";
import { RegisterFormComponent } from '../../components/auth-page/register-form/register-form.component';


@Component({
  selector: 'app-auth-page',
  imports: [TabsModule, LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

}
