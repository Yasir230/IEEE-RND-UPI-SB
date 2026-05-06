export interface Photo {
  id: string;
  src: string;
  caption: string;
  rotation: number;
  featured?: boolean;
}

export const heroPhotos: Photo[] = [
  { id: 'h1', src: '/images/photo-workshop-1.jpg', caption: 'Workshop 2023', rotation: -2 },
  { id: 'h2', src: '/images/photo-meeting-1.jpg', caption: 'RND Meetup', rotation: 1.5 },
  { id: 'h3', src: '/images/photo-team-1.jpg', caption: 'Division Photo', rotation: -1 },
  { id: 'h4', src: '/images/photo-coding-1.jpg', caption: 'Late Night Session', rotation: 2.5 },
  { id: 'h5', src: '/images/photo-bonding-1.jpg', caption: 'Team Bonding', rotation: -3 },
];

export const galleryPhotos: Photo[] = [
  { id: 'g1', src: '/images/photo-workshop-1.jpg', caption: 'Workshop Session', rotation: 1.5 },
  { id: 'g2', src: '/images/photo-casual-1.jpg', caption: 'Campus Hangout', rotation: -2 },
  { id: 'g3', src: '/images/photo-event-1.jpg', caption: 'Tech Talk 2023', rotation: 0.5 },
  { id: 'g4', src: '/images/photo-coding-1.jpg', caption: 'Coding Marathon', rotation: -1.5 },
  { id: 'g5', src: '/images/photo-meeting-1.jpg', caption: 'Weekly Meeting', rotation: 2 },
  { id: 'g6', src: '/images/photo-graduation-1.jpg', caption: 'Graduation Day', rotation: -0.5 },
  { id: 'g7', src: '/images/photo-present-1.jpg', caption: 'Project Presentation', rotation: 1 },
  { id: 'g8', src: '/images/photo-bonding-1.jpg', caption: 'Bonfire Night', rotation: -2.5 },
  { id: 'g9', src: '/images/photo-lab-1.jpg', caption: 'Lab Research', rotation: 0.5 },
  { id: 'g10', src: '/images/photo-candid-1.jpg', caption: 'Between Classes', rotation: -1 },
  { id: 'g11', src: '/images/photo-team-1.jpg', caption: 'Team Spirit', rotation: 2.5 },
  { id: 'g12', src: '/images/photo-casual-1.jpg', caption: 'Lunch Break', rotation: -1.5 },
];

export const featuredPhoto: Photo = {
  id: 'f1',
  src: '/images/photo-team-1.jpg',
  caption: 'The RND Family',
  rotation: -1.5,
  featured: true,
};
