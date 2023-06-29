import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'General', url: '/general', icon: 'earth' },
    { title: 'Sports', url: '/sports', icon: 'basketball' },
    { title: 'Technology', url: '/technology', icon: 'save' },
    { title: 'Health', url: '/health', icon: 'fitness' },
  
  ];
  constructor() {}
}
