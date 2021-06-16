class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;//count of the hotel's rooms
        this.bookings = [];
        this.currentBookingNumber = 1;
        this.roomsCount = {single: this.capacity*0.5, double:this.capacity*0.3, maisonette:this.capacity*0.2};
    }

    get roomsPricing() {
        return {single:50, double:90, maisonette:135};
    }

    rentARoom(clientName, roomType, nights) {
        if (this.roomsCount[roomType] > 0) {
            this.bookings.push({clientName,roomType,nights,rentNumber:this.currentBookingNumber});
            this.currentBookingNumber += 1;
            this.roomsCount[roomType] -= 1;
            return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber - 1}.`
        } else {
            let result = [];
            result.push(`No ${roomType} rooms available!`)
            if (roomType == 'single') {
                result.push(`Available double rooms: ${this.roomsCount['double']}.`)
                result.push(`Available maisonette rooms: ${this.roomsCount['maisonette']}.`)
            } else if (roomType == 'double') {
                result.push(`Available single rooms: ${this.roomsCount['single']}.`)
                result.push(`Available maisonette rooms: ${this.roomsCount['maisonette']}.`)
            } else if (roomType == 'maisonette') {
                result.push(`Available single rooms: ${this.roomsCount['single']}.`)
                result.push(`Available double rooms: ${this.roomsCount['double']}.`)
            }

            return result.join(' ');
        }
    }

    checkOut(currentBookingNumber) {
        const client = this.bookings.find((e) => e.rentNumber == currentBookingNumber);
        if (client === undefined) {
            return `The booking ${currentBookingNumber} is invalid.`
        }
        const totalMoney = client.nights*this.roomsPricing[client.roomType];
        this.roomsCount[client.roomType] += 1;
        this.bookings.splice(this.bookings.indexOf(client),1)
        return `We hope you enjoyed your time here, Mr./Mrs. ${client.clientName}. The total amount of money you have to pay is ${totalMoney} BGN.`
    }

    report() {
        let result = [];
        result.push(`${this.name.toUpperCase()} DATABASE:\n--------------------`)
        if (this.bookings === undefined || this.bookings.length == 0) {
            result.push('There are currently no bookings.')
        } else {
            this.bookings.forEach((c) => {
                if (this.bookings.indexOf(c) + 1 != this.bookings.length) {
                    result.push(`bookingNumber - ${c.rentNumber}\nclientName - ${c.clientName}\nroomType - ${c.roomType}\nnights - ${c.nights}\n----------`)
                } else {
                    result.push(`bookingNumber - ${c.rentNumber}\nclientName - ${c.clientName}\nroomType - ${c.roomType}\nnights - ${c.nights}`)
                }
            });
        }
        return result.join('\n');
    }
}


//let hotel = new Hotel('HotUni', 10);
//hotel.rentARoom('Peter', 'maisonette', 4);
//console.log(hotel.checkOut(1));
//console.log(hotel.rentARoom('Robert', 'double', 4));
//console.log(hotel.rentARoom('Geroge', 'maisonette', 6));

let hotel = new Hotel('HotUni', 10);
hotel.rentARoom('Peter', 'single', 4);
hotel.rentARoom('Robert', 'double', 4);
hotel.rentARoom('Geroge', 'maisonette', 6);
console.log(hotel.report());