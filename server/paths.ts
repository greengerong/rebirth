import {join, resolve} from 'path';

export const dist = resolve(join(__dirname, '..', 'dist'));

export const index = resolve(join(dist, 'index.html'));