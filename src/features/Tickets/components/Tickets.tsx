import React, {FC} from 'react';
import {TicketsList} from './TicketsList';
import {EditTicket} from './EditTicket';
import { AddNewTicketButton } from './AddNewTicketButton';
import {
    EmptyTicket, focusAddButtonRequiredState,
    showEditTicketState,
    Ticket,
    ticketContentState,
    ticketNameState,
    ticketsListState
} from "../store/Tickets.store";
import {useRecoilState, useSetRecoilState} from "recoil";
import {waitASecond} from "../../../mocks/Mocks";
import {loadingPanelState} from "../../LoadingPanel/store/LoadingPanel.state";


interface TicketsProps {
}

const TicketsComponent: FC<TicketsProps> = () => {

    const [tickets,setTickets] = useRecoilState(ticketsListState);
    const setShowLoadingPanel = useSetRecoilState(loadingPanelState);
    const setName = useSetRecoilState(ticketNameState);
    const setContent = useSetRecoilState(ticketContentState);
    const setShowEdit = useSetRecoilState(showEditTicketState);
    const setFocusAddButton = useSetRecoilState(focusAddButtonRequiredState);
    const addTicket = () =>{

        setName(EmptyTicket.name);
        setContent(EmptyTicket.content);
        setShowEdit(true);
    }
    const saveTicket = async (ticket:Ticket)=>{
        const simulateSaveToBackend = waitASecond as (ticketToSave:Ticket)=>Promise<void>;
        setShowLoadingPanel(true);
        await simulateSaveToBackend(ticket);
        setShowLoadingPanel(false);
        setTickets([...tickets,ticket]);
        setShowEdit(false);
        setFocusAddButton(true);
    }
   
    return <>
        <TicketsList/>
        <EditTicket onSave={saveTicket} />
        <AddNewTicketButton onAddTicket={async ()=>{
            addTicket();}
        } />        
    </>;
};
export const Tickets = TicketsComponent;