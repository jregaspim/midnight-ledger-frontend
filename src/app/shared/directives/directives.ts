import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appRemoveLeadingZero]'
})
export class RemoveLeadingZeroDirective {
    constructor(private el: ElementRef, private control: NgControl) { }

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        let value = input.value;

        // Remove leading zeros if there are any
        if (value.length > 1 && value.startsWith('0')) {
            value = value.replace(/^0+/, '');
            this.control.control?.setValue(value);
        }
    }
}
