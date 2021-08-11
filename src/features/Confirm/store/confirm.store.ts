import { atom } from 'recoil';
export enum Confirmed {
    NoDecision,
    Yes,
    No,
}
export const confirmVisibleState = atom({ key: 'confirmVisibleState', default: false });
export const confirmConfirmedState = atom({ key: 'confirmConfirmedState', default: Confirmed.NoDecision });
