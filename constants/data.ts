import icons from "./icons";
import images from "./images";


export const categories = [
  { title: "All", category: "All" },
  { title: "Self Assessment", category: "Self Assessment" },
  { title: "Exercises", category: "Exercises" },
  { title: "Symptoms", category: "Symptoms" },
  { title: "Progress", category: "Progress" },
  { title: "Prevention", category: "Prevention" },
  { title: "Products", category: "Products" },
  { title: "Doctors", category: "Doctors" },
  { title: "Clinics", category: "Clinics" },
  { title: "FAQs", category: "FAQs" },
];

export const settings = [
  {
    title: "My Bookings",
    icon: icons.calendar,
  },
  {
    title: "Payments",
    icon: icons.wallet,
  },
  {
    title: "Profile",
    icon: icons.person,
  },
  {
    title: "Notifications",
    icon: icons.bell,
  },
  {
    title: "Security",
    icon: icons.shield,
  },
  {
    title: "Language",
    icon: icons.language,
  },
  {
    title: "Help Center",
    icon: icons.info,
  },
  {
    title: "Invite Friends",
    icon: icons.people,
  },
];



export const exercises = [
  {
    id: '1',
    title: 'Jaw Relaxation Exercise',
    description: 'This exercise helps relieve tension in your jaw muscles caused by bruxism.',
    image: images.exercise1,
    steps: [
      'Place your tongue gently on the roof of your mouth',
      'Let your teeth come apart while relaxing your jaw muscles',
      'Hold for 5 seconds, then relax completely',
      'Repeat 5-10 times'
    ],
    tips: [
      'Do this exercise several times a day',
      'Focus on keeping your facial muscles relaxed',
      'Breathe deeply during the exercise'
    ],
    duration: '5 minutes',
    difficulty: 'Beginner'
  },
  
];
