import {InMemoryDbService } from 'angular-in-memory-web-api';
import { Code } from './code';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        // const codes: Code[] = [
        //     new Code(
        //         1,
        //         'Jimmy Losttot',
        //         14,
        //         'M',
        //         'n/a',
        //         null,
        //         '4\', looks very lost',
        //         'green tee, jeans',
        //         'pendulum atrium',
        //         1526920054000,
        //         null,
        //         false
        //     ),
        //     new Code(
        //         2,
        //         'Susie Somewhere',
        //         11,
        //         'F',
        //         'Strawberry Shortcake',
        //         'https://i.pinimg.com/originals/03/a0/c9/03a0c9a5f4c095db45d2bb935132b3cf.png',
        //         '3\'6\", red hair (wig), light-skinned',
        //         'pink dress, stockings, white shirt, pink strawberry hat',
        //         'artist\'s alley',
        //         1526920058000,
        //         null,
        //         false
        //     ),
        //     new Code(
        //         3,
        //         'Quentin Question',
        //         14,
        //         'M',
        //         'unknown',
        //         null,
        //         'unknown',
        //         'unknown',
        //         'unknown',
        //         1537933540000,
        //         1537933720000,
        //         false
        //     ),
        //     new Code(
        //         4,
        //         'Quigley Question',
        //         15,
        //         'M',
        //         'unknown',
        //         null,
        //         'unknown',
        //         'unknown',
        //         'unknown',
        //         1537933540000,
        //         1537933900000,
        //         false
        //     ),
        //     new Code(
        //         5,
        //         'Quenbolio Question',
        //         16,
        //         'M',
        //         'unknown',
        //         null,
        //         'unknown',
        //         'unknown',
        //         'unknown',
        //         1537933540000,
        //         1537934080000,
        //         false
        //     ),
        //     new Code(
        //         6,
        //         'Jeff',
        //         99,
        //         'M',
        //         'Jeff.',
        //         'https://lh3.googleusercontent.com/pd884qpwCln3SkoJY_--qAY9VuXGo6sOCRcoEZqdlJbYyKyhqO-mTJMPOU_wfxGPrLMb4P5SIGZfZw=w400-h559-no',
        //         'were you even',
        //         'really missing',
        //         'jeff come on.',
        //         1526920054000,
        //         1526920059000,
        //         true
        //     )
        // ];

        const codes: Code[] = [
            {
                id: 1,
                name: 'Jimmy Losttot',
                age: 14,
                gender: 'M',
                cosplay: 'n/a',
                cosplayImg: null,
                descriptionPhysical: '4\', looks very lost',
                descriptionClothing: 'green tee, jeans',
                lastSeen: 'pendulum atrium',
                timestampLogged: 1526920054000,
                timestampResolved: null,
                resolved: false
            },
            {
                id: 2,
                name: 'Susie Somewhere',
                age: 11,
                gender: 'F',
                cosplay: 'Strawberry Shortcake',
                cosplayImg: 'https://i.pinimg.com/originals/03/a0/c9/03a0c9a5f4c095db45d2bb935132b3cf.png',
                descriptionPhysical: '3\'6\", red hair (wig), light-skinned',
                descriptionClothing: 'pink dress, stockings, white shirt, pink strawberry hat',
                lastSeen: 'artist\'s alley',
                timestampLogged: 1526920058000,
                timestampResolved: null,
                resolved: false
            },
            {
                id: 3,
                name: 'Quentin Question',
                age: 14,
                gender: 'M',
                cosplay: 'unknown',
                cosplayImg: null,
                descriptionPhysical: 'unknown',
                descriptionClothing: 'unknown',
                lastSeen: 'unknown',
                timestampLogged: 1537933540000,
                timestampResolved: 1537933720000,
                resolved: false
            },
            {
                id: 4,
                name: 'Quigley Question',
                age: 15,
                gender: 'M',
                cosplay: 'unknown',
                cosplayImg: null,
                descriptionPhysical: 'unknown',
                descriptionClothing: 'unknown',
                lastSeen: 'unknown',
                timestampLogged: 1537933540000,
                timestampResolved: 1537933900000,
                resolved: false
            },
            {
                id: 5,
                name: 'Quenbolio Question',
                age: 16,
                gender: 'M',
                cosplay: 'unknown',
                cosplayImg: null,
                descriptionPhysical: 'unknown',
                descriptionClothing: 'unknown',
                lastSeen: 'unknown',
                timestampLogged: 1537933540000,
                timestampResolved: 1537934080000,
                resolved: false
            },
            {
                id: 6,
                name: 'Jeff',
                age: 99,
                gender: 'M',
                cosplay: 'Jeff.',
                cosplayImg: 'https://lh3.googleusercontent.com/pd884qpwCln3SkoJY_--qAY9VuXGo6sOCRcoEZqdlJbYyKyhqO-mTJMPOU_wfxGPrLMb4P5SIGZfZw=w400-h559-no',
                descriptionPhysical: 'were you even',
                descriptionClothing: 'really missing',
                lastSeen: 'jeff come on.',
                timestampLogged: 1526920054000,
                timestampResolved: 1526920059000,
                resolved: true
            },
        ];
        return {codes};
    }

    // Overrides the genId method to ensure that a code always has an id.
    // If the code arrays is empty,
    // the method below returns the initial number (1).
    // if the codes array is not empty, the method below returns the highest
    // code id + 1.

    genId(codes: Code[]): number {
        return codes.length > 0 ? Math.max(...codes.map(code => code.id)) + 1 : 1;
    }
}
