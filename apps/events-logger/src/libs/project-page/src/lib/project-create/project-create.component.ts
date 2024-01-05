import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsService } from '@services';

@Component({
    selector: 'hands-on-project-create',
    templateUrl: './project-create.component.html',
    styleUrl: './project-create.component.css',
})
export class ProjectCreateComponent implements OnInit {
    createProjectForm!: FormGroup;
    hide = true;
    isLoading = false;
    error: string = '';

    constructor(
        private router: Router,
        private projectsService: ProjectsService
    ) {}

    ngOnInit(): void {
        this.createProjectForm = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            address: new FormGroup(
                {
                    street: new FormControl(null, [Validators.required]),
                    city: new FormControl(null, [Validators.required]),
                    state: new FormControl(null, [Validators.required]),
                    zipcode: new FormControl(null, [Validators.required]),
                    country: new FormControl(null, [Validators.required]),
                },
                [Validators.required]
            ),
        });
    }

    onCancel() {
        this.router.navigate(['/projects'], {});
    }

    getErrorMessage() {
        return 'You must enter a value';
    }

    onSubmit() {
        if (this.createProjectForm.invalid) {
            return;
        }
        this.projectsService.createAndStoreProjects(
            this.createProjectForm.value['name'],
            this.createProjectForm.value['address']
        );

        this.createProjectForm.reset();
        this.router.navigate(['/projects'], {});
    }
}
