const Doctor = require('../SourceCode/Doctors');
const Patient = require('../SourceCode/Patient');
const Queue = require('../SourceCode/Queue');

describe('TestHospitalManagement', () => {
    test("Test that create instance of Doctor", () => {
        let doctor = new Doctor("Alice");

        let setName = "Micheal";
        let setDepartment = "Cardiology";
        let setContactInfo = "MichealKIng@gmail.com";
        let setIsAvailable = true;
        let setId = '8338338383';

        doctor.setName(setName);
        doctor.setDepartment(setDepartment);
        doctor.setContactInfo(setContactInfo);
        doctor.setIsAvailable(setIsAvailable);
        doctor.setId(setId);

        expect(doctor.getName()).toBe("Micheal");
        expect(doctor.getDepartment()).toBe("Cardiology");
        expect(doctor.getContactInfo()).toBe("MichealKIng@gmail.com");
        expect(doctor.getIsAvailable()).toBe(true);
        expect(doctor.getId()).toBe('8338338383');

    })

    test('Test setId validation throws for invalid id', () => {
        let doctor = new Doctor('Tom')
        expect(() => doctor.setId('123')).toThrow()
        expect(() => doctor.setId('abcdefghij')).toThrow()
    })

    test('Test registry register() and getRegisteredDoctorById()', () => {
       
        Doctor.clearRegistry()

        let doctor = new Doctor('Micheal')
        doctor.setId('1234567890')
        doctor.setDepartment('Cardiology')
        doctor.setContactInfo('micheal@example.com')
        doctor.setIsAvailable(true)
        doctor.register()

        const found = Doctor.getRegisteredDoctorById('1234567890')
        expect(found).toEqual(doctor.toObject())

        expect(Doctor.getRegisteredDoctorById('0000000000')).toBeNull()
    })

    test('Test static registerDoctor with plain object and clearRegistry', () => {
        Doctor.clearRegistry()
        const newDoctor = {
            id: '0987654321',
            name: 'Bob',
            department: 'ENT',
            contactInfo: 'bob@x.com',
            isAvailable: true
        }
        Doctor.registerDoctor(newDoctor)
        expect(Doctor.getRegisteredDoctorById('0987654321')).toEqual(newDoctor)

    
        Doctor.clearRegistry()
        expect(Doctor.getRegisteredDoctorById('0987654321')).toBeNull()
    })

    test("Test that Store Registered doctor in an object", () => {
        let doctor = new Doctor("Alice");
        
        let setName = "Micheal";
        let setDepartment = "Cardiology";
        let setContactInfo = "MichealKing@gmail.com";
        let setIsAvailable = true;
        doctor.setName(setName);
        doctor.setDepartment(setDepartment);
        doctor.setContactInfo(setContactInfo);
        doctor.setIsAvailable(setIsAvailable);

        let registeredDoctor = {
            name: doctor.getName(),
            department: doctor.getDepartment(),
            contactInfo: doctor.getContactInfo(),
            isAvailable: doctor.getIsAvailable()
        }

        expect(registeredDoctor).toEqual({
            name: "Micheal",
            department: "Cardiology",
            contactInfo: "MichealKing@gmail.com",
            isAvailable: true
        });

    })

    test("Test that check for a doctor availability", () => {
       let doctor = new Doctor("Alice");
        
        let setName = "Micheal";
        let setDepartment = "Cardiology";
        let setContactInfo = "MichealKing@gmail.com";
        let setIsAvailable = true;
        doctor.setName(setName);
        doctor.setDepartment(setDepartment);
        doctor.setContactInfo(setContactInfo);
        doctor.setIsAvailable(setIsAvailable);

        let registeredDoctor = {
            name: doctor.getName(),
            department: doctor.getDepartment(),
            contactInfo: doctor.getContactInfo(),
            isAvailable: doctor.getIsAvailable()
        }

        expect(registeredDoctor).toEqual({
            name: "Micheal",
            department: "Cardiology",
            contactInfo: "MichealKing@gmail.com",
            isAvailable: true
        })
    expect(doctor.doctorAvailability()).toEqual(true)

    })

})


