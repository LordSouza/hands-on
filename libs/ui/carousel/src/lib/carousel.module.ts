import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';

import { MatIconModule } from '@angular/material/icon';
@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [CarouselComponent],
    exports: [CarouselComponent],
})
export class CarouselModule {}
