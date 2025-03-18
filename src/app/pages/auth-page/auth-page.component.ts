import { Component } from '@angular/core';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { LoginFormComponent } from '../../components/auth-page/login-form/login-form.component';
import { RegisterFormComponent } from "../../components/auth-page/register-form/register-form.component";

@Component({
  selector: 'app-auth-page',
  imports: [
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    LoginFormComponent,
    RegisterFormComponent
],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {

}
