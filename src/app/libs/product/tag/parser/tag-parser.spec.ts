
import { TagParser } from './tag-parser';
import {TagDTO} from '../tag.dto';
import {tagDTOMock} from "../index.mock";

const TAG_FAMILY_LABELS: {[index:string]: string} = {
    'Study Environment': 'Study environment',
    'Lesson Type': 'Skill',
    'CEFR Stage': 'CEFR stage'
};



describe('TagParser', () => {

    const parser = new TagParser();
    let mock: {dto:TagDTO};

    beforeEach(() => {

        mock = {
            dto: Object.assign({}, tagDTOMock) as TagDTO
        };

        parser.setFamilyLabels(TAG_FAMILY_LABELS);
    });

    describe('setFamilyLabels', () => {

        describe('GIVEN a TagDTO with a family that is defined in TAG_FAMILY_LABELS', () => {

            it('returns a TagDS with the tag family label set', () => {
                expect(parser.fromDTOToDS(mock.dto).familyLabel).toEqual(TAG_FAMILY_LABELS[mock.dto.family]);
            });
        });

        describe('GIVEN a TagDTO with a family that is not defined in TAG_FAMILY_LABELS', () => {

            it('returns a TagDS with the tag family label set to the tag family', () => {
                mock.dto.family = 'test';
                expect(parser.fromDTOToDS(mock.dto).familyLabel).toEqual(mock.dto.family);
            });
        });
    });

    describe('fromDTOToDS', () => {

        describe('GIVEN a TagDTO', () => {

            it('returns a valid tagDS', () => {
                expect(parser.fromDTOToDS(mock.dto)).toEqual({
                    id: mock.dto.id,
                    label: mock.dto.label,
                    family: mock.dto.family,
                    familyLabel: TAG_FAMILY_LABELS[mock.dto.family]
                });
            });

        });
    });

    describe('fromDTOArrayToDSArray', () => {

        describe('GIVEN a TagDTO array', () => {

            it('returns an array of valid tagDS', () => {

                const input = [mock.dto, mock.dto];

                const result = input.map((arg: TagDTO) => ({
                    id: arg.id,
                    label: arg.label,
                    family: arg.family,
                    familyLabel: TAG_FAMILY_LABELS[arg.family]
                }));

                expect(parser.fromDTOArrayToDSArray(input)).toEqual(result);
            });
        });
    });
});

