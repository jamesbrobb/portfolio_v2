import {MISSING_OBJECT_PROP_ERROR_MESSAGE, ObjectUtils} from './object-utils';


describe('ObjectUtils', () => {

    let objectUtils: ObjectUtils,
        mock: any;

    beforeEach(() => {
        objectUtils = new ObjectUtils();

        mock = Object.assign({}, {
            foo: 'bar',
            bar: {
                baz: [{
                    one: 'two'
                }]
            }
        });
    });

    describe('.clone', () => {

        let clone: any;

        beforeEach(() => {

            clone = ObjectUtils.clone(mock);

            mock.bar.baz[0].one = 'three';
            mock['baz'] = 'foo';
        });

        it('returns a deep copy of the object', () => {
            expect(clone.bar.baz[0].one).toBe('two');
            expect(clone.baz).not.toBeDefined();
        });
    });

    describe('.recursivelyFindProperty', () => {

        it('should error if the property does not exist on the supplied target', () => {

            const targetPropOne = 'baz.baz.two',
                targetPropTwo = 'bar.baz.two';

            expect(() => ObjectUtils.recursivelyFindProperty(targetPropOne, mock))
                .toThrowError(MISSING_OBJECT_PROP_ERROR_MESSAGE(targetPropOne, 'baz'));

            expect(() => ObjectUtils.recursivelyFindProperty(targetPropTwo, mock))
                .toThrowError(MISSING_OBJECT_PROP_ERROR_MESSAGE(targetPropTwo, 'two'));
        });
    });

    describe('.isPropertyChainDefined( object: any, chain:string )', () => {

        const obj = {
            foo: {
                bar: {
                    baz: 'foo'
                }
            }
        },
        validPath = 'foo.bar.baz',
        invalidPath = 'foo.x.y';

        describe('Given an object with nested properties', () => {

            describe('and a valid path through them', () => {

                it('returns true', () => {
                    expect(ObjectUtils.isPropertyChainDefined(obj, validPath)).toBeTruthy();
                });
            });

            describe('and an invalid path through them', () => {

                it('returns false', () => {
                    expect(ObjectUtils.isPropertyChainDefined(obj, invalidPath)).toBeFalsy();
                });
            });
        });

    });

    describe('.IsEmpty', () => {

        it('should return true if the object has no properties', () => {
            expect(ObjectUtils.isEmpty({})).toBe(true);
        });

        it('should return false if the object has properties', () => {
            expect(ObjectUtils.isEmpty({test: 'test'})).toBe(false);
        });
    });
});
