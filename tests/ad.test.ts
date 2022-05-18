import {AdRecord} from "../records/ad.records";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://megak.pl',
    price: 0,
    lat: 9,
    lon: 9,
};

afterAll(async () => {
    await pool.end();
})

test('Adrecord returns data from db for one entry', async () => {
    const ad = await AdRecord.getOne('abc');

    console.log(ad);

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('testowe')
})

test('AdRecord.getOne returns null from db for unexisting entry', async () => {
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
})

test('AdRecord.findAll returns array of found entries.', async () => {
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})

test('AdRecord.findAll returns array of found entries when searching for "e".', async () => {
    const ads = await AdRecord.findAll('e');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})

test('AdRecord.findAll returns empty array when searching for sth that does not exist.', async () => {
    const ads = await AdRecord.findAll('-----------------------------------------');

    expect(ads).toEqual([]);
})

test('AdRecord.findAll returns smaller amount of data.', async () => {
    const ads = await AdRecord.findAll('');

    // żeby poczitować to można dać as AdEntity, żeby miało typ w którym są wszystkie wartości
    expect((ads[0] as AdEntity).price).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
})

test('AdRecord.inserts returns new  UUID.', async () => {
    const ad = new AdRecord(defaultObj);

    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
})

test('AdRecord.inserts inserts data to DB.', async () => {
    const ad = new AdRecord(defaultObj);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
})