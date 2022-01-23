export interface LessonPlanOrigin {
    id: string;
    revision: string;
}

export interface Tag {
    id: string;
    label: string;
    description: string;
    family: string;
    locale: string;
    attributes: any;
}

export interface Skill extends Tag {}
export interface CEFRStage extends Tag {}

export interface LessonPlan {
    id?: string;

    revision?: string;
    state?: string;
    productionStage?: string;
    origin?: LessonPlanOrigin;

    metadata?: any;
    searchable?: boolean;

    title?: string;
    topic?: string;
    skill?: Skill[];
    CEFRStages?: CEFRStage[];
    lessonObjectives?: string;
    thumbnailAssetId?: any;
    recommendedStudyEnvironment?: string[];
    playlistItems?: any[];
    BUAttributes?: any;
}
