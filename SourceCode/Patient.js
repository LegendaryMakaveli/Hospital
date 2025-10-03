class Patient {
    name;
    age;
    contact;
    problem;

    constructor(name){
        this.name = name;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setAge(Age) {
        this.age = age;
    }

    getAge() {
        return this.age;
    }

    setContact(contact) {
        this.contact = contact;
    }

    getContact() {
        return this.contact;
    }

    setProblem(problem) {
        this.problem = problem;
    }

    getProblem() {
        return this.problem;
    }

}

module.exports = Patient;