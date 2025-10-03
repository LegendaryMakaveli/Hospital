const Doctor = require('../SourceCode/Doctors');
const Patient = require('../SourceCode/Patient');

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