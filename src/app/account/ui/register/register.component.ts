import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent, accountModuleAnimation } from '@cartesianui/common';
import { AccountService } from '../../shared';

import { AccountSandbox } from '../../account.sandbox';
import { AuthUser, UserRegistrationForm } from '../../models';

@Component({
  selector: 'app-account',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [accountModuleAnimation()]
})
export class RegisterComponent extends FormBaseComponent<AuthUser> implements OnInit, OnDestroy {
  constructor(
    injector: Injector,
    private accountService: AccountService,
    public _sandbox: AccountSandbox
  ) {
    super(injector);
    this.formGroup = new FormGroup({
      email: new FormControl('', []),
      name: new FormControl('', []),
      password: new FormControl('', []),
      cofirmPassword: new FormControl('', []),
      gender: new FormControl('unspecified', []),
      dob: new FormControl('', [])
    });
  }

  ngOnInit(): void {
    this.addSubscriptions();
  }

  save(): void {
    if (this.formGroup.valid) {
      const form = new UserRegistrationForm();
      form.email = this.formGroup.controls.email.value;
      form.name = this.formGroup.controls.name.value;
      form.password = this.formGroup.controls.password.value;
      form.gender = this.formGroup.controls.gender.value;
      form.birth = this.formGroup.controls.dob.value;
      this._sandbox.register(form);
    }

    // this.saving = true;
    // this._accountService
    //  .register(this.model)
    //  .pipe(
    //    finalize(() => {
    //      this.saving = false;
    //    })
    //  )
    //  .subscribe((result: RegisterOutput) => {
    //    if (!result.canLogin) {
    //      this.notify.success(this.l('SuccessfullyRegistered'));
    //      this._router.navigate(['/login']);
    //      return;
    //    }

    // Autheticate
    // this.saving = true;
    // this.authService.authenticateModel.userNameOrEmailAddress = this.model.userName;
    // this.authService.authenticateModel.password = this.model.password;
    // this.authService.authenticate(() => {
    //   this.saving = false;
    // });
    // });
  }

  addSubscriptions(): void {}
}
