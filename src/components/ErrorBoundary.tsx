/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
import React from 'react';

import { TranslatedAlert } from './Translated';

export class ErrorBoundary extends React.Component {
    props: any;

    state: {
        hasError: boolean;
        message: string;
    };

    constructor(props: object) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, message: error.message };
    }

    render() {
        const { hasError, message } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <TranslatedAlert severity="error">{message}</TranslatedAlert>
            );
        }

        return children;
    }
}
