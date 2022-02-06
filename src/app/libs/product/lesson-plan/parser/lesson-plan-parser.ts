import {ObjectUtils} from "../../../core";

import { LessonPlanDTO } from '../lesson-plan.dto';
import { LessonPlanDS } from '../lesson-plan.ds';
import { TagParser } from '../../tag';
import { WordSenseParser } from '../../word-sense';
import { AssetService, ASSET_TYPE } from '../../asset';



export class LessonPlanParser {

    private _assetService: AssetService;
    private _tagParser: TagParser;

    constructor(assetService: AssetService, tagParser: TagParser) {
        this._assetService = assetService;
        this._tagParser = tagParser;
    }

    public fromDTOToDS(dto: LessonPlanDTO): LessonPlanDS {

        const duration = this._getDurationFromItems(dto.playlistItems);

        return {
            id: dto.id,
            topic: dto.topic,
            title: dto.title,
            description: dto.description,
            skills: dto.skill ? this._tagParser.fromDTOArrayToDSArray(dto.skill) : [],
            CEFRStages: dto.CEFRStages ? this._tagParser.fromDTOArrayToDSArray(dto.CEFRStages) : [],
            recommendedStudyEnvironment: dto.recommendedStudyEnvironment ?
              this._tagParser.fromDTOArrayToDSArray(dto.recommendedStudyEnvironment) :
                [],
            objectives: dto.lessonObjectives,
            duration: duration,
            isPublished: dto.productionStage === 'published',
            isPublishedByUser: !!dto.metadata.actions.published.userId,
            userId: dto.metadata.actions.published.userId || dto.metadata.actions.created.userId,
            course: (ObjectUtils.isPropertyChainDefined(dto, 'metadata.actions.published.course')) ?
                {
                    id: dto.metadata.actions.published.course.id,
                    title: dto.metadata.actions.published.course.title
                } :
                undefined,

            unit: (ObjectUtils.isPropertyChainDefined(dto, 'metadata.actions.published.unit')) ?
                {
                    id: dto.metadata.actions.published.unit.id,
                    title: dto.metadata.actions.published.unit.title,
                    order: dto.metadata.actions.published.unit.order
                } :
                undefined,

            thumbnailAssetPath: this._getThumbnailPath(dto),

            coveredRequirements: (ObjectUtils.isPropertyChainDefined(dto, 'BUAttributes.CTX.coveredRegionalRequirements')) ?
                dto.BUAttributes.CTX.coveredRegionalRequirements :
                undefined,

            vocabulary: dto.vocabulary ? WordSenseParser.fromDTOArrayToDSArray(dto.vocabulary) : []
        };
    }

    public fromDTOArrayToDSArray(dtos: LessonPlanDTO[]): LessonPlanDS[] {

        const result = dtos.map((dto: LessonPlanDTO) => this.fromDTOToDS(dto));
        return result;
    }

    private _getDurationFromItems(items: any[] | undefined): number {

        if (!items || !items.length) {
            return 0;
        }

        return items.map( item => item.suggestedDuration )
            .reduce( (a, b) => a + b, 0 );
    }

    private _getThumbnailPath(dto: LessonPlanDTO): string | undefined {

        let thumbnailAssetId: string | undefined;

        if (typeof dto.thumbnailAssetId === 'string') {
            thumbnailAssetId = dto.thumbnailAssetId;
        }

        if (ObjectUtils.isPropertyChainDefined(dto, 'thumbnailAssetId.id')) {
            thumbnailAssetId = dto.thumbnailAssetId.id;
        }

        if (thumbnailAssetId) {
            return this._assetService.getUrlFromId(ASSET_TYPE.IMAGE, thumbnailAssetId);
        }

        return;
    }
}



