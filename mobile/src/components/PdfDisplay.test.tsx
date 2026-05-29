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

    
});