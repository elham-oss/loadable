import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'light-localize-router-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  syncWithTenantConfig($event: any) {
  }
}
