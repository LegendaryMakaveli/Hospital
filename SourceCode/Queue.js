const Patient = require("./Patient");
const Doctor = require("./Doctors");

class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(patient) {
        if (!(patient instanceof Patient)) {
            throw new Error("Only Patient instances can be added to the queue");
        }
        this.queue.push(patient);
    }

    dequeue() {
        return this.queue.shift();
    }

    peek() {
        return this.queue.length > 0 ? this.queue[0] : null;
    }

    assignPatientsToDoctors() {
        const assigned = [];

        for (let count = 0; count < this.queue.length; count++) {
            const patient = this.queue[count];

            const doctorId = Object.keys(Doctor.registry).find(id => {
                const doctor = Doctor.registry[id];
                return doctor.isAvailable && doctor.department === patient.getProblem();
            });

            if (doctorId) {
                const doctor = Doctor.registry[doctorId];

               
                assigned.push({
                    patient: patient.getProfile(),
                    doctor: doctor
                });

          
                Doctor.registry[doctorId].isAvailable = false;

              
                this.queue.splice(count, 1);
                count--;
            }
        }

        return assigned;
    }

    
    getQueue() {
        return this.queue.map(patient => patient.getProfile());
    }

    clearQueue() {
        this.queue = [];
    }
}

module.exports = Queue;



