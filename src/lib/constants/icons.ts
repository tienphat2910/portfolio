export interface PopularIcon {
  name: string;
  class: string;
  category?: string;
}

export const POPULAR_ICONS: PopularIcon[] = [
  // Frontend
  { name: "React", class: "bx bxl-react", category: "Frontend" },
  { name: "Next.js", class: "devicon-nextjs-plain", category: "Frontend" },
  { name: "Vue.js", class: "bx bxl-vuejs", category: "Frontend" },
  { name: "Angular", class: "bx bxl-angular", category: "Frontend" },
  { name: "JavaScript", class: "bx bxl-javascript", category: "Frontend" },
  { name: "TypeScript", class: "bx bxl-typescript", category: "Frontend" },
  { name: "HTML5", class: "bx bxl-html5", category: "Frontend" },
  { name: "CSS3", class: "bx bxl-css3", category: "Frontend" },
  { name: "Tailwind CSS", class: "bx bxl-tailwind-css", category: "Frontend" },
  { name: "Sass/SCSS", class: "bx bxl-sass", category: "Frontend" },
  { name: "Redux", class: "bx bxl-redux", category: "Frontend" },
  { name: "jQuery", class: "bx bxl-jquery", category: "Frontend" },
  
  // Backend & Databases
  { name: "Node.js", class: "bx bxl-nodejs", category: "Backend" },
  { name: "Python", class: "bx bxl-python", category: "Backend" },
  { name: "Java", class: "bx bxl-java", category: "Backend" },
  { name: "C++", class: "bx bxl-c-plus-plus", category: "Backend" },
  { name: "Golang", class: "bx bxl-go-lang", category: "Backend" },
  { name: "PHP", class: "bx bxl-php", category: "Backend" },
  { name: "Django", class: "devicon-django-plain", category: "Backend" },
  { name: "Laravel", class: "devicon-laravel-plain", category: "Backend" },
  { name: "Spring Boot", class: "devicon-spring-plain", category: "Backend" },
  { name: "PostgreSQL", class: "bx bxl-postgresql", category: "Database" },
  { name: "MongoDB", class: "bx bxl-mongodb", category: "Database" },
  { name: "MySQL", class: "devicon-mysql-plain", category: "Database" },
  { name: "GraphQL", class: "bx bxl-graphql", category: "Database" },
  { name: "Firebase", class: "bx bxl-firebase", category: "Database" },

  // Tools & Others
  { name: "Docker", class: "bx bxl-docker", category: "Tools" },
  { name: "Kubernetes", class: "devicon-kubernetes-plain", category: "Tools" },
  { name: "AWS", class: "bx bxl-aws", category: "Tools" },
  { name: "Git", class: "bx bxl-git", category: "Tools" },
  { name: "Figma", class: "bx bxl-figma", category: "Tools" },
  { name: "Flutter", class: "bx bxl-flutter", category: "Tools" },
  { name: "Android", class: "bx bxl-android", category: "Tools" },
  { name: "Apple/iOS", class: "bx bxl-apple", category: "Tools" },
  { name: "WordPress", class: "bx bxl-wordpress", category: "Tools" },
  { name: "Shopify", class: "bx bxl-shopify", category: "Tools" },
  { name: "VS Code", class: "devicon-vscode-plain", category: "Tools" },
  { name: "cPanel", class: "devicon-cpanel-plain", category: "Tools" },
  { name: "Plesk", class: "/icon/plesk.svg", category: "Tools" },
  { name: "DirectAdmin", class: "/icon/directadmin.svg", category: "Tools" },
];
