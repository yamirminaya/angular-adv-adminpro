/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable operator-linebreak */
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  linkTheme = document.querySelector('#theme');

  constructor(
    private settingsService: SettingService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }
}
