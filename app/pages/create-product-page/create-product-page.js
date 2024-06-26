/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';

import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';


import '@bbva-web-components/bbva-core-collapse/bbva-core-collapse.js';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';
import '@bbva-web-components/bbva-web-form-fieldset/bbva-web-form-fieldset.js';
import '@bbva-web-components/bbva-web-form-radio-button/bbva-web-form-radio-button.js';

import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-form-amount/bbva-web-form-amount.js';

import '@bbva-web-components/bbva-web-header-public-web/bbva-web-header-public-web.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer-language-list-item.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer.js';
import '@bbva-web-components/bbva-web-panel-outstanding-opportunity/bbva-web-panel-outstanding-opportunity.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import styles from './create-product-page-styles.js';


const DEFAULT_I18N_KEYS = {

  formHeading: 'create-product.header',
  labelInput1: 'create-product.name',
  labelInput2: 'create-product.price',
  labelInput3: 'create-product.image',
  labelButton: 'create-product.button',

};


class CreateProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'create-product-page';
  }

  static get properties() {
    return {

      i18nKeys: {
        type: Object,
        attribute: false,
      },
      product: {
        type: Array,
        attribute: false,
      }


    };
  }

  constructor() {
    super();

    this.i18nKeys = {};

  }

  static get styles() {
    return [ styles ];
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);
    const queryScope = this.shadowRoot || this;
    window.IntlMsg.lang = localStorage.getItem('language') || 'en-US';
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  render() {

    return html` 
      <demo-web-template
        page-title="Create Product"
      >
        <div slot="app-top-content">
        </div>
        <div slot="app-main-content">
          ${this._formProductTpl}
        </div>
        <div slot="app-main-content" data-grid="full-width"> 
        </div>
      </demo-web-template>
    `;
  }


  get _formProductTpl() {
    return html`
      
        <form enctype="multipart/form-data">
          <h2>${this.t(this._i18nKeys.formHeading)}</h2>
          <bbva-web-form-text id="name" label="${this.t(this._i18nKeys.labelInput1)}"></bbva-web-form-text>
          <bbva-web-form-amount id="amount" label="${this.t(this._i18nKeys.labelInput2)}"></bbva-web-form-amount>
          <bbva-web-form-text id="image" label="${this.t(this._i18nKeys.labelInput3)}"></bbva-web-form-text>
        
          <bbva-web-button-default
            id="send"
            type="button" 
            @click="${this._addProduct}"
          >
            ${this.t(this._i18nKeys.labelButton)}
          </bbva-web-button-default>
        </form>
     
    `;
  }


  _addProduct(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const form = document.querySelector('#cells-template-create-product').shadowRoot.querySelector('form');
    const productName = form.querySelector('#name').value;
    const productPrice = form.querySelector('#amount').value;
    const productImage = form.querySelector('#image').value;

    const details = {
      nameP: productName,
      priceP: productPrice,
      imageP: productImage
    };

    // Realiza la publicación del evento
    this.publish('add_product', details);

    this.navigate('list-product');
  }


}

window.customElements.define(CreateProductPage.is, CreateProductPage);
