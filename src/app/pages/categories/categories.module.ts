import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CATEGORIES_ROUTES } from './categories.routes';
import { PieChartComponent } from '../../standalones/pie-chart/pie-chart.component';
import { CategoriesComponent } from './categories.component';

@NgModule({
    declarations: [CategoriesComponent],
    imports: [RouterModule.forChild(CATEGORIES_ROUTES), PieChartComponent]
})
export class CategoriesModule {}
