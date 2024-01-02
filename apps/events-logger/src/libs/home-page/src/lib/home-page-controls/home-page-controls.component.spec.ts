import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageControlsComponent } from './home-page-controls.component';

describe('HomePageControlsComponent', () => {
    let component: HomePageControlsComponent;
    let fixture: ComponentFixture<HomePageControlsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomePageControlsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HomePageControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
