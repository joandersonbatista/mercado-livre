import en from './translations/en.json';

type Messages = typeof en;

declare global {
  type IntlMessages = Messages;
}
