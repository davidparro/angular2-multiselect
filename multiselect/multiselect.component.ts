import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit  {
    @Input('values') values;
    @Input('customLabel') customLabel = 'Select values';
    @Input('customMaxLabel') customMaxLabel = 'items selected';
    @Input('width') width;
    @Input('height') height = '200px';
    @Input('backgroundSelected') backgroundSelected = 'rgb(183, 255, 115)';
    @Input('backgroundRemoved') backgroundRemoved = 'white';
    @Input('colorSelected') colorSelected = 'inherit';
    @Input('colorRemoved') colorRemoved = 'inherit';
    @Input('maxLabelItems') maxLabelItems = 1;
    @ViewChild('listGroup') listGroup: ElementRef;
    @ViewChild('inputSelect') inputSelect: ElementRef;
    @ViewChild('selectBackdrop') selectBackdrop: ElementRef;
    @Output() sendValues = new EventEmitter();
    label;
    valuesSelected = [];
    constructor() {
    }

    ngOnInit() {
        this.valuesSelected.length = 0;
        this.label = this.customLabel;
        if (this.width) {
            this.listGroup.nativeElement.style.width = this.width;
        } else {
            this.listGroup.nativeElement.style.width = this.inputSelect.nativeElement.offsetWidth + 'px';
        }
        this.listGroup.nativeElement.style.height = this.height;
    }

    toggleShow() {
        this.listGroup.nativeElement.classList.toggle('hide');
        this.selectBackdrop.nativeElement.classList.toggle('hide');
    }

    selectValue(value) {
        if (this.valuesSelected.find(valueSelected => value === valueSelected)) {
            const index = this.valuesSelected.indexOf(value);
            this.valuesSelected.splice(index, 1);
            document.getElementById(value).style.background = this.backgroundRemoved;
            document.getElementById(value).style.color = this.colorRemoved;
        } else {
            document.getElementById(value).style.background = this.backgroundSelected;
            document.getElementById(value).style.color = this.colorSelected;
            this.valuesSelected.push(value);
        }
        if (this.valuesSelected.length > 0) {
            this.label = '';
            this.valuesSelected.forEach((element, index) => {
                if (this.valuesSelected.length <= this.maxLabelItems) {
                    if (index === 0) {
                        this.label += element;
                    } else {
                        this.label += ', ' + element;
                    }
                } else {
                    this.label = (index + 1) + ' ' + this.customMaxLabel;
                }
            });
        } else {
            this.label = this.customLabel;
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
