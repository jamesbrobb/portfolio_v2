import {WordSenseParser} from './word-sense-parser';
import {WordSenseDTO} from '../word-sense.dto';
import {WordSenseDS} from '../word-sense.ds';
import {wordSenseDTOMock, wordSenseDSMock} from "../index.mock";



interface MOCK {
    dto: WordSenseDTO;
    ds: WordSenseDS;
}

describe('WordSenseParser', () => {

    let parser: typeof WordSenseParser,
        mock: MOCK;

    beforeEach(() => {
        parser = WordSenseParser;
        mock = {
            dto: <any>wordSenseDTOMock,
            ds: <any>wordSenseDSMock
        };
    });

    describe('fromDTOToDS', () => {

        describe('GIVEN a WordSenseDTO', () => {

            it('returns a valid WordSenseDS', () => {
                expect(parser.fromDTOtoDS(mock.dto)).toEqual(mock.ds);
            });
        });
    });

    describe('fromDTOArrayToDSArray', () => {

        describe('GIVEN a WordSenseDTO Array', () => {

            it('returns a valid WordSenseDS Array', () => {
                expect(parser.fromDTOArrayToDSArray([mock.dto, mock.dto])).toEqual([mock.ds, mock.ds]);
            });
        });
    });
});
