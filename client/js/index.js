import '../../scss/style.scss';
import '@mdi/font/scss/materialdesignicons.scss';
import 'bootstrap';
import m from 'mithril';
import stream from 'mithril/stream';
const prop = stream;
import Button from '../components/button';
import _ from 'lodash';
import { isNumerical } from './utils';

class Index {
  oninit() {
    this.search = {
      brand: prop(''),
      productName: prop(''),
    };
    this.itemFoundMsg = prop(null);
    this.editErrMsg = prop('');
    this.barcodeEditErrMsg = prop('');
    this.tableContent = prop([]);
    this.tableHeader = ['#', { name: 'brand', sort: 'brand' }, { name: 'product name', sort: 'productName' }, 'barcode', 'edit'];
    this.edit = {
      id: prop(null),
      brand: prop(''),
      productName: prop(''),
      barcode: prop(''),
    };

    this.search.on = event => {
      event.preventDefault();

      return m.request({
        url: '/grocery/search', method: 'POST',
        body: { brand: this.search.brand(), productName: this.search.productName() },
      })
        .then(this.tableContent)
        .then(() => this.itemFoundMsg(this.tableContent().length))
        .catch(err => console.info('err: ', err));
    };

    const fetchGrocery = () => {
      return m.request({
        url: '/grocery/findAll',
      })
        .then(res => this.tableContent(res))
        .then(() => this.itemFoundMsg(null))
        .catch(err => console.info(err));
    };

    this.editInfo = (groceryId, index) => {
      this.edit.id(groceryId);
      this.edit.brand(this.tableContent()[index].brand);
      this.edit.productName(this.tableContent()[index].productName);
      this.edit.barcode(this.tableContent()[index].barcode);
    };

    this.saveEditedData = () => {
      if (_.isEmpty(this.edit.brand()) && _.isEmpty(this.edit.productName())) {
        this.editErrMsg('Edit fields cannot be empty!');
        return;
      }

      return m.request({
        method: 'put',
        url: '/grocery/update',
        body: this.edit,
      })
        .then(fetchGrocery)
        .then(() => this.edit.id(null))
        .catch(err => console.info(err));
    };

    this.checkBarcode = () => {
      if (!isNumerical(this.edit.barcode()))
        this.barcodeEditErrMsg('invalid characters are entered into the field "barcode"');
      else
        this.barcodeEditErrMsg('');
    };

    this.sortTableColumn = (name) => {
      let sorted = _.sortBy(this.tableContent(), o => o[name]);
      this.tableContent(sorted);
    };

    fetchGrocery();
  }

  view(vnode) {
    const { tableHeader, tableContent, itemFoundMsg } = vnode.state;
    return [
      m('.container.mt-3', [
        m('h1.mb-3', 'Welcome to Grocery App'),
        !this.edit.id() && m('.row.mb-3', [
          m('.col-md-12.col-xs-12', [
            m('form.form-inline', { onsubmit: e => this.search.on(e) }, [
              m('.form-group', [
                m('label.ml-3', 'Brand'),
                m('input.form-control.ml-3', { type: 'text', name: 'grocery-brand', placeholder: '', value: this.search.brand(), oninput: e => this.search.brand(e.target.value) }),
                m('label.ml-3', 'Product Name'),
                m('input.form-control.ml-3', { type: 'text', name: 'grocery-productName', placeholder: '', value: this.search.productName(), oninput: e => this.search.productName(e.target.value) }),
              ]),
              m('button.btn.btn-primary.submit-btn.ml-3', 'Search'),
            ]),
          ]),
        ]),
        itemFoundMsg() && m('p', 'Found: ', tableContent().length),
        m('.row', [
          m('.col-md-12.col-xs-12', [
            m('table.table.table-hover', [
              m('thead', [
                m('tr', [
                  tableHeader.map(header => _.isObject(header)
                    ? m('th', { onclick: () => this.sortTableColumn(header.sort) }, header.name, m('i.mdi.mdi-sort-alphabetical.ml-1', { style: 'cursor:pointer' }))
                    : m('th', header)),
                ]),
              ]),
              m('tbody', [
                !this.edit.id() ? tableContent().map((content, index) => [
                  m('tr', [
                    m('td', index + 1),
                    m('td', content.brand),
                    m('td', content.productName),
                    m('td', content.barcode),
                    m('td', Button.render({ color: 'primary', text: [m('i.mdi.mdi-pencil'), ' edit'], attrs: { onclick: () => this.editInfo(content.groceryId, index) } })),
                  ]),
                ])
                : m('tr', [
                  m('td', 1),
                  m('td', m('input', { value: this.edit.brand(), oninput: e => this.edit.brand(e.target.value) })),
                  m('td', m('input', { value: this.edit.productName(), oninput: e => this.edit.productName(e.target.value) })),
                  m('td', m('input', { value: this.edit.barcode(), oninput: e => this.edit.barcode(e.target.value), onkeyup: () => this.checkBarcode() })),
                  m('td', [
                    Button.render({ color: 'secondary', text: 'Cancel', attrs: { onclick: () => { this.edit.id(null); this.editErrMsg(''); } } }),
                    Button.render({ color: 'success', text: 'Save', attrs: { className: 'ml-2', onclick: () => this.saveEditedData() } }),
                  ]),
                ]),
              ]),
            ]),
            this.editErrMsg() && m('p.text-danger', this.editErrMsg()),
            this.barcodeEditErrMsg() && m('p.text-warning', this.barcodeEditErrMsg()),
          ]),
        ]),
      ]
      ),
    ];
  }
}

m.mount(document.body, Index);
