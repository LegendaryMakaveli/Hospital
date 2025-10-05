class Doctor {
    id;
    name;
    department;
    contactInfo;
    isAvailable = true;

    constructor(name, id = null) {
        this.name = name;
        if (id !== null) {
            this.setId(id);
        }
    }

    setId(id) {
        const id_to_string = String(id);
        if (!/^[0-9]{10}$/.test(id_to_string)) {
            throw new Error('Id must be a 10-digit number');
        }
        this.id = id_to_string;
    }

    getId() {
        return this.id;
    }

    setName(name) {
        if (!name || typeof name !== "string") {
            throw new Error("Name must be a non-empty string");
        }
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDepartment(department) {
        if (!Doctor.isValidDepartment(department)) {
            throw new Error(`Invalid department. Valid departments: ${Array.from(Doctor.departments).join(', ')}`);
        }
        this.department = department;
    }

    getDepartment() {
        return this.department;
    }

    setContactInfo(contactInfo) {
        this.contactInfo = contactInfo;
    }

    getContactInfo() {
        return this.contactInfo;
    }

    setIsAvailable(isAvailable) {
        if (typeof isAvailable !== "boolean") {
            throw new Error("isAvailable must be a boolean");
        }
        this.isAvailable = isAvailable;
    }

    getIsAvailable() {
        return this.isAvailable;
    }

    toObject() {
        return {
            id: this.getId(),
            name: this.getName(),
            department: this.getDepartment(),
            contactInfo: this.getContactInfo(),
            isAvailable: this.getIsAvailable()
        };
    }

    register() {
        if (!this.id) {
            throw new Error('Doctor id is required to register');
        }

        if (Doctor.registry[String(this.id)]) {
            throw new Error(`Doctor with id ${this.id} is already registered`);
        }

        if (!Doctor.isValidDepartment(this.department)) {
            throw new Error('Doctor department must be one of the allowed departments before registering');
        }

        Doctor.registry[String(this.id)] = this.toObject();
    }

    getProfile() {
        return this.toObject();
    }


    doctorAvailability() {
        if (this.id) {
            const entry = Doctor.registry[String(this.id)];
            if (entry !== undefined) {
                return typeof entry.isAvailable === 'boolean' ? entry.isAvailable : null;
            }
        }
        return this.getIsAvailable();
    }

    static getDoctorAvailabilityById(id) {
        if (!id) return null;
        const entry = Doctor.registry[String(id)];
        if (entry === undefined) return null;
        return typeof entry.isAvailable === 'boolean' ? entry.isAvailable : null;
    }

    static getRegisteredDoctorById(id) {
        if (!id) return null;
        const found = Doctor.registry[String(id)];
        return found === undefined ? null : found;
    }

    static registerDoctor(newDoctor) {
        if (newDoctor instanceof Doctor) {
            if (!newDoctor.id) {
                throw new Error('Doctor id is required to register');
            }
            if (Doctor.registry[String(newDoctor.id)]) {
                throw new Error(`Doctor with id ${newDoctor.id} is already registered`);
            }
            if (!Doctor.isValidDepartment(newDoctor.getDepartment())) {
                throw new Error('Doctor department must be one of the allowed departments before registering');
            }
            Doctor.registry[String(newDoctor.id)] = newDoctor.toObject();
            return;
        }

        if (!newDoctor || !newDoctor.id) {
            throw new Error('newDoctor must have an id to register');
        }

        const idNumber = String(newDoctor.id);
        if (!/^[0-9]{10}$/.test(idNumber)) {
            throw new Error('Id must be a 10-digit number');
        }

        if (!Doctor.isValidDepartment(newDoctor.department)) {
            throw new Error('Doctor department must be one of the allowed departments before registering');
        }

        if (Doctor.registry[idNumber]) {
            throw new Error(`Doctor with id ${idNumber} is already registered`);
        }

        Doctor.registry[idNumber] = { ...newDoctor };
    }

    static clearRegistry() {
        Doctor.registry = {};
    }


    static countRegistry() {
        return Object.keys(Doctor.registry).length;
    }
}

Doctor.registry = {};
Doctor.departments = new Set([
    'Cardiology',
    'ENT',
    'Orthopedics',
    'Pediatrics',
    'General',
    'Dermatology'
]);

Doctor.isValidDepartment = function (dept) {
    return typeof dept === 'string' && Doctor.departments.has(dept);
};

module.exports = Doctor;
