import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import {MatMenu} from "@angular/material/menu";

import {LessonPlanSummaryDs} from "../../../../product";
import {DateUtils} from "../../../../core";



@Component({
    selector: 'my-library-lesson-plan-card',
    templateUrl: './my-library-lesson-plan-card.component.html',
    styleUrls: ['./my-library-lesson-plan-card.component.scss']
})
export class MyLibraryLessonPlanCardComponent implements OnChanges {

    @Input() dataProvider: LessonPlanSummaryDs | undefined;
    @Input() menu: MatMenu | undefined;

    public id: string | undefined;
    public title: string | undefined;
    public description: string | undefined;
    public backgroundImageUrl: string | undefined;
    public skills: string[] | undefined;
    public cefr: string | undefined;
    public modifiedDate: string | undefined;

    public ngOnChanges(changes: SimpleChanges): void {

        if (!this.dataProvider) {
            return;
        }

        this.id = this.dataProvider.id;
        this.title = this.dataProvider.title;
        this.description = this.dataProvider.description;
        this.backgroundImageUrl = this.dataProvider.thumbnailAssetPath;
        this.skills = this.dataProvider.skills;
        this.cefr = this.dataProvider.cefr.join(', ');
        this.modifiedDate = DateUtils.getAbbreviatedFormat(this.dataProvider.modified);
    }

    public onOptionsClick(event: MouseEvent): void {
        event.stopImmediatePropagation();
    }
}
