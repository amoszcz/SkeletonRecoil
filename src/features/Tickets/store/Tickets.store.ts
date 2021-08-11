import { atom } from 'recoil';
import { Guid } from '../../../app/guid';

export interface Ticket {
    name: string;
    content: string;
    guid: Guid;
}

export const EmptyTicket = { content: '', name: '', guid: Guid.NewGuid() } as Ticket;

export const ticketsListState = atom({
    key: 'ticketsListState',
    default: [
        {
            name: 'First Ticket',
            content: 'Add more tickets',
            guid: Guid.NewGuid(),
        },
    ] as Ticket[],
});
export const ticketNameState = atom({
    key: 'ticketNameState',
    default: EmptyTicket.name,
});
export const ticketContentState = atom({
    key: 'ticketContentState',
    default: EmptyTicket.content,
});
export const showEditTicketState = atom({
    key: 'showEditTicketState',
    default: false,
});
export const focusAddButtonRequiredState = atom({
    key: 'focusAddButtonRequiredState',
    default: false,
});
