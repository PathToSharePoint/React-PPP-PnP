import * as React from 'react';
import styles from './ReactPPPPNP.module.scss';
import { IReactPPPPNPProps } from './IReactPPPPNPProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactPPPPNP extends React.Component<IReactPPPPNPProps, {}> {
  public render(): React.ReactElement<IReactPPPPNPProps> {
    return (
      <div className={ styles.reactPpppnp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <span className={ styles.title }>Property Pane Portal</span>
              <p className={ styles.subTitle }>Use any form control in the Property Pane.</p>
              <p className={styles.description}>PnP List Picker: {escape(this.props.pnpListPicker || "")}</p>
              <p className={styles.description}>PnP List Item Picker: {escape(this.props.pnpListItemPicker || "")}</p>
              <p className={styles.description}>PnP People Picker: {escape(this.props.pnpPeoplePicker || "")}</p>
              <a href="https://pnp.github.io/sp-dev-fx-controls-react" className={ styles.button }>
                <span className={ styles.label }>Visit the PnP SPFx Controls</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
