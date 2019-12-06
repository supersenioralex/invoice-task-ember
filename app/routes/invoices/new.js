import Route from '@ember/routing/route';

import moment from 'moment';
import { hash } from 'rsvp';
import { later } from '@ember/runloop';

import zeroPad from 'invoice-task/helpers/zero-pad';

export default Route.extend({
//   model() {
//     return hash({
//       invoice: this.get('store').createRecord('invoice', {
//         'status': 'draft',
//         'issuedDate': moment().toDate(),
//         'createdDate': moment().toDate(),
//         'serviceFromDate': moment().subtract(1, 'month').toDate(),
//         'serviceToDate': moment().toDate(),
//         'paymentDueDate': moment().add(1, 'month').toDate()
//       })
//     });
//   },

//   afterModel(hash) {
//     if (hash.settings.get('firstObject')) {  
//       // override invoice properties with settings
//       const settings = hash.settings.get('firstObject').getProperties(
//         'logo',
//         'invoiceNumber',
//         'senderAddress',
//         'taxRate',
//         'invoiceTerms',
//         'personalData',
//         'currency'
//       );

//       hash.invoice.setProperties({
//         ...settings
//       });
//     }

//     if (hash.prevInvoice.rejectBy('dirtyType', 'created').get('lastObject')) {
//       // get invoice number of last invoice and increment it
//       const prevInvoiceNumber = hash.prevInvoice.rejectBy('dirtyType', 'created').get('lastObject').get('invoiceNumber');
//       const numberToIncrement = prevInvoiceNumber.match(/\d+$/)[0];
//       const increment = zeroPad(parseInt(numberToIncrement, 10) + 1, numberToIncrement.length);
//       const invoiceNumber = prevInvoiceNumber.replace(numberToIncrement, increment);
      
//       hash.invoice.setProperties({
//         invoiceNumber
//       });
//     }
//   },

//   setupController(controller, hash) {
//     controller.set('invoice', hash.invoice);
//     controller.set('templates', hash.templates);
//   },
  
  renderTemplate() {
    this.render('invoices/form');
  },
  
  actions: {
    willTransition(transition) {
      if(transition.intent.name !== 'invoices.edit') {
        if (!confirm('Are you sure you want to leave? Your changes will be lost.')) {
          transition.abort();
        } else {
          // delete invoice record if user navigates away
          this.controller.get('invoice').destroyRecord();
        }
      } else {
        return true;
      }
    },

    save(record) {
      this.controller.set('isProcessing', true);
      record.save().then(() => {
        later((() => {
          this.controller.set('isProcessing', false);
          this.transitionTo('invoices.edit', record);
        }), 200);
      });
    },

    cancel() {
      return this.transitionTo('invoices');
    }
  }
});
