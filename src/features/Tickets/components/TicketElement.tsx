import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Ticket, ticketsListState } from '../store/Tickets.store';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { confirmConfirmedState, Confirmed, confirmVisibleState } from '../../Confirm/store/confirm.store';
import { waitUntil } from '../../../app/waitUntil';
import { waitASecond } from '../../../mocks/Mocks';
import { loadingPanelState } from '../../LoadingPanel/store/LoadingPanel.state';
import { Guid } from '../../../app/guid';

interface TicketElementProps {
    ticket: Ticket;
}

const TicketElementComponent: FC<TicketElementProps> = ({ ticket }) => {
    const [tickets, setTickets] = useRecoilState(ticketsListState);
    const setConfirmVisible = useSetRecoilState(confirmVisibleState);
    const [userConfirmed, setUserConfirmed] = useRecoilState(confirmConfirmedState);
    const setShowLoadingPanel = useSetRecoilState(loadingPanelState);
    const userConfirmedRef = useRef<Confirmed>(userConfirmed);
    const ticketsRef = useRef<Ticket[]>(tickets);

    useEffect(() => {
        userConfirmedRef.current = userConfirmed;
    }, [userConfirmed]);
    useEffect(() => {
        ticketsRef.current = tickets;
    }, [tickets]);

    const removeTicket = useCallback(
        async (ticketGuid: Guid) => {
            setConfirmVisible(true);
            setUserConfirmed(Confirmed.NoDecision);
            await waitUntil(() => userConfirmedRef.current !== Confirmed.NoDecision);
            setConfirmVisible(false);
            if (userConfirmedRef.current === Confirmed.No) return;
            setUserConfirmed(Confirmed.NoDecision);
            const simulateSaveToBackend = waitASecond as () => Promise<void>;
            setShowLoadingPanel(true);
            await simulateSaveToBackend();
            setShowLoadingPanel(false);
            const ticketsCopy = [...ticketsRef.current];
            const ticketIndex = ticketsCopy.findIndex((ticket) => ticket.guid === ticketGuid);
            if (ticketIndex > -1) {
                ticketsCopy.splice(ticketIndex, 1);
                setTickets([...ticketsCopy]);
            }
        },
        [userConfirmed],
    );

    return (
        <>
            <div
                style={{
                    textAlign: 'left',
                    height: '80px',
                    position: 'relative',
                    border: '1px solid #ccc',
                    background: 'yellow',
                }}
            >
                <span style={{ position: 'absolute', top: '1px', left: '10px', fontSize: '12px' }}>
                    <label></label>
                    <span>{ticket.name}</span>
                </span>
                <span style={{ position: 'absolute', top: '40px', left: '10px' }}>
                    <label></label>
                    <span>{ticket.content}</span>
                </span>
                <button onClick={() => removeTicket(ticket.guid)}>Usuń</button>
            </div>
        </>
    );
};
export const TicketElement = TicketElementComponent;
