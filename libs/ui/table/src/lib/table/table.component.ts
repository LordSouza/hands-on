import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
    selector: 'hands-on-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
})
export class TableComponent<T> implements OnInit, AfterViewInit, OnChanges {
    @Input() type: T;
    @Input() columns: Columns<T>[];
    @Input() dataSource: MatTableDataSource<T>;
    @Input() route: string;
    @Output() selectedRow = new EventEmitter<T>();
    clickedRow: T = {} as T;

    displayedColumns: string[];
    resultsLength = 0;
    isLoadingResults = true;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private router: Router) {
        this.columns = [];
        this.dataSource = new MatTableDataSource<T>();
        this.route = '';
        this.type = {} as T;
        this.displayedColumns = [];
    }

    onRedirections(arg0: string) {
        this.router.navigateByUrl(`${this.route}/${arg0}`);
    }

    ngOnInit(): void {
        this.displayedColumns = this.columns.map((c) => c.columnDef);
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['dataSource']) {
            this.dataSource.paginator = this.paginator;
        }
    }

    onSelectRow() {
        this.selectedRow.emit(this.clickedRow);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}

interface Columns<T> {
    columnDef: string;
    header: string;
    cell: (element: T) => string;
}
