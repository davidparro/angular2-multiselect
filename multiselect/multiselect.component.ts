import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit  {
    @Input('values') values;
    @Input('customLabel') customLabel;
    @Input('height') height;
    @Input('backgroundSelected') backgroundSelected;
    @Input('backgroundRemoved') backgroundRemoved;
    @Input('colorSelected') colorSelected;
    @Input('colorRemoved') colorRemoved;
    @ViewChild('listGroup') listGroup: ElementRef;
    @ViewChild('inputSelect') inputSelect: ElementRef;
    @ViewChild('selectBackdrop') selectBackdrop: ElementRef;
    @Output() sendValues = new EventEmitter();
    label;
    valuesSelected = [];
    constructor() {
    }

    ngOnInit() {
        console.log(this.values);
        this.valuesSelected.length = 0;
        if (this.customLabel) {
            this.label = this.customLabel;
        } else {
            this.label = 'Año rehabilitación';
        }
        this.listGroup.nativeElement.style.width = this.inputSelect.nativeElement.offsetWidth + 'px';
        if (this.height) {
            this.listGroup.nativeElement.style.height = this.height;
        } else {
            this.listGroup.nativeElement.style.height = '200px';
        }
    }

    toggleShow() {
        console.log('clicked');
        this.listGroup.nativeElement.classList.toggle('hide');
        this.selectBackdrop.nativeElement.classList.toggle('hide');
    }

    selectValue(value) {
        if (this.valuesSelected.find(valueSelected => value === valueSelected)) {
            const index = this.valuesSelected.indexOf(value);
            this.valuesSelected.splice(index, 1);
            if (this.backgroundRemoved) {
                document.getElementById(value).style.background = this.backgroundRemoved;
            } else {
                document.getElementById(value).style.background = 'transparent';
            }
            if (this.colorRemoved) {
                document.getElementById(value).style.color = this.colorRemoved;
            } else {
                document.getElementById(value).style.color = 'inherit';
            }
        } else {
            if (this.backgroundSelected) {
                document.getElementById(value).style.background = this.backgroundSelected;
            } else {
                document.getElementById(value).style.background = 'rgb(183, 255, 115)';
            }
            if (this.colorSelected) {
                document.getElementById(value).style.color = this.colorSelected;
            } else {
                document.getElementById(value).style.color = 'inherit';
            }
            this.valuesSelected.push(value);
        }
        this.sendValues.emit(this.valuesSelected);
    }

    checkValue(value) {
        if (this.valuesSelected.find(valueSelected => value === valueSelected)) {
            return true;
        } else {
            return false;
        }
    }
}
