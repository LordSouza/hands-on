import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '@models';
import { EntryService, ProjectsService } from '@services';

@Component({
    selector: 'hands-on-create-entry',
    templateUrl: './create-entry.component.html',
    styleUrl: './create-entry.component.css',
})
export class CreateEntryComponent implements OnInit {
    uploadedFiles = [];
    @Input() isOpen: boolean = false;
    @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>(
        false
    );
    formEntry: FormGroup;
    projectsNames: Project[] = [];
    files: File | null = null;

    constructor(
        private projectServise: ProjectsService,
        private entryService: EntryService
    ) {
        this.formEntry = new FormGroup({
            selectedProject: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            files: new FormControl(this.files, [Validators.required]),
        });
    }

    ngOnInit() {
        this.projectServise.fetchAllProjects().subscribe((projects) => {
            for (const project of projects) {
                if (this.checkProjects(this.projectsNames, project.project)) {
                    this.projectsNames.push(project.project);
                }
            }
        });
    }
    checkProjects(projectArray: Project[], project: Project) {
        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === project.id) {
                return false;
            }
        }
        return true;
    }
    onUpload($event: Event) {
        const file = ($event.target as HTMLInputElement).files![0];
        this.formEntry.value['files'] = file;
    }
    createEntry() {
        this.entryService.postEntry(
            this.formEntry.value['selectedProject'],
            this.formEntry.value['description'],
            this.formEntry.value['files']
        );
    }
    close() {
        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
    }
}
