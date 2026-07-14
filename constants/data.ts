export const CATEGORIES = [
  "All",
  "Fantasy",
  "Novel",
  "Science",
  "Education",
  "History",
  "Business",
  "Technology",
  "Biography",
  "Children",
  "Comics",
];

export const CATEGORY_MAP = {
  Fantasy: [
    "fantasy",
    "fairy",
    "magic",
    "dragons",
    "myth"
  ],

  Novel: [
    "fiction",
    "novel",
    "detective",
    "mystery",
    "romance",
    "adventure"
  ],

  Science: [
    "science",
    "physics",
    "chemistry",
    "biology",
    "astronomy"
  ],

  Education: [
    "education",
    "school",
    "student",
    "learning"
  ],

  History: [
    "history",
    "historical",
    "war",
    "ancient"
  ],

  Business: [
    "business",
    "economics",
    "finance",
    "management"
  ],

  Technology: [
    "technology",
    "computer",
    "programming",
    "engineering"
  ],

  Biography: [
    "biography",
    "autobiography",
    "memoir"
  ],

  Children: [
    "children",
    "juvenile",
    "young"
  ],

  Comics: [
    "comic",
    "cartoon",
    "graphic"
  ]
};

export interface Book {
  id: number;
  title: string;
  authors: {
    name: string;
  }[];
  subjects: string[];
  summaries?: string[];
  download_count?: number;
  languages?: string[];
  formats: {
    "image/jpeg"?: string;
    [key: string]: string | undefined;
  };
}