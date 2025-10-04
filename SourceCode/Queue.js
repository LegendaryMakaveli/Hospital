const Patient = require("./Patient");
const Doctor = require("./Doctors");

class Queue {
    constructor() {
        this.patient = {}; 
        this.head = 0;    
        this.tail = 0;   
    }

  
    enqueue(patient) {
        if (!(patient instanceof Patient)) {
            throw new Error("Only Patient instances can be added to the queue");
        }
        this.patient[this.tail] = patient;
        this.tail++;
    }


    dequeue() {
        if (this.isEmpty()) return null;
        const patient = this.patient[this.head];
        delete this.patient[this.head];
        this.head++;
        return patient;
    }

    peek() {
        return this.isEmpty() ? null : this.patient[this.head];
    }

    isEmpty() {
        return this.head === this.tail;
    }


    getQueue() {
        const list = [];
        for (let i = this.head; i < this.tail; i++) {
            list.push(this.patient[i].getProfile());
        }
        return list;
    }

    assignPatientsToDoctors() {
        const assigned = [];

        for (let i = this.head; i < this.tail; i++) {
            const patient = this.patient[i];
            if (!patient) continue;

            const doctorId = Object.keys(Doctor.registry).find(id => {
                const doctor = Doctor.registry[id];
                return doctor.isAvailable && doctor.department === patient.getProblem();
            });

            if (doctorId) {
                const doctor = Doctor.registry[doctorId];
                assigned.push({ patient: patient.getProfile(), doctor });
                Doctor.registry[doctorId].isAvailable = false;

                delete this.patient[i];
                this.head++;
            }
        }

        return assigned;
    }

    clearQueue() {
        this.patient = {};
        this.head = 0;
        this.tail = 0;
    }
}

module.exports = Queue;
