import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectAddUserComponent } from './project-add-user.component';

describe('ProjectAddUserComponent', () => {
    let component: ProjectAddUserComponent;
    let fixture: ComponentFixture<ProjectAddUserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProjectAddUserComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectAddUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
