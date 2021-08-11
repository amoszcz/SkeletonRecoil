import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { loadingPanelState } from '../store/LoadingPanel.state';

interface LoadingPanelProps {}

const LoadingPanelComponent: FC<LoadingPanelProps> = () => {
    const visible = useRecoilValue(loadingPanelState);

    return <>{visible && <>Loading...</>}</>;
};
export const LoadingPanel = LoadingPanelComponent;
