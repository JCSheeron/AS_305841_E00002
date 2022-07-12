define([], function () {
    'use strict';
    function DialogueTexts() {
        return {
            en: {
                title: 'Configuration dialogue for Table',
                filter: {
                    title: 'Filtering',
                    col: 'Column',
                    op: 'Operator',
                    val: 'Value',
                    and: 'and',
                    or: 'or',
                    act: 'Active',
                    inact: 'Inactive',
                    actack: 'Active Acknowledged',
                    inactack: 'Inactive Acknowledged'
                },
                tabconf: {
                    title: 'Configuration',
                    dir: 'Direction',
                    to: 'To',
                    from: 'From',
                    impose: 'Impose',
                    vis: 'Visble',
                    enab: 'Enabled',
                    inv: 'Invisble',
                    dis: 'Disabled',
                    row: 'Rows',
                    col: 'Columns',
                    za: 'Z to A',
                    old: 'Oldest first',
                    new: 'Newest first'
                }
            },
            de: {
                title: 'Konfigurationsdialog für Table',
                filter: {
                    title: 'Filterung',
                    col: 'Spalte',
                    op: 'Operator',
                    val: 'Wert',
                    and: 'und',
                    or: 'oder',
                    act: 'Aktiv',
                    inact: 'Inaktiv',
                    actack: 'Aktiv & Bestätigen',
                    inactack: 'Inaktiv & Bestätigen'
                },
                sort: {
                    title: 'Sortierung',
                    col: 'Spalte',
                    sort: 'Sortieren',
                    by: 'nach',
                    first: 'Zuerst',
                    inc: 'aufsteigend',
                    dec: 'absteigend',
                    then: 'dann',
                    az: 'A bis Z',
                    za: 'Z bis A',
                    old: 'Den ältesten zuerst',
                    new: 'Den neusten zuerst'
                }
            }
        };
    }
    
    return new DialogueTexts();
});
