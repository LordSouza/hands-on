import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectElementComponent } from './project-element.component';

describe('ProjectElementComponent', () => {
    let component: ProjectElementComponent;
    let fixture: ComponentFixture<ProjectElementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProjectElementComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectElementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
