import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
//import { Client } from '../client';
import { Client } from '../client';
import axios from 'axios';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css'],
})
export class ClientRegisterComponent implements OnInit {
  EmailError: string | undefined;
  DocumentError: string | undefined;
  LoginError: string | undefined;

  ngOnInit(): void {}

  VerifyForm() {
    let nameInput = this.getInputField('#name');
    let nameBoolean =
      this.VerifyInputFieldIsNull(nameInput) &&
      this.VerifyInputFieldSize(3, nameInput);

    let phoneInput = this.getInputField('#phone');
    let phoneBoolean =
      this.VerifyInputFieldIsNull(phoneInput) &&
      this.VerifyPhoneSize(phoneInput);

    let emailInput = this.getInputField('#email');
    let emailBoolean =
      this.VerifyInputFieldIsNull(emailInput) &&
      this.VerifyEmailIsValidy(emailInput);

    let documentInput = this.getInputField('#document');
    let documentBoolean = this.VerifyInputFieldIsNull(documentInput);

    let dateInput = this.getInputField('#birth');
    let dateBoolean = this.VerifyInputFieldIsNull(dateInput);

    let loginInput = this.getInputField('#login');
    let loginBoolean =
      this.VerifyInputFieldIsNull(loginInput) &&
      this.VerifyInputFieldSize(4, loginInput);

    let passwordInput = this.getInputField('#password');
    let passwordBoolean =
      this.VerifyInputFieldIsNull(passwordInput) &&
      this.VerifyPasswordIsValid(passwordInput);

    console.log(dateInput.value);
    console.log();

    let result =
      nameBoolean &&
      phoneBoolean &&
      emailBoolean &&
      documentBoolean &&
      dateBoolean &&
      loginBoolean &&
      passwordBoolean;

    if (result == true) {
      var data = JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        date_of_birth: dateInput.value,
        document: documentInput.value,
        phone: phoneInput.value,
        login: loginInput.value,
        address: {
          street: 'rua genoveva forlepa kopka',
          city: 'Pinhais',
          state: 'Paraná',
          country: 'Brasil',
          postal_code: '83320560',
        },
        passwd: passwordInput.value,
      });
      let instance = this;
      var config = {
        method: 'post',
        url: 'http://localhost:5236/client/register',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          let errors = error.response.data;
          console.log(errors);
          if (errors.email) {
            instance.EmailError = errors.email;
          }
          if (errors.document) {
            instance.DocumentError = errors.document;
          }
          if (errors.login) {
            instance.LoginError = errors.login;
          }
        });
    }
  }

  activeVisibleSpan(id: string) {
    var span = document.querySelector(id);
    span?.classList.remove('invisible');
  }

  desactiveVisibleSpan(id: string) {
    var span = document.querySelector(id);
    span?.classList.add('invisible');
  }

  getInputField(id: string) {
    let response = document.querySelector(id) as HTMLInputElement;
    return response;
  }

  VerifyInputFieldIsNull(input: HTMLInputElement) {
    let prop = '#' + input.id + '-none';
    if (input.value.length == 0) {
      this.activeVisibleSpan(prop);
      return false;
    } else {
      this.desactiveVisibleSpan(prop);
      return true;
    }
  }

  VerifyInputFieldSize(size: number, input: HTMLInputElement) {
    let prop = '#' + input.id + '-lenght';
    if (input.value.length >= size) {
      this.desactiveVisibleSpan(prop);
      return true;
    } else {
      this.activeVisibleSpan(prop);
      return false;
    }
  }

  VerifyPhoneSize(input: HTMLInputElement) {
    let prop = '#' + input.id + '-lenght';
    if (input.value.length == 15) {
      this.desactiveVisibleSpan(prop);
      return true;
    } else {
      this.activeVisibleSpan(prop);
      return false;
    }
  }

  VerifyEmailIsValidy(Input: HTMLInputElement) {
    let prop = '#' + Input.id + '-valid';
    if (Input.value.includes('@') && Input.value.length > 3) {
      this.desactiveVisibleSpan(prop);
      return true;
    } else {
      this.activeVisibleSpan(prop);
      return false;
    }
  }

  VerifyPasswordIsValid(Input: HTMLInputElement) {
    let value = Input.value;
    let prop = '#' + Input.id + '-valid';
    let ALPHA = /[A-Z]/;
    let alpha = /[a-z]/;
    let number = /[0-9]/;
    let spec = /[\!\$\.]/;
    if (
      ALPHA.test(value) &&
      number.test(value) &&
      alpha.test(value) &&
      spec.test(value)
    ) {
      this.desactiveVisibleSpan(prop);
      return true;
    } else {
      this.activeVisibleSpan(prop);
      return false;
    }
  }

  PhoneMaskField(event: KeyboardEvent) {
    var key = event.keyCode || event.charCode;
    let phoneField = this.getInputField('#phone') as HTMLInputElement;
    let phoneValue = phoneField.value;
    let number = /[0-9]/;
    if (key != 8 && key != 46) {
      if (!number.test(phoneValue[phoneValue.length - 1])) {
        let alpha = /[a-zA-Z]/;
        phoneValue = phoneValue.replace(alpha, '');
      } else if (phoneValue.length == 1) {
        phoneValue = '(' + phoneValue;
      } else if (phoneValue.length == 3) {
        phoneValue = phoneValue + ') ';
      } else if (phoneValue.length == 10) {
        phoneValue += '-';
      }
    }
    phoneField.value = phoneValue;
  }

  ViaCEPAPI() {
    let input = this.getInputField('#cep');

    if (input.value.length == 9) {
      var cep = input.value.replace('-', '');
      console.log(cep);

      var config = {
        method: 'get',
        url: 'viacep.com.br/ws/' + cep +  '/json/',
        headers: {},
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
