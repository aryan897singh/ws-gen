import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PdfDisplay from './PdfDisplay';

const LOADING_SPINNER_ID = 'loading-spinner';
const PDF_VIEW_ID = 'pdf-viewer';
const ERROR_MSG_ID = 'error-message';
const DOWNLOAD_BTN_TXT = 'Download PDF';

describe('PdfDisplay Component', () => {
    let mockOnDownload: jest.Mock;

    beforeEach(() => {
        mockOnDownload = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays a loading spinning icon while waiting for api response', () => {
        //render the screen
        const {getByTestId} = render(
            <PdfDisplay status="loading"/>
        );

        //now expect the loading icon to be present, i.e truthy
        expect(getByTestId(LOADING_SPINNER_ID)).toBeTruthy();
    })

    it('succesfully renders the PDF display component on API success status', () => {
        const {getByTestId} = render(
            <PdfDisplay status="success" pdfUrl="https://example.com/fake.pdf" onDownload={mockOnDownload} />
        );

        expect(getByTestId(PDF_VIEW_ID)).toBeTruthy();
    })

    it('successfully displays a usable download button, and runs on API success status', () => {
        const {getByText} = render(
            <PdfDisplay status="success" onDownload={mockOnDownload}/>
        )
        //verify that the button is present in the first place
        expect(getByText(DOWNLOAD_BTN_TXT)).toBeTruthy();

        //now simulating the download, and making sure it is called
        fireEvent.press(getByText(DOWNLOAD_BTN_TXT));
        expect(mockOnDownload).toHaveBeenCalled();
        
    })

    
});