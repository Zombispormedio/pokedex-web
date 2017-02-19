import {SHOW_SNACKBAR, CLOSE_SNACKBAR} from '../config/actionTypes'

export function showSnackbar(message) {
  return {
    type: SHOW_SNACKBAR,
    message
  }
}

export function closeSnackbar() {
  return {
    type: CLOSE_SNACKBAR
  }
}