import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import resolveItemIdentifier from '../service/resolveItemIdentifier';

const withStorageItemIdentifier = storageConfig => (WrappedComponent) => {
    const Wrapper = (props) => {
        const { identifier } = props;
        const [key, setKey] = useState(null);
        useEffect(() => {
            const setIdentifier = async () => {
                const getIdentifier = resolveItemIdentifier(storageConfig);
                setKey(await getIdentifier(identifier));
            };
            setIdentifier();
        }, [identifier]);

        return key && <WrappedComponent {...props} identifier={key} />;
    };

    Wrapper.propTypes = {
        identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    Wrapper.defaultProps = {
        identifier: null,
    };

    return Wrapper;
};

export default withStorageItemIdentifier;
