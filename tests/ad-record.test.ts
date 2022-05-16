import {AdRecord} from "../records/ad.records";

const defaultObj = {
    name: 'test name',
    description: 'asdasd',
    url: 'https://megak.pl',
    price: 0,
    lat: 9,
    lon: 9
}

test('Can build adRecord', () => {
    const ad = new AdRecord(defaultObj)

    expect(ad.name).toBe('test name');
    expect(ad.description).toBe('asdasd');
})

test('Validates invalid price', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        price: -3
    })).toThrow('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999');
})