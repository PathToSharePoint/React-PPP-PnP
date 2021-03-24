import * as React from 'react';

import { ICustomPropertyPaneProps } from './ICustomPropertyPaneProps';

import { PropertyPanePortal } from '../../../PPP/PropertyPanePortal';

import { ListItemPicker, ListPicker } from '@pnp/spfx-controls-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

import { WebPartContext } from './WebPartContext';

import { BaseComponentContext } from '@microsoft/sp-component-base';

export const CustomPropertyPane: React.FunctionComponent<ICustomPropertyPaneProps> = (props) => {

    const wpContext = React.useContext(WebPartContext);

    // Function to update Web Part properties and re-render the web Part
    function updateWPProperty(p, v) {
        props.propertyBag[p] = v;
        props.renderWP();
    }

    return (
        <>
            <PropertyPanePortal propertyPaneHosts={props.propertyPaneHosts}>
                {/* <ListPicker
                    data-Property="pnpListPicker"
                    context={wpContext as BaseComponentContext}
                    label="PnP ListPicker"
                    placeHolder="Select your list(s)"
                    baseTemplate={100}
                    includeHidden={false}
                    multiSelect={false}
                    onSelectionChanged={(list) => updateWPProperty("pnpListPicker", list)}
                /> */}
                <ListItemPicker
                    data-Property="pnpListItemPicker"
                    listId='7838b1bb-35c8-4003-a26d-faa100d69890'
                    columnInternalName='Title'
                    keyColumnInternalName='Id'
                    // filter="Title eq 'SPFx'"
                    orderBy={"Id desc"}
                    itemLimit={2}
                    onSelectedItem={(item) => updateWPProperty("pnpListItemPicker", item)}
                    context={wpContext}
                />
                <PeoplePicker
                    data-Property="pnpPeoplePicker"
                    context={wpContext}
                    titleText="PnP People Picker"
                    personSelectionLimit={3}
                    // groupName={"Team Site Owners"} // Leave this blank in case you want to filter from all users
                    showtooltip={true}
                    required={false}
                    disabled={false}
                    onChange={(items) => updateWPProperty("pnpPeoplePicker", items)}
                    showHiddenInUI={false}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000}
                />
            </PropertyPanePortal>
        </>
    );
};