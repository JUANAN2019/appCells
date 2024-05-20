/* eslint-disable no-unused-expressions */
import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';

// import { layout2cols } from '../../scripts/utils/layouts.js';
// import { mask } from '@bbva-web-components/bbva-core-lit-helpers/utils/mask.js';
// import { bbvaCopy, bbvaEdit, bbvaHelp, bbvaTasks, bbvaEmail, bbvaBuilding, bbvaFeedback } from '@bbva-web-components/bbva-foundations-icons';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';

// import { MENU_ITEMS } from '../../scripts/app-routes.js';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-form-amount/bbva-web-form-amount.js';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js';
import '@bbva-web-components/bbva-web-badge-default/bbva-web-badge-default.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';

// import '@bbva-web-components/bbva-web-expandable-accordion/bbva-web-expandable-accordion.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';

// import '@bbva-web-components/bbva-web-clip-entities/bbva-web-clip-entities.js';
// import '@bbva-web-components/bbva-web-form-select-filter/bbva-web-form-select-filter.js';
// import '@bbva-web-components/bbva-web-list-item-definition-amount/bbva-web-list-item-definition-amount.js';
// import '@bbva-web-components/bbva-web-notification-message/bbva-web-notification-message.js';
// import '@bbva-web-components/bbva-web-progress-bar/bbva-web-progress-bar.js';
// import '@bbva-web-components/bbva-web-table-filter/bbva-web-table-filter.js';
// import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';

// import '@cells-demo/demo-table-movements/demo-table-movements.js';

// import { bbvaWebFormCheckboxControlAmbient } from '@bbva-web-components/bbva-web-form-checkbox';
//import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-text';
//import { bbvaWebListItemDefinitionAmountAmbient } from '@bbva-web-components/bbva-web-list-item-definition-amount';

// import { bbvaWebFormSelectFilterAmbient } from '@bbva-web-components/bbva-web-form-select-filter';
import styles from './list-product-page-styles.js';

// const iconset = {
//   copy: bbvaCopy(),
//   edit: bbvaEdit()
// };


const DEFAULT_I18N_KEYS = {
  accountDetail: 'dashboard-page.account-detail',
  accountMovements: 'dashboard-page.account-movements',
  accountNumber: 'dashboard-page.account-number',
  accountType: 'dashboard-page.account-type',
  alias: 'dashboard-page.alias',
  allowableLimit: 'dashboard-page.allowable-limit',
  arranged: 'dashboard-page.arranged',
  arrangedAllowableLimit: 'dashboard-page.arranged-allowable-limit',
  availableBalance: 'dashboard-page.available-balance',
  businessName: 'dashboard-page.business-name',
  copyAccountNumber: 'dashboard-page.copy-account-number',
  currency: 'dashboard-page.currency',
  difference: 'dashboard-page.difference',
  editAlias: 'dashboard-page.edit-alias',
  entity: 'dashboard-page.entity',
  selectAccount: 'dashboard-page.select-account',
  totalAccountBalance: 'dashboard-page.total-account-balance',
};

/* eslint-disable new-cap */
class ListProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'list-product-page';
  }

  static get properties() {
    return {
      i18nKeys: {
        type: Object,
        attribute: false,
      },
      _product: {
        type: Array,
        attribute: false,
      },
      _products: {
        type: Array,
        attribute: false,
      },

    };
  }

  constructor() {
    super();

    this.i18nKeys = {};
    this._resetData();
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);


  }

  updated(props) {
    super.updated && super.updated(props);

  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }

  onPageEnter() {

    this.subscribe('add_product', (ev) => {
      this._product = ev;

    });
    this._handleAddProduct(this._product);

  }

  onPageLeave() {
    this._resetData();

  }

  render() {

    return html`
      <demo-web-template page-title="List Products">
        <div class="top" slot="app-top-content">
        <h1>Lista productos</h1>
        </div>
        <div class="main" slot="app-main-content">  
          ${this._renderCardProduct()}
        </div>
        <demo-data-dm ></demo-data-dm>
      </demo-web-template>
    `;
  }
  _renderCardProduct() {
    this._products = JSON.parse(localStorage.getItem('products')) || [];
    return html`
    ${this._products.map((product, index) => html`
      
      <bbva-web-card-product
        
        badge-text="${index + 1}. ${product.nameP}"
        button-text=""
        image="${product.imageP}"
        preheading="${product.priceP} €"
       
      >
      <bbva-web-button-default
            id="delProduct"
            slot="button" 
            @click="${() => this._delProduct(index)}"
          >Eliminar
          </bbva-web-button-default>
      </bbva-web-card-product>

    `)}
  `;
  }


  _handleAddProduct(product) {
    this._products.push(product);
    localStorage.setItem('products', JSON.stringify(this._products));
  }
  _delProduct(index) {
    const filteredProducts = this._products.filter((product, i) => i !== index);
    this._products = filteredProducts;
    localStorage.setItem('products', JSON.stringify(filteredProducts));
  }

  _resetData() {
    this._product = [],
    this._products = [];
  }
}

window.customElements.define(ListProductPage.is, ListProductPage);
