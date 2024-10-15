import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveLeadingZeroDirective } from '../directives/directives';

@NgModule({
    declarations: [
        RemoveLeadingZeroDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RemoveLeadingZeroDirective
    ]
})
export class SharedModule { }
