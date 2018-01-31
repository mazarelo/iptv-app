import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { FavoritesPage } from '../favorites/favorites';

import { HomePage } from '../home/home';
import { AlarmsPage } from '../alarms/alarms'
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FavoritesPage;
  tab3Root = SettingsPage;
  tab4Root = AlarmsPage

  constructor() {}
  
}
