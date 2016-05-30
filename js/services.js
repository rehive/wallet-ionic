angular.module('generic-client.services', [])

    .service("ContactsService", function () {

        this.formatContact = function (contacts) {

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

        this.listContacts = function (contact, onSuccess, onError) {
            console.log('List contacts')
            if (contact.length > 1) {
                console.log('Find and list contacts')
                if (navigator && navigator.contacts) {

                    console.log('Navigator, find and list contacts')

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