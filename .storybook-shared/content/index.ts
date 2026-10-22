import type { ComponentDoc } from '../types';
import appBars from './app-bars';
import badge from './badge';
import banner from './banner';
import breadcrumbs from './breadcrumbs';
import button from './button';
import cards from './cards';
import checkbox from './checkbox';
import chip from './chip';
import dataTable from './data-table';
import dividers from './dividers';
import fileUploader from './file-uploader';
import iconButton from './icon-button';
import list from './list';
import menu from './menu';
import message from './message';
import modal from './modal';
import progressIndicator from './progress-indicator';
import sheets from './sheets';
import slider from './slider';
import snackbar from './snackbar';
import switchDoc from './switch';
import tab from './tab';
import textarea from './textarea';
import tiles from './tiles';
import tooltip from './tooltip';

/**
 * Per-component copy for the docs page (Overview, Accessibility, References),
 * keyed by the Storybook title's last segment (e.g. `Components/Chip` -> `Chip`).
 * One file per component in this folder; register it below.
 */
export const componentDocs: Record<string, ComponentDoc> = {
  AppBars: appBars,
  Badge: badge,
  Banner: banner,
  Breadcrumbs: breadcrumbs,
  Button: button,
  Cards: cards,
  Checkbox: checkbox,
  Chip: chip,
  DataTable: dataTable,
  Dividers: dividers,
  FileUploader: fileUploader,
  IconButton: iconButton,
  List: list,
  Menu: menu,
  Message: message,
  Modal: modal,
  ProgressIndicator: progressIndicator,
  Sheets: sheets,
  Slider: slider,
  Snackbar: snackbar,
  Switch: switchDoc,
  Tab: tab,
  Textarea: textarea,
  Tiles: tiles,
  Tooltip: tooltip,
};
