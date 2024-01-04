import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCreateUserComponent } from './project-create-user.component';

describe('ProjectCreateUserComponent', () => {
    let component: ProjectCreateUserComponent;
    let fixture: ComponentFixture<ProjectCreateUserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProjectCreateUserComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectCreateUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
