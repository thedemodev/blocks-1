/** @module @airtable/blocks/ui: Select */ /** */
import * as React from 'react';
import {spawnError} from '../error_utils';
import {GlobalConfigKey} from '../types/global_config';
import globalConfigSyncedComponentHelpers from './global_config_synced_component_helpers';
import Select, {sharedSelectPropTypes, SharedSelectProps} from './select';
import useSynced from './use_synced';

/**
 * Props for the {@link SelectSynced} component. Also accepts:
 * * {@link SelectStyleProps}
 *
 * @docsPath UI/components/SelectSynced
 * @groupPath UI/components/Select
 */
interface SelectSyncedProps extends SharedSelectProps {
    /** A string key or array key path in {@link GlobalConfig}. The selected option will always reflect the value stored in {@link GlobalConfig} for this key. Selecting a new option will update {@link GlobalConfig}. */
    globalConfigKey: GlobalConfigKey;
}

/**
 * A wrapper around the {@link Select} component that syncs with {@link GlobalConfig}.
 *
 * [[ Story id="select--synced-example" title="Synced select example" ]]
 *
 * @docsPath UI/components/SelectSynced
 * @groupPath UI/components/Select
 * @component
 */
const SelectSynced = (props: SelectSyncedProps, ref: React.Ref<HTMLSelectElement>) => {
    const {globalConfigKey, disabled, onChange, ...restOfProps} = props;
    const [value, setValue, canSetValue] = useSynced(globalConfigKey);

    let selectValue;
    if (value === null || value === undefined) {
        selectValue = null;
    } else if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
    ) {
        selectValue = value;
    } else {
        throw spawnError(
            'SelectSynced only works with a global config value that is a string, number, boolean, null or undefined.',
        );
    }

    return (
        <Select
            {...restOfProps}
            ref={ref}
            value={selectValue}
            onChange={newValue => {
                if (newValue === undefined) {
                    newValue = null;
                }
                setValue(newValue);
                if (onChange) {
                    onChange(newValue);
                }
            }}
            disabled={disabled || !canSetValue}
        />
    );
};

const ForwardedRefSelectSynced = React.forwardRef<HTMLSelectElement, SelectSyncedProps>(
    SelectSynced,
);

ForwardedRefSelectSynced.displayName = 'SelectSynced';

ForwardedRefSelectSynced.propTypes = {
    globalConfigKey: globalConfigSyncedComponentHelpers.globalConfigKeyPropType,
    ...sharedSelectPropTypes,
};

export default ForwardedRefSelectSynced;
