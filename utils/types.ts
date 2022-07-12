type Section = {
  title: string;
  content: string
}

type Author = {
  displayName: string;
  firstName: string;
  lastName: string;
  _id: string;
  description: string;
}
export type Comment = {
  blog: string;
  author: string;
  createdAt: string;
  _id: string;
  text: string;
  isAnonymous: boolean;
}
export interface BlogType {
  _id: string;
  title: string;
  tags: string[];
  author: Author;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
  intro: Section;
  comments: Comment[]
}

export interface MyResponseType<T> {
  data: {
    data: T
  }
}