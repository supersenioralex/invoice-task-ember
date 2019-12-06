import Model from '@ember-data/model';
import attr from '@ember-data/model';

export default Model.extend({
    logo: attr('string'),
	status: attr('string'),
	invoiceNumber: attr('string'),
	senderAddress: attr('string'),
	recipientAddress: attr('string'),
	issuedDate: attr('isodate'),
	createdDate: attr('isodate'),
	editedDate: attr('isodate'),
	serviceFromDate: attr('isodate'),
	serviceToDate: attr('isodate'),
	paymentDueDate: attr('isodate'),
	taxRate: attr('number'),
	invoiceTerms: attr('string'),
	personalData: attr('string'),
	currency: attr('string'),
	templateId: attr('string'),
});
