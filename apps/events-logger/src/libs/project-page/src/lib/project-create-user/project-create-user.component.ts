import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsUserService } from '@services';

@Component({
    selector: 'hands-on-project-create-user',
    templateUrl: './project-create-user.component.html',
    styleUrl: './project-create-user.component.css',
})
export class ProjectCreateUserComponent implements OnInit {
    @Input() projectId: string;
    @Input() firstname: string;
    @Input() lastname: string;
    @Input() username: string;
    @Input() email: string;
    @Input() role: string;
    @Input() photo: File;

    @HostListener('change', ['$event.target.files']) emitFiles(
        event: FileList
    ) {
        const file = event && event.item(0);
        this.photo = file!;
    }

    createUserForm!: FormGroup;
    isLoading = false;
    error: string = '';
    roles = ['worker', 'manager'];

    constructor(
        private projectsUserService: ProjectsUserService,
        private router: Router
    ) {
        this.projectId = '';
        this.firstname = '';
        this.lastname = '';
        this.username = '';
        this.email = '';
        this.role = 'worker';
        this.photo = new File([], '');
    }

    ngOnInit(): void {
        this.createUserForm = new FormGroup({
            projectId: new FormControl(this.projectId, [Validators.required]),
            firstname: new FormControl(this.firstname, [Validators.required]),
            lastname: new FormControl(this.lastname, [Validators.required]),
            username: new FormControl(this.username),
            email: new FormControl(this.email, [
                Validators.required,
                Validators.email,
            ]),
            role: new FormControl(this.role, [Validators.required]),
            photo: new FormControl(this.photo),
        });
    }

    onPhotoPicked(event: Event) {
        const file = (event.target as HTMLInputElement).files![0]; // Here we use only the first file (single file)
        this.createUserForm.patchValue({ photo: file });
    }

    getErrorMessage() {
        if (this.createUserForm.controls['email'].hasError('required')) {
            return 'You must enter a value';
        }

        return this.createUserForm.controls['email'].hasError('email')
            ? 'Not a valid email'
            : '';
    }

    onSubmit() {
        if (this.createUserForm.invalid) {
            return;
        }
        const email = this.createUserForm.value.email; // done
        const firstname = this.createUserForm.value.firstname; // done
        const lastname = this.createUserForm.value.lastname; // done
        const username = this.createUserForm.value.username; // done
        const role = this.createUserForm.value.role; // done
        const photo = this.createUserForm.value.photo;
        const projectId = this.createUserForm.value.projectId; // done

        console.log(photo);

        this.projectsUserService.createUser(
            firstname,
            lastname,
            username,
            email,
            role,
            photo,
            projectId
        );
    }

    onCancel() {
        this.router.navigate(['/'], {});
    }
}
