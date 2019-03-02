import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TeamComponent } from './team/team.component';
import { StoryComponent } from './story/story.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'story', component: StoryComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    TeamComponent,
    StoryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
