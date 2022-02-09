

export interface LessonPlanSummaryDto {

  id: string;
  title: string;
  description: string;
  course: {
    id: string;
    title: string;
    revision: string;
  };
  thumbnailAssetPath: string;
  skills: string[];
  cefr: string[];
  unit: {
    id: string;
    title: string;
    revision: string;
  };
  created: string;
  modified: string;
  isPublished: boolean;
}
