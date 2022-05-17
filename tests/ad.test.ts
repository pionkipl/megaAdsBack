import {AdRecord} from "../records/ad.records";

test('Adrecord returns data from db for one entry', async () => {
    const ad = await AdRecord.getOne('abc');

    console.log(ad);

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('testowe')
})

test('AdRecord returns null from db for unexisting entry', async () => {
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
})