import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import { MyLibraryLessonPlanCardComponent } from './my-library-lesson-plan-card.component';
import {LessonPlanSummaryDto} from "../../../../product";
import {lessonPlanSummaryDTOMock} from "../../../../product/index.mock";
import {ImageComponent} from "../../../media/image/image/image.component";
import {FallbackImageComponent} from "../../../media/image/fallback/fallback-image.component";



describe('MyLibraryLessonPlanCardComponent', () => {

    let component: MyLibraryLessonPlanCardComponent,
        fixture: ComponentFixture<MyLibraryLessonPlanCardComponent>,
        mock: LessonPlanSummaryDto,
        titleElement: HTMLElement,
        tagElements: DebugElement[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [

            ],
            declarations: [
                FallbackImageComponent,
                ImageComponent,
                MyLibraryLessonPlanCardComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        mock = <any>lessonPlanSummaryDTOMock;

        fixture = TestBed.createComponent(MyLibraryLessonPlanCardComponent);

        component = fixture.componentInstance;
        component.dataProvider = mock;
        component.ngOnChanges({});

        fixture.detectChanges();

        titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
        tagElements = fixture.debugElement.queryAll(By.css('.tag'));
    });

    it('should render the component', () => {
        expect(component).toBeDefined();
    });

    it('should display skills', () => {

        expect(
            mock.skills.map((skill: string) => skill.trim())
                .every((skill: string) => {
                        return tagElements.some((skillElement: DebugElement) => {
                            return skillElement.nativeElement.textContent.trim() === skill;
                        });
                    }
                )).toEqual(true);
    });

    it('should display title', () => {
        expect(titleElement.textContent).toEqual(mock.title);
    });
});

