import { contactService } from '../../services/contactService';
import { toast } from "react-toastify";

export function loadContacts(filterBy) {
  return async dispatch => {
    const contacts = await contactService.getContacts(filterBy)
    const action = {
      type: 'SET_CONTACTS',
      contacts
    }
    dispatch(action)
  }
}

export function getContactById(contactId) {
  return async dispatch => {
    const contact = await contactService.getContactById(contactId)
    dispatch({ type: 'SET_CONTACT', contact })
  }
}

export function saveContact(contact) {
  return async dispatch => {
    const isAdd = !contact._id
    const updatedContact = await contactService.saveContact(contact)

    if (isAdd) {
      dispatch({ type: 'ADD_CONTACT', contact: updatedContact });
      toast.dark('Contact added successfully');
    }
    else {
      dispatch({ type: 'UPDATE_CONTACT', updatedContact });
      toast.dark('Contact saved successfully');
    }
  }
}

export function removeContact(contactId) {
  return async dispatch => {
    await contactService.deleteContact(contactId)
    dispatch({ type: 'REMOVE_CONTACT', contactId });
    toast.dark('Contact deleted');
  }
}