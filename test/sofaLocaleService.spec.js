'use strict';

describe('sofa.localeService', function () {

    var localeService;

    beforeEach(module('sofa.localeService'));

    beforeEach(inject(function (_localeService_) {
        localeService = _localeService_;
        localeService.setTranslationData({
            tl1: 'hello',
            tl2: 'you',
            nested: {
                tl3: 'there'
            }
        });
    }));

    it('should run tests', function () {
        expect(localeService).toBeDefined();
    });

    it('should set translation data', function () {
        expect(localeService.getTranslation('tl1')).toEqual('hello');
    });

    it('should resolve nested translation object', function () {
        expect(localeService.getTranslation('nested.tl3')).toEqual('there');
    });

    it('should throw an error when a non existing translation is requested', function () {
        expect(function () {
            localeService.getTranslation('doesntExist');
        }).toThrow(new Error('No translation found for: "doesntExist"'));
    });
});
