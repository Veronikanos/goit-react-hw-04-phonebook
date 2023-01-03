import React, { Component } from 'react';
import styles from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    localStorage.getItem('contacts') &&
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleAddContact = newContact => {
    this.state.contacts.find(item => item.name === newContact.name)
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const normalizeText = this.state.filter.toLowerCase().trim();

    const filteredContacts = this.state.contacts.filter(item =>
      item.name.toLowerCase().trim().includes(normalizeText)
    );

    return (
      <section className={styles.phonebook}>
        <div className={styles.container}>
          <h1>Phonebook</h1>
          <ContactForm handleAddContact={this.handleAddContact} />
        </div>
        <div className={styles.container}>
          <h2>Contacts</h2>
          {!this.state.contacts.length ? (
            <h3>Your phonebook is empty. Add your first contact</h3>
          ) : (
            <>
              <h3>Your phonebook has {this.state.contacts.length} contacts</h3>
              <Filter filter={this.state.filter} onChange={this.changeFilter} />
              <ContactList
                contacts={filteredContacts}
                onDelete={this.deleteContact}
              />
            </>
          )}
        </div>
      </section>
    );
  }
}
