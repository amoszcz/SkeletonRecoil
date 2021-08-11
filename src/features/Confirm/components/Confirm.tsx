import React, { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { confirmConfirmedState, Confirmed, confirmVisibleState } from '../store/confirm.store';

interface ConfirmProps {}

const ConfirmComponent: FC<ConfirmProps> = () => {
    const message = 'Czy na pewno?';
    const visible = useRecoilValue(confirmVisibleState);
    const setConfirmed = useSetRecoilState(confirmConfirmedState);
    return (
        <>
            {visible && (
                <div
                    style={{
                        position: 'absolute',
                        width: '306px',
                        height: '114px',
                        background: '#fafafa',
                        border: '1px solid black',
                    }}
                >
                    <span>{message}</span>
                    <div>
                        <button
                            onClick={() => {
                                setConfirmed(Confirmed.Yes);
                            }}
                        >
                            Tak
                        </button>
                        <button
                            autoFocus={true}
                            onClick={() => {
                                setConfirmed(Confirmed.No);
                            }}
                        >
                            Nie
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export const Confirm = ConfirmComponent;
