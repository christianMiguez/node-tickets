const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor() {
        
        // ultimo ticket
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo()
        }

    }

    siguiente() {
        this.ultimo += 1;
        

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket)

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if(this.tickets.length === 0) {
            return 'no hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        
        this.ultimos4.unshift(atenderTicket);
        if(this.ultimo.length > 4) {
            this.ultimos4.splice(-1,1); // borra el ultimo elemento de un array
        }

        console.log('Ultimos4: ', this.ultimos4 );

        this.grabarArchivo();

        return atenderTicket
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.ticket = [];
        this.ultimos4 = []
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo()
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsondataString = JSON.stringify(jsonData)

        fs.writeFileSync('./server/data/data.json', jsondataString);

    }




}

module.exports = { TicketControl }