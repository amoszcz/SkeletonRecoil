import React, {FC, useState} from 'react';
import {TicketElement} from './TicketElement';
import {ticketsListState} from "../store/Tickets.store";
import {useRecoilValue} from "recoil";

interface TicketsListProps {
  
}

const TicketsListComponent: FC<TicketsListProps> = () => {
    const tickets = useRecoilValue(ticketsListState);
    return <>
        Lista Ticketów:
        <div style={{width:'100%'}}>
            {tickets.map(ticket =>
                <TicketElement ticket={ticket}/>
            )}
        </div>
    </>;
};
export const TicketsList = TicketsListComponent;