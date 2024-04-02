import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    NbCardModule,
    NbInputModule,
    NbSpinnerModule,
    NbButtonModule,
    NbSelectModule,
    NbDialogRef
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryType, FinanceFacade } from '../../../modules/finance/public-api';

@Component({
    selector: 'app-add-category-modal',
    standalone: true,
    imports: [
        NbCardModule,
        AsyncPipe,
        NbInputModule,
        TranslateModule,
        NbSpinnerModule,
        NbButtonModule,
        ReactiveFormsModule,
        NbSelectModule
    ],
    templateUrl: './add-category-modal.component.html',
    styleUrl: './add-category-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryModalComponent implements OnInit {
    public readonly state$ = this.financeFacade.financeTransactions.loadState$;
    public readonly categoryTypes = Object.keys(CategoryType);
    public readonly form = new FormGroup({
        name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        color: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        type: new FormControl<CategoryType>(CategoryType.EXPENSE, { nonNullable: true }),
        id: new FormControl<string>('', { nonNullable: true })
    });
    public type: CategoryType = CategoryType.EXPENSE;

    constructor(
        @Optional() private dialogRef: NbDialogRef<string>,
        private readonly financeFacade: FinanceFacade
    ) {}

    public ngOnInit(): void {
        this.form.controls.type.setValue(this.type);
    }

    public close(): void {
        this.dialogRef.close();
    }

    public save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.financeFacade.addFinanceCategory({
            ...this.form.getRawValue(),
            createdAt: new Date()
        });

        this.dialogRef.close();
    }
}
