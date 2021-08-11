import React, { FC } from 'react';
import { showEditTicketState, Ticket, ticketContentState, ticketNameState } from '../store/Tickets.store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Guid } from '../../../app/guid';

interface EditTicketProps {
    onSave: (input: Ticket) => Promise<void>;
}

const EditTicketComponent: FC<EditTicketProps> = ({ onSave }) => {
    const [name, setName] = useRecoilState<string>(ticketNameState);
    const [content, setContent] = useRecoilState<string>(ticketContentState);
    const showEdit = useRecoilValue(showEditTicketState);
    return (
        <>
            {showEdit && (
                <>
                    Nazwa:{' '}
                    <input
                        autoFocus={true}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    Opis:{' '}
                    <textarea
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                    <button onClick={() => onSave({ name, content, guid: Guid.NewGuid() })}>Zapisz</button>
                </>
            )}
        </>
    );
};
export const EditTicket = EditTicketComponent;
