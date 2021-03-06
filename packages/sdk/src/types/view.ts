/** @module @airtable/blocks/models: View */ /** */
import {ObjectMap} from '../private_utils';
import {Color} from '../colors';
import {FieldId} from './field';
import {RecordId} from './record';

/** */
export type ViewId = string;

/**
 * An enum of Airtable's view types
 *
 * @example
 * ```js
 * import {ViewType} from '@airtable/blocks/models';
 * const gridViews = myTable.views.filter(view => (
 *     view.type === ViewType.GRID
 * ));
 * ```
 */
export enum ViewType {
    /** */
    GRID = 'grid',
    /** */
    FORM = 'form',
    /** */
    CALENDAR = 'calendar',
    /** */
    GALLERY = 'gallery',
    /** */
    KANBAN = 'kanban',
}

/** @hidden */
export interface ViewFieldOrderData {
    fieldIds: Array<FieldId>;
    visibleFieldCount: number;
}

/** @hidden */
export type ViewColorsByRecordIdData = ObjectMap<RecordId, Color | null | undefined>;

/** @hidden */
export interface ViewData {
    id: ViewId;
    name: string;
    type: ViewType;
    visibleRecordIds?: Array<RecordId>;
    fieldOrder?: ViewFieldOrderData;
    colorsByRecordId?: ViewColorsByRecordIdData;
}