describe("Patient object", () => {
    test("Test that create an instance of a Patient object", () => {
        let patient = new Patient("Bob");

    patient.setName("Alice");
    patient.setAge(37);
    patient.setContact("ALice@gmail.com");
    patient.setProblem("Emergency");

        expect(patient.getName()).toBe("Alice");
        expect(patient.getAge()).toBe(37);
        expect(patient.getContact()).toBe("ALice@gmail.com");
        expect(patient.getProblem()).toBe("Emergency");
    })
})


describe("Queue system", () => {

    test("enqueue adds patients to queue", () => {
        Doctor.clearRegistry();
        Patient.clearPatients();
        const queue = new Queue();

        const firstDoctor = new Doctor("Dr. Smith", "1234567890");
        firstDoctor.setDepartment("Cardiology");
        Doctor.registerDoctor(firstDoctor);

        const firstPatient = new Patient("Alice", 25, "Alice@gmail.com", "Cardiology");
        queue.enqueue(firstPatient);

        expect(queue.getQueue().length).toBe(1);
        expect(queue.getQueue()[0].name).toBe("Alice");
    });

    test("assign patients to matching available doctors", () => {
        Doctor.clearRegistry();
        Patient.clearPatients();
        const queue = new Queue();

        const availableDoctor = new Doctor("Dr. Smith", "1234567890");
        availableDoctor.setDepartment("Cardiology");
        Doctor.registerDoctor(availableDoctor);

        const availableDoctor2 = new Doctor("Dr. Lee", "9876543210");
        availableDoctor2.setDepartment("Dermatology");
        Doctor.registerDoctor(availableDoctor2);

        const firstPatient = new Patient("Alice", 25, "Alice@gmail.com", "Cardiology");
        const secondPatient = new Patient("Bob", 30, "Bob@gmail.com", "Dermatology");
        const thirdPatient = new Patient("Charlie", 40, "Charlie@gmail.com", "ENT");

        queue.enqueue(firstPatient);
        queue.enqueue(secondPatient);
        queue.enqueue(thirdPatient);

        const result = queue.assignPatientsToDoctors();


        expect(result.length).toBe(2);
        expect(result[0].patient.name).toBe("Alice");
        expect(result[0].doctor.name).toBe("Dr. Smith");
        expect(result[1].patient.name).toBe("Bob");
        expect(result[1].doctor.name).toBe("Dr. Lee");

   
        expect(queue.getQueue().length).toBe(1);
        expect(queue.getQueue()[0].name).toBe("Charlie");
    });

    test("doctor becomes unavailable after assignment", () => {
        Doctor.clearRegistry();
        Patient.clearPatients();
        const queue = new Queue();

        const doctor1 = new Doctor("Dr. Smith", "1234567890");
        doctor1.setDepartment("Cardiology");
        Doctor.registerDoctor(doctor1);

        const patient1 = new Patient("Alice", 25, "Alice@gmail.com", "Cardiology");
        queue.enqueue(patient1);

        queue.assignPatientsToDoctors();

        const doctor = Doctor.getRegisteredDoctorById("1234567890");
        expect(doctor.isAvailable).toBe(false);
    });

    test("patients stay in queue if no doctor available", () => {
        Doctor.clearRegistry();
        Patient.clearPatients();
        const queue = new Queue();

        const doctor1 = new Doctor("Dr. Smith", "1234567890");
        doctor1.setDepartment("Cardiology");
        Doctor.registerDoctor(doctor1);

       
        Doctor.registry["1234567890"].isAvailable = false;

        const patient1 = new Patient("Alice", 25, "123", "Cardiology");
        queue.enqueue(patient1);

        const result = queue.assignPatientsToDoctors();

        expect(result.length).toBe(0);
        expect(queue.getQueue().length).toBe(1);
    });
});
