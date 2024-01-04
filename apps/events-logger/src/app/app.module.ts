import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MasterPageModule } from '@hands-on/master-page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@hands-on/service/auth';
import { EntryService, ProjectsService } from '@services';
import { AuthInterceptor } from '@hands-on/service/interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        BrowserAnimationsModule,
        MasterPageModule,
    ],
    providers: [
        AuthService,
        EntryService,
        ProjectsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
