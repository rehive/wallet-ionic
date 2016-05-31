/*global Firebase, console, angular */
angular.module('generic-client.services.contacts', [])

    .service("ContactsService", function () {

        this.format = function (contacts) {
            var cleanContacts = [];

            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].emails) {
                    cleanContacts.push({
                        "displayName": contacts[i].name.formatted || contacts[i].name.givenName + " " + contacts[i].name.familyName,
                        "emails": contacts[i].emails || [],
                        "photos": contacts[i].photos || []
                    })
                }


                if (contacts[i].phoneNumbers) {
                    cleanContacts.push({
                        "displayName": contacts[i].name.formatted || contacts[i].name.givenName + " " + contacts[i].name.familyName,
                        "phones": contacts[i].phoneNumbers || [],
                        "photos": contacts[i].photos || []
                    })
                }
            }
            return cleanContacts
        };

        this.list = function (contact, onSuccess, onError) {
            if (contact.length > 1) {
                if (navigator && navigator.contacts) {
                    var options = new ContactFindOptions();
                    options.filter = contact;
                    options.multiple = true;
                    options.desiredFields = [navigator.contacts.fieldType.displayName,
                        navigator.contacts.fieldType.givenName,
                        navigator.contacts.fieldType.familyName,
                        navigator.contacts.fieldType.nickname,
                        navigator.contacts.fieldType.name,
                        navigator.contacts.fieldType.emails,
                        navigator.contacts.fieldType.photos,
                        navigator.contacts.fieldType.phoneNumbers];
                    options.hasPhoneNumber = true;

                    var filter = [navigator.contacts.fieldType.displayName,
                        navigator.contacts.fieldType.name,
                        navigator.contacts.fieldType.givenName,
                        navigator.contacts.fieldType.familyName,
                        navigator.contacts.fieldType.nickname,
                        navigator.contacts.fieldType.name,
                        navigator.contacts.fieldType.phoneNumbers];

                    navigator.contacts.find(filter, onSuccess, onError, options);
                }
            }
        }
    });