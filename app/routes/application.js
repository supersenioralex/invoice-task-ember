import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    error(error) {
      if (error.status === '403') {
        this.replaceWith('dashboard');
      } else {
        // Let the route above this handle the error.
        return true;
      }
    }
  }
});