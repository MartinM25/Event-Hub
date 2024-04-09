import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export const socialLinks = [
  {
    icon: Facebook,
    link: "https://www.facebook.com/login.php/"
  },
  {
    icon: Twitter,
    link: "https://twitter.com/i/flow/login"
  },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/login"
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/"
  },
]

export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const footerLinks = [
  {
    label: 'Events',
    route: '/#events',
  },
  {
    label: 'New Event',
    route: '/events/create',
  },
  {
    label: 'Profile',
    route: '/profile',
  },
]

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}

