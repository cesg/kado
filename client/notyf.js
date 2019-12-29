import { Notyf } from 'notyf';

export default new Notyf({
  types: [
    {
      type: 'success',
      className: 'has-background-success',
      icon: false,
    },
    {
      type: 'danger',
      className: 'has-background-danger',
      icon: false,
    },
  ],
});
