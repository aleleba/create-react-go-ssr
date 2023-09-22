import React from 'react';
import { render } from '@testing-library/react';
import { ProviderMock } from '@mocks';
import App from '@components/App';

describe('<App/> Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('Should render root <App /> Component', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            //First Data Fetch
            data: 'data'
        }));

        render(
            <ProviderMock>
                <App />
            </ProviderMock>
        )
    })
})