import {WordSenseDTO} from '../word-sense.dto';
import {WordSenseDS} from '../word-sense.ds';



export class WordSenseParser {

    public static fromDTOtoDS(dto: WordSenseDTO): WordSenseDS {

        return {
            id: dto.id,
            constituentId: dto.constituentId,
            headForm: dto.headForm,
            definition: dto.definition,
            type: dto.partOfSpeech
        };
    }

    public static fromDTOArrayToDSArray(dto: WordSenseDTO[]): WordSenseDS[] {
        const result = dto.map((arg: WordSenseDTO) => this.fromDTOtoDS(arg));
        return result;
    }
}
