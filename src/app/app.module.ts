import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YtComponent } from './components/player/yt/yt.component';
import { LocalComponent } from './components/player/local/local.component';
import { SyncComponent } from './components/lyrics/sync/sync.component';
import { NavbarComponent } from './components/structure/navbar/navbar.component';
import { WatchfunComponent } from './components/pages/watchfun/watchfun.component';
import { MyFunsyncComponent } from './components/pages/my-funsync/my-funsync.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SearchComponent } from './components/pages/search/search.component';
import { IndexComponent } from './components/pages/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    YtComponent,
    LocalComponent,
    SyncComponent,
    NavbarComponent,
    WatchfunComponent,
    MyFunsyncComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
