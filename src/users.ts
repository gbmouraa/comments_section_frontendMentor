interface UserImage {
  png: string;
}

interface User {
  id: number;
  image: UserImage;
  username: string;
}

export const users: User[] = [
  {
    id: 0,
    image: {
      png: "https://res.cloudinary.com/dg7sswqcr/image/upload/v1679585456/comments-section-fm/image-juliusomo_doq3dh.png",
    },
    username: "juliusomo",
  },
  {
    id: 1,
    image: {
      png: "https://res.cloudinary.com/dg7sswqcr/image/upload/v1679585456/comments-section-fm/image-amyrobson_fozexc.webp",
    },
    username: "amyrobson",
  },
  {
    id: 2,
    image: {
      png: "https://res.cloudinary.com/dg7sswqcr/image/upload/v1679585456/comments-section-fm/image-maxblagun_ecp1ug.png",
    },
    username: "maxblagun",
  },
  {
    id: 3,
    image: {
      png: "https://res.cloudinary.com/dg7sswqcr/image/upload/v1679585456/comments-section-fm/image-ramsesmiron_cfndbf.png",
    },
    username: "ramsesmiron",
  },
];
