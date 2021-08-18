import React from 'react';

export default function MainWrapperUi(props: any) {
    return (
        <div
            className={'main-wrapper'}
            style={{
                maxWidth: props.maxWidth || 1200,
                margin: '0 auto',
                padding: '0 10px'
            }}
        >
            {props.children}
        </div>
    );
}
