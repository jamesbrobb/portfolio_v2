import {WORD_SENSE_TYPE} from './word-sense-type.enum';


export interface WordSenseDTO {
    id: string;
    constituentId: string;
    headForm: string;
    definition: string;
    partOfSpeech: WORD_SENSE_TYPE;
}
