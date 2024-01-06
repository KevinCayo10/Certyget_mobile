import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  router = inject(Router);
  constructor() {}

  ngOnInit() {}
  buscar() {
    this.router.navigateByUrl('/home');
  }
  validar() {
    this.router.navigateByUrl('/validator');
  }
}
