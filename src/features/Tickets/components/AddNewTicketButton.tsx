import React, { FC, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    EmptyTicket,
    focusAddButtonRequiredState,
    showEditTicketState,
    ticketContentState,
    ticketNameState,
} from '../store/Tickets.store';

interface AddNewTicketButtonProps {
    onAddTicket: () => Promise<void>;
}

const AddNewTicketButtonComponent: FC<AddNewTicketButtonProps> = ({ onAddTicket }) => {
    const buttonAdd = useRef<HTMLButtonElement | null>(null);
    const [focusAddButtonRequired, setFocusAddButtonRequired] = useRecoilState(focusAddButtonRequiredState);
    const showEdit = useRecoilValue(showEditTicketState);

    useEffect(() => {
        if (focusAddButtonRequired) {
            setFocusAddButtonRequired(false);
            buttonAdd.current?.focus();
        }
    }, [focusAddButtonRequired]);
    return (
        <>
            <button
                autoFocus={true}
                ref={(btn) => {
                    if (btn) buttonAdd.current = btn;
                }}
                onClick={async () => {
                    await onAddTicket();
                }}
                disabled={showEdit}
            >
                Dodaj nowy ticket
            </button>
        </>
    );
};
export const AddNewTicketButton = AddNewTicketButtonComponent;
