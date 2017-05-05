import EventEmitter from '../src/lib/eventemitter';

describe('EventEmitter lib test', () => {
    let ee = null;
    it('EventEmitter constructor ...ok', () => {
        ee = new EventEmitter();
        expect(ee.events).toEqual({});
    });

    it('EventEmitter on/emit ...ok', (done) => {
        let eventName = 'customType';
        let dataObj = { key: 'key', value: 'value' };
        let emitTime = 0;
        let beEmitTime = 0;

        ee = new EventEmitter();

        ee.on(eventName, (data) => {
            expect(data.key).toBe(dataObj.key);
            beEmitTime++;
            expect(emitTime).toBe(beEmitTime);
            if (emitTime == 2) {
                done();
            }
        });

        emitTime++;
        ee.emit(eventName, dataObj);
        emitTime++;
        ee.emit(eventName, dataObj);
    });

    it('EventEmitter off a listener ...ok', () => {
        let eventName = 'customType';
        let dataObj = { key: 'key', value: 'value' };

        ee = new EventEmitter();

        let customLis = (data) => {
            // console.log(data);
        }

        ee.on(eventName, customLis);
        expect(ee.events[ eventName ].length).toBe(1);
        ee.emit(eventName, dataObj);
        ee.off(eventName, customLis);
        expect(ee.events[ eventName ].length).toBe(0);
        ee.emit(eventName, { nodata: 'nodata' });
    });

    it('EventEmitter off listeners ...ok', () => {
        let eventName = 'customType';
        let dataObj = { key: 'key', value: 'value' };

        ee = new EventEmitter();

        let customLis = (data) => {
            // console.log('listener 1');
            // console.log(data);
        };
        let customLis2 = (data) => {
            // console.log('listener 2');
        };

        ee.on(eventName, customLis);
        ee.on(eventName, customLis2);
        expect(ee.events[ eventName ].length).toBe(2);
        ee.emit(eventName, dataObj);
        ee.off(eventName);
        expect(ee.events[ eventName ]).toBe(undefined);
        ee.emit(eventName, { nodata: 'nodata' });
    });

    it('EventEmitter off all ...ok', () => {
        let eventName = 'customType';
        let eventName2 = 'customType2';
        let dataObj = { key: 'key', value: 'value' };

        ee = new EventEmitter();

        let customLis = (data) => {
            // console.log('listener 1');
            // console.log(data);
        };

        let customLis2 = (data) => {
            // console.log('listener 2');
        }

        ee.on(eventName, customLis);
        ee.on(eventName2, customLis2);
        expect(ee.events[ eventName ].length).toBe(1);
        expect(ee.events[ eventName2 ].length).toBe(1);
        ee.off();
        expect(ee.events[ eventName ]).toBe(undefined);
        expect(ee.events).toEqual({});
    });

    it('EventEmitter once ...ok', () => {
        let eventName = 'customType';
        let dataObj = { key: 'key', value: 'value' };

        ee = new EventEmitter();

        let customLis = (data) => {
            // console.log(data);
        };

        ee.once(eventName, customLis);
        expect(ee.events[ eventName ].length).toBe(1);
        ee.emit(eventName, dataObj);
        expect(ee.events[ eventName ].length).toBe(0);
        ee.emit(eventName, { nodata: 'nodata' });
    });

    // it('EventEmitter _hasEvent on ...ok', (done) => {
    //     let eventName = 'customType';
    //     let dataObj = { key: 'key', value: 'value' };
    //     let emitTime = 0;
    //
    //     ee = new EventEmitter();
    //     ee.duplicateFree = true;
    //     let customLis = (data) => {
    //         emitTime++;
    //         console.log('_hasEvent');
    //         console.log(emitTime);
    //         expect(emitTime).toBe(1);
    //         done();
    //     }
    //
    //     ee.on(eventName, customLis);
    //     ee.on(eventName, customLis);
    //     expect(ee.events[eventName].length).toBe(1);
    //     ee.emit(eventName, dataObj);
    // });

    // it('EventEmitter _hasEvent once ...ok', (done) => {
    //     let eventName = 'customType';
    //     let dataObj = { key: 'key', value: 'value' };
    //     let emitTime = 0;
    //
    //     ee = new EventEmitter();
    //     ee.duplicateFree = true;
    //     let customLis = (data) => {
    //         emitTime++;
    //         console.log('_hasEvent once');
    //         console.log(emitTime);
    //         expect(emitTime).toBe(1);
    //         done();
    //     }
    //
    //     ee.once(eventName, customLis);
    //     ee.once(eventName, customLis);
    //     expect(ee.events[eventName].length).toBe(1);
    //     ee.emit(eventName, dataObj);
    // });
});