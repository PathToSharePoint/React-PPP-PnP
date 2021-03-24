import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneHorizontalRule,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactPPPPNPWebPartStrings';
import ReactPPPPNP from './components/ReactPPPPNP';
import { IReactPPPPNPProps } from './components/IReactPPPPNPProps';
import { CustomPropertyPane } from './components/CustomPropertyPane';
import { IPropertyPaneHostsProps, PropertyPaneHostsFactory } from '../../PPP/PropertyPaneHostsStore';
import { PropertyPaneHost } from '../../PPP/PropertyPaneHost';

import { WebPartContext } from './components/WebPartContext';

export interface IReactPPPPNPWebPartProps {
  description: string;
  pnpListPicker: any;
  pnpListItemPicker: any;
  pnpPeoplePicker: any;
}

export default class ReactPPPPNPWebPart extends BaseClientSideWebPart<IReactPPPPNPWebPartProps> {

  public render(): void {

    ReactDom.render(
      <>
        {/* Web Part content */}
        < ReactPPPPNP {...this.properties} />
        {/* Property Pane custom controls */}
        <WebPartContext.Provider value={this.context}>
        < CustomPropertyPane
          propertyBag={this.properties}
          renderWP={this.render.bind(this)}
          propertyPaneHosts={this.propertyPaneHosts}
        />
        </WebPartContext.Provider>
      </>,
      this.domElement);
  }

  // Store for managing the Property Pane hosts
  public propertyPaneHosts: IPropertyPaneHostsProps = PropertyPaneHostsFactory();

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                // PropertyPaneHost is a generic control that hosts the actual control
                PropertyPaneHorizontalRule(),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('pnpPeoplePicker', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('pnpListItemPicker', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('pnpListPicker', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
              ]
            }
          ]
        }
      ]
    };
  }
}
