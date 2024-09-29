import React from 'react';
import "../App.css"

// Define the doctor type
type Doctor = {
  name: string;
  center: string;
  address: string;
  phone: string | null; // Allow phone to be null
};

// Define the type for doctorsByDistrict with dynamic keys
type DoctorsByDistrict = {
  [district: string]: Doctor[]; // District is the key, array of doctors is the value
};

// Array of doctors categorized by district
const doctorsByDistrict: DoctorsByDistrict ={
    Colombo: [
      { name: 'Dr K A D Keeshani Randima', center: 'Ayurdhara Ayurwedic Medical Center', address: 'No. 102G Bangalawata, Kothalawala, Kaduwela', phone: '0771383439 / 0717883439' },
      { name: 'Dr. Manaram Perera', center: 'Ayurwedic Medical Center', address: 'No 7, Koralawella Rd, Moratuwa', phone: '0777073354' },
      { name: 'Dr. Prabashini', center: 'Holistic Healing Center', address: '33, Horana rd, Polgasovita, Kesbewa', phone: '0777005612' }
    ],
    Gampaha: [
      { name: 'Dr. Suresh Kalidasa', center: 'Sathvi Medical Center', address: 'Araliya grand town, Galthotamulla Rd, Yakkala', phone: '0713559477' },
      { name: 'Dr R. M. D Sasrika', center: 'Seth AYU Medical Center', address: '247/1, Pahala Karagahamuna, Kadawatha', phone: '0773756563' },
      { name: 'Dr Dineshi Hettiarachchi', center: 'Suwastha Ayurveda', address: '121/4, Dolagatha Rd, Udugampola, Gampaha', phone: '0778993721' },
      { name: 'Dr. Thiwanka Gunathilaka', center: 'Swasthika Ayurveda Medical Center', address: '26/4 Dikovita, Hedala, Wattala', phone: null },
      { name: 'Dr Chamini Kosgollegedra', center: 'Geewaseth Ayurvedic Medical Center', address: 'Rajasinghe Rd, Vegowwa, Minuwangoda', phone: null },
      { name: 'Dr B R Lakmini Fernando', center: 'De Ayu Medical & Wellness Center', address: '287/1 station Rd, Kandana', phone: '0788541759' },
      { name: 'Dr. Saranga Weerasinghe', center: 'Ayu Care Center', address: '105/2 Good Shed Road, Negombo', phone: '0718578722' },
      { name: 'Dr. Roshini Jyasekara', center: 'Bhadhraaji Ayurveda', address: 'Green City Estate, Thalakolayaya, Meerigama', phone: '0718070777' },
      { name: 'Dr. D R S Adeesha', center: 'Siddhayurveda Medical Center', address: 'Veyangoda Rd, Kalagedihena', phone: '0715858673' },
      { name: 'Dr. D R S Adeesha', center: 'Siddhayurveda Medical Center', address: 'Raja Mawatha, Kurus Watta, Ekala', phone: '0715858673' },
      { name: 'Dr. Danoja Ariyarathne', center: 'Danoja Ayurvedic Medical Center', address: 'No. 71 SLAF Houses, Isurubuyana, Kotugoda', phone: '0710630678' }
    ],
    Kalutara: [
      { name: 'Dr. Chamari Adihetti', center: 'Ayurvedic Medical Center', address: 'Malliwatha, Iththapathana, Mathugama', phone: '0712393687' },
      { name: 'Dr. Tanesha Liyanage', center: 'Vimukthi Weda Madura', address: 'Pothuvila Road, Payagala South, Kalutara', phone: null },
      { name: 'Dr. Anuradhi Rathnasekara', center: 'Ayukhya Ayurveda', address: '28/a Kaviraja Mawatha, Wekada, Panadura', phone: '0772355767' }
    ],
    Kandy: [
      { name: 'Dr. Harshana Dissanayake', center: 'Jeewaka Ayurveda', address: 'Kandy Road, Hasalaka', phone: '0714541705' },
      { name: 'Dr. L S G Weejesighe', center: 'Jeewaka Ayurveda', address: '38, Viduru Gewaththa, Kundasala', phone: '0714541705' },
      { name: 'Dr. S.K.H.C.Jayarathne', center: 'Sanhida Veda Madura', address: 'Near Hospital, 53 Teldeniya Rd, Menikhinna', phone: '0713394487' }
    ],
    Matale: [
      { name: 'Dr. Dimitri Darshika', center: 'Deegayush Ayurveda Medical Center', address: 'No. 15 Rose Street, Matale', phone: '0763925388' }
    ],
    NuwaraEliya: [
      // Please add details here
    ],
    Galle: [
      { name: 'Dr. Lakmali Rajapakshe', center: 'Divsuwa Ayurveda Medical Center', address: 'Madola Pinnaduwa, Galle', phone: '071557696' },
      { name: 'Dr. Oshini Siriwardhana', center: 'Ayujeewa Ayurvedic Medical Center', address: '86/2 Wakwella Rd, Galle', phone: '0778634089' },
      { name: 'Dr. K.T.C. Dilrukshi', center: 'Dilrukshi Ayurveda Medical Center', address: 'Ampagama Road, Ethakandura, Elpitiya', phone: '0764362106' }
    ],
    Matara: [
      // Please add details here
    ],
    Hambantota: [
      // Please add details here
    ],
    Jaffna: [
      // Please add details here
    ],
    Batticaloa: [
      // Please add details here
    ],
    Ampara: [
      // Please add details here
    ],
    Trincomalee: [
      { name: 'Dr. Chamil Karunarathna', center: 'Trinco Ayurveda Clinic', address: 'Kandy Road, Trincomalee', phone: '0713784039 / 0774401022' }
    ],
    Kurunegala: [
      { name: 'Dr. M.S. Padmalatha', center: 'Ayurvedic Medical Center', address: '76, 3rd Lane Desi Mount, Pilassa, Mawathagama', phone: null },
      { name: 'Dr. Udith', center: 'Ayurvedic Medical Center', address: 'Kurunegala, Pothuhera', phone: '0772656131' }
    ],
    Puttalam: [
      { name: 'Dr. N M U Madhubhashini', center: 'Sukayu Ayurveda Medical Center', address: 'Newtown, Madampe', phone: '0710647771' }
    ],
    Anuradhapura: [
      { name: 'Dr. Thilini Perera', center: 'Ayurveda Medical Center', address: '309, Devana Piyawara, Thambuttegama, Anuradhapura', phone: '0718855940' },
      { name: 'Dr V K V N Vithana', center: 'Gampaha Ayurveda Medical Center', address: 'No 92, 2nd Lane, Nallachchiya, Thambuttegama', phone: '0712930912' }
    ],
    Polonnaruwa: [
      // Please add details here
    ],
    Badulla: [
      { name: 'Dr. Gayathri Madumani', center: 'Gampaha Ayurveda Medical Center', address: 'Haldummulla, Haputale', phone: '0704041699' }
    ],
    Moneragala: [
      { name: 'Dr. Indika Nuwan', center: 'Gampaha Ayurveda Medical Center', address: 'Haputale Road, Wellawaya', phone: '0719178775 / 0776224393' }
    ],
    Ratnapura: [
      { name: 'Dr. D G N Awanthi', center: 'Sumethma Ayurvedic Medical Center', address: 'Thelwatte, Mudduwa, Ratnapura', phone: '0773572530' }
    ],
    Kegalle: [
      { name: 'Dr. Hansani Wimalasena', center: 'Ayushveda – Ayurveda & Wellness', address: 'No. 37, Kandy Road, Kegalle', phone: '0774166864 / 0768806272' }
    ]
  };
  

  function MedicalCenters() {
    return (
      <div className="med-centers-container">
        <div className="med-centers-content">
          <h1>Find a Sinhala Ayurvedic doctor near you</h1>
          <p>Click on the below links to choose your district and get information about the Ayurvedic doctors near you:</p>
  
          <ul className="med-centers-nav-list">
            {Object.keys(doctorsByDistrict).map((district) => (
              <li key={district}>
                <a href={`#${district.toLowerCase()}`} className="med-centers-nav-link">
                  {district}
                </a>
              </li>
            ))}
          </ul>
  
          {Object.keys(doctorsByDistrict).map((district) => (
            <div key={district} id={district.toLowerCase()} className="med-centers-district-section">
              <h2>{district}</h2>
              <p>List of Sinhala Ayurvedic doctors in {district} District:</p>
              <div className="med-centers-grid-wrapper">
                {doctorsByDistrict[district].map((doctor, index) => (
                  <div key={index} className="med-centers-grid-column">
                    <div className="med-centers-card">
                      <p>
                        <strong>{doctor.name}</strong><br />
                        {doctor.center}<br />
                        {doctor.address}<br />
                        <a href={`tel:${doctor.phone}`} className="med-centers-phone-link">
                          {doctor.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  


export default MedicalCenters;
