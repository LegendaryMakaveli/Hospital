class Patient {
    name;
    age;
    contact;
    problem;

    constructor(name, age = null, contact = null, problem = null) {
        if (name !== undefined && name !== null) this.setName(name);
        if (age !== undefined && age !== null) this.setAge(age);
        if (contact !== undefined && contact !== null) this.setContact(contact);
        if (problem !== undefined && problem !== null) this.setProblem(problem);
    }

    setName(name) {
        if (!name || typeof name !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setAge(age) {
        const number = Number(age);
        if (!Number.isInteger(number) || number < 0) {
            throw new Error('Age must be a non-negative integer');
        }
        this.age = number;
    }

    getAge() {
        return this.age;
    }

    setContact(contact) {
        if (contact !== undefined && contact !== null && typeof contact !== 'string') {
            throw new Error('Contact must be a string');
        }
        this.contact = contact;
    }

    getContact() {
        return this.contact;
    }

    setProblem(problem) {
        if (problem !== undefined && problem !== null && typeof problem !== 'string') {
            throw new Error('Problem must be a string');
        }
        this.problem = problem;
    }

    getProblem() {
        return this.problem;
    }

    toObject() {
        return {
            name: this.getName(),
            age: this.getAge(),
            contact: this.getContact(),
            problem: this.getProblem()
        };
    }

   
    register() {
        if (!this.name) throw new Error('Patient name is required to register');
        Patient.list.push(this.toObject());
    }

    getProfile() {
        return this.toObject();
    }


    static getAllPatients() {
        return Patient.list.slice(); 
    }

    static clearPatients() {
        Patient.list = [];
    }
}


Patient.list = [];

module.exports = Patient;