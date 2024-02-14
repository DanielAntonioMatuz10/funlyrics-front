import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YtComponent} from './components/player/yt/yt.component';
import {AppComponent} from './app.component';
import {LocalComponent} from './components/player/local/local.component';
import {SyncComponent} from './components/lyrics/sync/sync.component';
import {WatchfunComponent} from './components/pages/watchfun/watchfun.component';
import {MyFunsyncComponent} from './components/pages/my-funsync/my-funsync.component';
import {HomeComponent} from './components/pages/home/home.component';
import {LoginComponent} from './components/pages/login/login.component';
import {SearchComponent} from './components/pages/search/search.component';
import {IndexComponent} from './components/pages/index/index.component';


const routes: Routes = [
  {path:'player/yt',component: YtComponent},
  {path:'player/local', component: LocalComponent},
  {path:'lyrics/sync', component: SyncComponent},
  {path: 'watchfun', component: WatchfunComponent},
  {path: 'my-funsync', component: MyFunsyncComponent},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
