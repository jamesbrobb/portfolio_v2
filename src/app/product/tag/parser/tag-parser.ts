import {TagDTO} from '../tag.dto';
import {TagDS} from '../tag.ds';



export class TagParser {

    private _familyLabels: {[key: string]: string} = {};

    public setFamilyLabels(arg: {[key: string]: string}): void {
        this._familyLabels = arg;
    }

    public fromDTOToDS(dto: TagDTO): TagDS {

        const familyLabel: string = this._familyLabels && this._familyLabels[dto.family] ? this._familyLabels[dto.family] : dto.family;

        return {
            id: dto.id,
            label: dto.label,
            family: dto.family,
            familyLabel: familyLabel
        };
    }

    public fromDTOArrayToDSArray(dto: TagDTO[]): TagDS[] {
        const result = dto.map((item: TagDTO) => this.fromDTOToDS(item));
        return result;
    }
}
