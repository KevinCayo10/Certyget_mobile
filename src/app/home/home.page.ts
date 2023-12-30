import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form = new FormGroup({
    apellidos: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]*$/),
    ]),
    cedula: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/), // Ensure it's 10 digits and numeric
    ]),
  });
  constructor() {}
}
