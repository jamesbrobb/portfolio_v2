import {WORD_SENSE_TYPE} from './word-sense-type.enum';


export interface WordSenseDS {
    id: string;
    constituentId: string;
    headForm: string;
    definition: string;
    type: WORD_SENSE_TYPE;
}
