export interface ContentItem {
  id: string;
  type: "video" | "pdf" | "link" | "text";
  title: string;
  description?: string;
  content?: string;
  url?: string;
  duration?: string;
  fileSize?: string;
  status?: "visible" | "hidden";
  thumbnail?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  status?: "visible" | "hidden";
  category?: string;
  tags?: string[];
  items: ContentItem[];
}

export const courses: Course[] = [
  {
    id: "starter-library",
    title: "You Ready? Let's Grow! Starter Library",
    description:
      "Start with the core PDFs that introduce the mindset, language, and daily practices behind the series.",
    thumbnail: "/images/assets/classroom-starter-library.png",
    items: [
      {
        id: "newsletter-pdf",
        type: "pdf",
        title: "YOU READY? LET'S GROW! Newsletter",
        description: "A downloadable companion for quick inspiration and practical reflection.",
        fileSize: "PDF",
        url: "https://www.visionbuildaz.com/_files/ugd/7fb596_d512ec700c934afaa0ce990db9908df3.pdf"
      },
      {
        id: "ebook-pdf",
        type: "pdf",
        title: "YOU READY? LET'S GROW! eBook",
        description: "The core digital book resource for the series.",
        fileSize: "PDF",
        url: "https://www.visionbuildaz.com/_files/ugd/7fb596_fde2627e8c2c4d4a814851baaf468153.pdf"
      },
      {
        id: "article-pdf",
        type: "pdf",
        title: "YOU READY? LET'S GROW! Article",
        description: "A focused article designed for direct download and review.",
        fileSize: "PDF",
        url: "https://www.visionbuildaz.com/_files/ugd/7fb596_579eff36d5f14f39b8983bc27168ef62.pdf"
      }
    ]
  },
  {
    id: "momentum-audio-video",
    title: "Momentum Audio + Video",
    description:
      "Short media lessons built to strengthen momentum, reset focus, and keep students moving forward.",
    thumbnail: "/images/assets/classroom-momentum-media.png",
    items: [
      {
        id: "motivational-message-video",
        type: "video",
        title: "Motivational Message",
        description: "A short motivational message to strengthen your momentum.",
        duration: "Video",
        url: "https://video.wixstatic.com/video/7fb596_2b33a6e4827e4e789573a956369eabe5/1080p/mp4/file.mp4"
      },
      {
        id: "podcast-episode-one-video",
        type: "video",
        title: "Podcast Episode 1",
        description: "A brief episode from the You Ready? Let's Grow! Podcast show.",
        duration: "Video",
        url: "https://video.wixstatic.com/video/7fb596_d2d7fc4b7be9456c94a10c422f6af60d/720p/mp4/file.mp4"
      }
    ]
  },
  {
    id: "mini-webinar",
    title: "Mini Webinar Intensive",
    description:
      "A focused teaching experience with video and audio resources for deeper personal application.",
    thumbnail: "/images/assets/classroom-mini-webinar.png",
    items: [
      {
        id: "mini-webinar-audio",
        type: "video",
        title: "3 Signs You're Closer Than You Think",
        description: "A 7-10 minute teaching resource for personal momentum.",
        duration: "Audio",
        url: "https://static.wixstatic.com/mp3/7fb596_bd476b206a17431cb683c8504f15d15d.m4a"
      },
      {
        id: "mini-webinar-podcast-video",
        type: "video",
        title: "Mini Webinar Podcast Companion",
        description: "A brief companion episode from the You Ready? Let's Grow! Podcast show.",
        duration: "Video",
        url: "https://video.wixstatic.com/video/7fb596_d2d7fc4b7be9456c94a10c422f6af60d/720p/mp4/file.mp4"
      },
      {
        id: "mini-webinar-note",
        type: "text",
        title: "Reflection Prompt",
        description:
          "Write down one area where you are closer than you think. Then name the next small action you can take today."
      }
    ]
  },
  {
    id: "books-in-series",
    title: "Books In This Series",
    description:
      "Explore the books designed to challenge thinking, strengthen mindset, and move readers toward personal and financial growth.",
    thumbnail: "/images/assets/classroom-books-series.png",
    items: [
      {
        id: "mindset-before-millions",
        type: "link",
        title: "Mindset Before Millions",
        description: "Open the Amazon book page.",
        url: "https://www.amazon.com/dp/B0GQZ2R814"
      },
      {
        id: "millionaire-playbook",
        type: "link",
        title: "Millionaire Playbook",
        description: "Open the Amazon book page.",
        url: "https://www.amazon.com/dp/B0GQZ6DYCH"
      }
    ]
  }
];
